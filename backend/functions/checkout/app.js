/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const AWS = require('aws-sdk');
const stepFunctions = new AWS.StepFunctions();
const sns = new AWS.SNS();
const sqs = new AWS.SQS();

exports.lambdaHandler = async (event, context) => {
  // Source: https://stackoverflow.com/questions/51240606/how-to-get-result-of-aws-lambda-function-running-with-step-function
  const reqBody = event.body || {};

  const executionParams = {
    stateMachineArn: process.env.StateMachineArn,
    input: reqBody,
  };

  try {

    // let status = '';
    // while (status !== 'SUCCEEDED' && status !== 'FAILED') {
    //   const describeParams = { executionArn: executionArn };
    //   const describeResult = await stepFunctions
    //     .describeExecution(describeParams)
    //     .promise();
    //   status = describeResult.status;
    // }

    // // Get the output of the execution
    // const describeParams = { executionArn: executionArn };
    // const describeResult = await stepFunctions
    //   .describeExecution(describeParams)
    //   .promise();
    // const output = JSON.parse(describeResult.output);

    // console.log('Step Function output:', describeResult);

    await new Promise((res) => setTimeout(res, 2000));

    const topicArn = process.env.SNSTopicName;

    // Define the message attribute names and values to filter by
    const attributeFilters = {
      TransactionID: 'abcde'
    };
    
    // Create an SQS queue to receive the SNS messages
    const queueName = 'MyQueue';
    const queueParams = { QueueName: queueName };
    const queueResult = await sqs.createQueue(queueParams).promise();
    const queueUrl = queueResult.QueueUrl;
    
    // Subscribe the SQS queue to the SNS topic with the attribute filters
    const subscribeParams = {
        Protocol: 'sqs',
        TopicArn: topicArn,
        Attributes: {
            FilterPolicy: JSON.stringify(attributeFilters)
        },
        Endpoint: queueUrl
    };
    await sns.subscribe(subscribeParams).promise();
    
    // Receive messages from the SQS queue
    const receiveParams = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20 // long-poll for up to 20 seconds
    };
    const result = await sqs.receiveMessage(receiveParams).promise();

    const executionResult = await stepFunctions
      .startExecution(executionParams)
      .promise();
    const executionArn = executionResult.executionArn;

    console.log('Started Step Function execution:', executionArn);
    
    if (result.Messages) {
        // Process the received message(s)
        console.log('Received message(s):', result.Messages);
        
        // Delete the message(s) from the queue
        const deleteParams = {
            QueueUrl: queueUrl,
            ReceiptHandle: result.Messages[0].ReceiptHandle
        };
        await sqs.deleteMessage(deleteParams).promise();
    } else {
        console.log('No messages received');
    }

    // Clean up
    await sqs.deleteQueue({ QueueUrl: queueUrl }).promise();

    // const queueUrl = process.env.SQSQueueName;
    // const response = await sqs.receiveMessage({ QueueUrl: queueUrl }).promise();

    // if (response.Messages) {
    //   const message = JSON.parse(response.Messages[0].Body);
    //   // process the message payload
    //   await sqs.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: response.Messages[0].ReceiptHandle }).promise();
    // } else {
    //   return {
    //     statusCode: 200,
    //     body: "No messages in queue",
    //   };
    // }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

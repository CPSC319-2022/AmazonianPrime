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
const { v4: uuid } = require('uuid');

exports.lambdaHandler = async (event, context) => {
  // Source: https://stackoverflow.com/questions/51240606/how-to-get-result-of-aws-lambda-function-running-with-step-function
  try {
    let transactionID = uuid();
    const topicArn = process.env.SNSTopicName;

    // Define the message attribute names and values to filter by
    const attributeFilters = {
      "TransactionID": [transactionID]
    };
    
    
    
    // Create an SQS queue to receive the SNS messages
    const queueName = 'Queue' + transactionID;
    const queueParams = { QueueName: queueName };
    const queueResult = await sqs.createQueue(queueParams).promise();
    const queueUrl = queueResult.QueueUrl;
    const queueRegion = queueUrl.split('.')[1];
    const accountId = queueUrl.split('/')[3];

    const queueArn = `arn:aws:sqs:${queueRegion}:${accountId}:${queueName}`;
    
    // Subscribe the SQS queue to the SNS topic with the attribute filters
    const subscribeParams = {
        Protocol: 'sqs',
        TopicArn: topicArn,
        Attributes: {
            FilterPolicy: JSON.stringify(attributeFilters)
        },
        Endpoint: queueArn
    };
    await sns.subscribe(subscribeParams).promise(); // Need to make subsequent call to unsubscribe to avoid polluting SNS
    
    // Add permissions for SNS topic to publish messages to the SQS queue
    const policyParams = {
      Attributes: {
        Policy: JSON.stringify({
          Version: '2012-10-17',
          Statement: [{
            Sid: 'AllowSnsTopicToSendMessageToSqsQueue',
            Effect: 'Allow',
            Principal: {
              Service: 'sns.amazonaws.com'
            },
            Action: 'sqs:SendMessage',
            Resource: queueArn,
            Condition: {
              ArnEquals: {
                "aws:SourceArn": topicArn
              }
            }
          }]
        })
      },
      QueueUrl: queueResult.QueueUrl
    };
    await sqs.setQueueAttributes(policyParams).promise();
    
    // Receive messages from the SQS queue
    const receiveParams = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20 // long-poll for up to 20 seconds
    };
    const result = await sqs.receiveMessage(receiveParams).promise();
    
    const reqBody = event.body || {};

    const executionParams = {
      stateMachineArn: process.env.StateMachineArn,
      input: JSON.stringify({...JSON.parse(reqBody), "TransactionID": transactionID}),
    };

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

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

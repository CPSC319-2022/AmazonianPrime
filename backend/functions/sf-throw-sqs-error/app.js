const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

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
exports.lambdaHandler = async (event, context) => {
  const topicArn = process.env.SNSTopicName;
  const TransactionID = event['TransactionID'];

  // Define the message attributes
  const messageAttributes = {
    TransactionID: { DataType: 'String', StringValue: TransactionID },
  };

  // Define the message body
  const messageBody = JSON.stringify(event);

  // Define the SNS parameters
  const snsParams = {
    TopicArn: topicArn,
    Message: messageBody,
    MessageAttributes: messageAttributes,
  };

  // Publish the message to the topic
  try {
    const result = await sns.publish(snsParams).promise();
    console.log('Message sent:', result.MessageId);
  } catch (err) {
    console.error('Error publishing message:', err);
  }

  return {
    statusCode: 200,
    body: { ...event },
  };
};

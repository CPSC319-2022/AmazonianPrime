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
  const messageBody = JSON.stringify({ message: 'There was an error with the process' });
  const queueUrl = process.env.SQSQueueName;
  await sqs.sendMessage({ MessageBody: messageBody, QueueUrl: queueUrl }).promise();
  return {
    statusCode: 200,
    body: { ...event },
  };
};

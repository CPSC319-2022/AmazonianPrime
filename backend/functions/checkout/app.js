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

const AWS = require("aws-sdk");

exports.lambdaHandler = async (event, context) => {
  // Source: https://stackoverflow.com/questions/51240606/how-to-get-result-of-aws-lambda-function-running-with-step-function
  const stepFunctions = new AWS.StepFunctions();
  const reqBody = event.body || {};

  const executionParams = {
    stateMachineArn: process.env.StateMachineArn,
    input: reqBody,
  };

  try {
    const executionResult = await stepFunctions.startExecution(executionParams).promise();
    const executionArn = executionResult.executionArn;

    console.log('Started Step Function execution:', executionArn);

    let status = '';
    while (status !== 'SUCCEEDED' && status !== 'FAILED') {
      const describeParams = { executionArn: executionArn };
      const describeResult = await stepFunctions.describeExecution(describeParams).promise();
      status = describeResult.status;
    }

    // Get the output of the execution
    const describeParams = { executionArn: executionArn };
    const describeResult = await stepFunctions.describeExecution(describeParams).promise();
    const output = JSON.parse(describeResult.output);

    console.log('Step Function output:', describeResult);

    return {
      statusCode: 200,
      body: JSON.stringify(output)
    };

  } catch (err) {
    console.error(err);
    throw err;
  }
};

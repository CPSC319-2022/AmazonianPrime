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

  const params = {
    stateMachineArn: process.env.StateMachineArn,
    input: reqBody,
  };

  let res;
  let res2;
  try {
    res = await stepFunctions.startExecution(params).promise();
    await new Promise((resolve) => setTimeout(resolve, 7000));
    res2 = await stepFunctions
      .describeExecution({ executionArn: res.executionArn })
      .promise();
  } catch (err) {
    console.error(err);
    return {
      statusCode: 200,
      body: "Encountered an issue starting the execution",
    };
  }

  return {
    statusCode: 200,
    body:
      "StateMachineArn: " +
      process.env.StateMachineArn +
      ", Execution Arn:" +
      JSON.stringify(res) +
      ", Describe Execution" +
      JSON.stringify(res2),
  };
};

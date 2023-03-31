const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const {
  CheckoutCancellationError,
  jsonFriendlyErrorReplacer
} = require('errorStates.js');

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
  const stepfunctions = new AWS.StepFunctions();

  const {
    TaskToken,
    PaymentID,
    ExecutionArn
  } = JSON.parse(event.body);

  if (PaymentID === -1){
    // User cancelled the checkout
    const cancelParams = {
      cause: "User has cancelled the checkout process",
      error: "CheckoutCancellationError",
      taskToken: TaskToken
    };

    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      stepfunctions.sendTaskFailure(cancelParams, (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(data);  
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(new CheckoutCancellationError("The user has cancelled the checkout process!"), jsonFriendlyErrorReplacer),
    };
  }

  const result = {
    NewPaymentID: PaymentID
  }

  const params = {
    output: JSON.stringify(result),
    taskToken: TaskToken
  };

  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 400));
    stepfunctions.sendTaskSuccess(params, (err, data) => {
      if (err) {
          console.error(err.message);
          return;
      }
      console.log(data);  
    });
  }
  
  let status = '';
  while (status !== 'SUCCEEDED' && status !== 'FAILED') {
    const describeParams = { executionArn: ExecutionArn };
    const describeResult = await stepfunctions
      .describeExecution(describeParams)
      .promise();
    status = describeResult.status;
  }

  // Get the output of the execution
  const describeParams = { executionArn: ExecutionArn };
  const describeResult = await stepfunctions
    .describeExecution(describeParams)
    .promise();
  const output = JSON.parse(describeResult.output);

  console.log('Step Function output:', describeResult);

  return {
    statusCode: 200,
    body: JSON.stringify(output),
  };
};

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
  // Generate a random number between 0 - 100. Based on this number, we will decide if the payment is approved or declined.
  let random_number = Math.floor(Math.random() * 100);
  let random_payment_status = 'Declined';
  if (random_number > 30) {
    random_payment_status = 'Approved';
  }
  return {
    statusCode: 200,
    body: { ...event },
    payment_status: random_payment_status,
  };
};

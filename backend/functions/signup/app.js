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
  // TODO: do some logic, and add the user in DB
  try {
    response = {
      statusCode: 200,
      headers: {
        // CORS: https://stackoverflow.com/questions/67065130/how-to-enable-cors-with-aws-sam
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*', // Allow from anywhere
        'Access-Control-Allow-Methods': 'GET', // Allow only GET request
      },
      body: JSON.stringify({
        FirstName: 'John',
        LastName: 'Darwin',
        address: {
          city: 'Vancouver',
          province: 'BC',
          streetAddress: '2366 Main Mall',
          postalCode: 'V6T 1Z4',
          // 2366 Main Mall, Vancouver, BC V6T 1Z4
        },
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

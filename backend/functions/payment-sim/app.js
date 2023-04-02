const dbConnection = require('dbConnection.js');
const {
  ExpiredCreditCardError,
  ErrorWrapper,
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

function escapeDate(date) {
  return escape(date).replace('%u2068', '').replace('%u2069', '').replace('%u2066', '');
}

exports.lambdaHandler = async (event, context) => {
  const con = await dbConnection.connectDB(
    process.env.DatabaseAddress,
    'user',
    'Password1234',
    'databaseAmazonianPrime',
  );
  
  const PaymentID = event['PaymentID'];

  const getPaymentQuery = `SELECT * FROM PaymentDetails WHERE PaymentID = ${PaymentID}`;

  const PaymentDetails = await new Promise((resolve, reject) => {
    con.query(getPaymentQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  let validPayment = false;

  if (PaymentDetails[0]){
    const dateStr = PaymentDetails[0]["ExpiryDate"];
    const [month, year] = dateStr.split('/');
    const dateObj = new Date(Number(`20${escapeDate(year)}`), Number(escapeDate(month)) - 1);
    const todayDate  = new Date();
    if (todayDate < dateObj){
      validPayment = true;
    }
  }

  await dbConnection.disconnectDB(con);

  if (!validPayment){
    let error = new ExpiredCreditCardError(`The selected credit card is expired!`);
    let message = {
      body: event,
      error: JSON.stringify(error, jsonFriendlyErrorReplacer)
    }
    throw new ErrorWrapper(JSON.stringify(message));
  }

  // Generate a random number between 0 - 100. Based on this number, we will decide if the payment is approved or declined.
  let random_number = Math.floor(Math.random() * 100);
  let random_payment_status = 'Declined';
  if (random_number > 10) {
    random_payment_status = 'Approved';
  }
  return {
    statusCode: 200,
    body: { ...event },
    payment_status: random_payment_status,
  };
};

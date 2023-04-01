const dbConnection = require('dbConnection.js');
const {
  EmptyShoppingCartError,
  PurchaseQuantityExceededError,
} = require('errorStates.js');
// var mysql = require('mysql');

/**
 
* Sample Lambda function which mocks the operation of buying a random number of shares for a stock.
 * For demonstration purposes, this Lambda function does not actually perform any  actual transactions. It simply returns a mocked result.
 *
 * @param {Object} event - Input event to the Lambda function
 * @param {Object} context - Lambda Context runtime methods and attributes
 *
 * @returns {Object} object - Object containing details of the stock buying transaction
 *
 */
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

  if (PaymentDetails[0]) {
    const dateStr = PaymentDetails[0]['ExpiryDate'];
    const [month, year] = dateStr.split('/');
    const dateObj = new Date(`20${year}`, parseInt(month) - 1);
    const todayDate = new Date();
    if (todayDate < dateObj) {
      validPayment = true;
    }
  }

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: { ...event, ValidPayment: validPayment },
  };
};

const mysql = require('mysql');
const dbConnection = require('dbConnection.js');

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

  const UserID = event.pathParameters.id;

  const getPaymentQuery = `SELECT * FROM PaymentDetails, Address WHERE PaymentDetails.AddressID = Address.AddressID AND PaymentDetails.UserID = ${UserID}`;

  const getPayment = await new Promise((resolve, reject) => {
    con.query(getPaymentQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the payment details from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getPayment)
  };
};

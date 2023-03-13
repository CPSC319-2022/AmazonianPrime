const dbConnection = require('dbConnection.js');
var mysql = require('mysql');

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

  const { UserID, AddressID, CreditCardNum, ExpiryDate, CVV, CardHolderName } =
    JSON.parse(event.body);

  const addPaymentQuery = `INSERT INTO PaymentDetails(UserID, AddressID, CreditCardNum, ExpiryDate, CVV, CardHolderName) VALUES(${UserID}, ${AddressID}, ${CreditCardNum}, "${ExpiryDate}", ${CVV}, "${CardHolderName}")`;

  const addPayment = await new Promise((resolve, reject) => {
    con.query(addPaymentQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the user to database!");
      }
      resolve(res);
    });
  });

  const PaymentID = addPayment['insertId'];

  const addPaymentMethodQuery = `INSERT INTO PaymentMethod(UserID, PaymentID) VALUES(${UserID}, ${PaymentID})`;

  const addPaymentMethod = await new Promise((resolve, reject) => {
    con.query(addPaymentMethodQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the user to database!");
      }
      resolve(res);
    });
  });

  const getPaymentByIdQuery = `SELECT * FROM PaymentDetails WHERE PaymentID = "${PaymentID}"`;

  const getPayment = await new Promise((resolve, reject) => {
    con.query(getPaymentByIdQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the address from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getPayment[0]),
  };
};

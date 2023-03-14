const mysql = require('mysql');
const dbConnection = require('dbConnection.js');

function parseJWT(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

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

  const getBankingQuery = `SELECT * FROM BankingDetails, Address WHERE BankingDetails.AddressID = Address.AddressID AND BankingDetails.UserID = ${UserID}`;

  const getBanking = await new Promise((resolve, reject) => {
    con.query(getBankingQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the banking details from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getBanking[0])
  };
};

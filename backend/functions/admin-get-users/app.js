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
  // TODO add admin authentication from context
  const offset = event.queryStringParameters.offset;
  const limit = event.queryStringParameters.limit;
  var getUsersQuery = `SELECT * FROM Users LIMIT ${limit} OFFSET ${offset}`;

  const Users = await new Promise((resolve, reject) => {
    con.query(getUsersQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  console.log(Users);

  return {
    statusCode: 200,
    body: JSON.stringify(Users),
  };
};

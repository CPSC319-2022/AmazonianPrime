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

  const { UserID, IsAdmin } = JSON.parse(event.body);

  if (!UserID || IsAdmin === undefined) {
    return {
      statusCode: 400,
      body: 'Missing required fields',
    };
  }

  const updateUserQuery = `UPDATE Users SET IsAdmin=${IsAdmin} WHERE UserID = ${UserID} `;

  const updateUsers = await new Promise((resolve, reject) => {
    con.query(updateUserQuery, function (err, res) {
      if (err) {
        reject("Couldn't update the user's priveleges");
      }
      resolve(res);
    });
  });

  console.log(updateUsers);

  let getUser;
  const getUserByIdQuery = `SELECT * FROM Users WHERE UserID = "${UserID}"`;
  getUser = await new Promise((resolve, reject) => {
    con.query(getUserByIdQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the user from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getUser[0]),
  };
};

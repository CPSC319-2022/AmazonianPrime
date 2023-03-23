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
  
  const offset = event.queryStringParameters.offset;
  const limit = event.queryStringParameters.limit;

  const { UserID } = JSON.parse(event.body);

  if (UserID === null || UserID == undefined) {
    return {
      statusCode: 400,
      body: `Missing Admin UserID. Please provide a Admin UserID in the Request Body.`,
    };
  }

  const getAdminQuery = `SELECT IsAdmin FROM Users WHERE UserID = ${UserID}`;

  const getAdmin = await new Promise((resolve, reject) => {
    con.query(getAdminQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  if (getAdmin.length < 1) {
    return {
      statusCode: 404,
      body: `Admin with UserID ${UserID} not found`,
    };
  }

  var getOrdersQuery = `SELECT * FROM Orders LIMIT ${limit} OFFSET ${offset}`;

  const Orders = await new Promise((resolve, reject) => {
    con.query(getOrdersQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  console.log(Orders);

  return {
    statusCode: 200,
    body: JSON.stringify(Orders),
  };
};

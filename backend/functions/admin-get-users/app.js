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
  try{
  const con = await dbConnection.connectDB(
    process.env.DatabaseAddress,
    'user',
    'Password1234',
    'databaseAmazonianPrime',
  );

  const offset = event.queryStringParameters.offset;
  const limit = event.queryStringParameters.limit;
  const name = event.queryStringParameters.name;

  var optNameClause = ``;

  if (name != null && name !== undefined) {
    let parsedName = name.replace(/-/g, '');
    parsedName = parsedName.replace(/\"/g, '');
    optNameClause += `WHERE CONCAT(FirstName, LastName) LIKE '%${parsedName}%'`;
  }

  const getNumberOfUsers = `SELECT COUNT(*) FROM Users ${optNameClause}`;

  const getUsersCount = await new Promise((resolve, reject) => {
    con.query(getNumberOfUsers, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  const getUsersQuery = `SELECT * FROM Users ${optNameClause} LIMIT ${limit} OFFSET ${offset}`;

  const Users = await new Promise((resolve, reject) => {
    con.query(getUsersQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  console.log(Users);

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: JSON.stringify({
      TotalUsers: getUsersCount[0]['COUNT(*)'],
      Data: Users,
    }),
  };
  } catch (e) {
    return {
      statusCode: 500, body: JSON.stringify({error: err.toString()})
    };
  }
};

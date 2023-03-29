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
  const OrderID = event.queryStringParameters.orderId;
  const UserID = event.queryStringParameters.userId;

  var options = [];

  if (UserID != null && UserID !== undefined) {
    options.push(`UserID = ${UserID}`);
  }
  if (OrderID != null && OrderID !== undefined) {
    options.push(`OrderID = ${OrderID}`);
  }

  let whereClause;

  if (options.length > 0) {
    whereClause = options.reduce((a, b) => {
      return a + ' AND ' + b;
    });
  }

  var getOrdersQuery = `SELECT * FROM Orders ${
    whereClause !== undefined ? `WHERE ${whereClause} ` : ''
  }LIMIT ${limit} OFFSET ${offset}`;

  const Orders = await new Promise((resolve, reject) => {
    con.query(getOrdersQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  console.log(Orders);

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: JSON.stringify(Orders),
  };
  } catch (e) {
    return {
      statusCode: 500, body: JSON.stringify({error: err.toString()})
    };
  }
};

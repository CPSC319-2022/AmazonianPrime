const dbConnection = require('dbConnection.js');
// const userValidate = require('UserValidate.js')

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
  
  console.log(event);

  const { UserID, OrderID } = event;

  if (!UserID) {
    return {
      statusCode: 400,
      body: 'Missing UserID',
    };
  }

  const getUserQuery = `SELECT * FROM Users WHERE UserID = ${UserID}`;

  const getUser = await new Promise((resolve, reject) => {
    con.query(getUserQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  const getOrderQuery = `SELECT * FROM OrderItem, Listing WHERE OrderID = ${OrderID} AND OrderItem.ListingID = Listing.ListingID`;

  const getOrder = await new Promise((resolve, reject) => {
    con.query(getOrderQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  await dbConnection.disconnectDB(con);

  let orderDetailsString = '';

  for (const item of getOrder) {
    orderDetailsString += `${item.ListingName} - ${item.OrderQuantity}\n`;
  }

  return {
    statusCode: 200,
    body: {...event, User: getUser[0], Order: orderDetailsString},
  };
};

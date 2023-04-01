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

  const { OrderID } = event['body'];

  if (!OrderID) {
    return {
      statusCode: 400,
      body: 'Missing OrderID',
    };
  }

  const shippingStatus = `Delivered`;

  const updateShippingQuery = `UPDATE Orders SET ShippingStatus = "${shippingStatus}" WHERE OrderID = ${OrderID}`;

  const updateShipping = await new Promise((resolve, reject) => {
    con.query(updateShippingQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: {...event['body']},
  };
};

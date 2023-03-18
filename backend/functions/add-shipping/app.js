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

  const { UserID, AddressID } = JSON.parse(event.body);

  if (!UserID || !AddressID) {
    return {
      statusCode: 400,
      body: 'Missing required fields',
    };
  }

  const addShippingAddressQuery = `INSERT INTO ShippingAddress (UserID, AddressID) VALUES(${UserID}, ${AddressID})`;

  const addShippingAddress = await new Promise((resolve, reject) => {
    con.query(addShippingAddressQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the banking detail to database!");
      }
      resolve(res);
    });
  });

  const getShippingByUserIdQuery = `SELECT * FROM ShippingAddress WHERE UserID = "${UserID}" AND AddressID = "${AddressID}"`;

  const getShipping = await new Promise((resolve, reject) => {
    con.query(getShippingByUserIdQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the shipping address from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getShipping)
  };
};

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

  const UserID = event.pathParameters.userid;
  const ListingID = event.queryStringParameters.listingId;

  if (ListingID === null || ListingID == undefined) {
    return {
      statusCode: 400,
      body: `Missing ListingID. Please provide a ListingID in the URL.`,
    };
  }

  const deleteItemFromCartQuery = `DELETE FROM ShoppingCartItem WHERE ListingID = ${ListingID} AND UserID = ${UserID}`;

  const deleteItemFromCart = await new Promise((resolve, reject) => {
    con.query(deleteItemFromCartQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: JSON.stringify(deleteItemFromCart),
  };
};

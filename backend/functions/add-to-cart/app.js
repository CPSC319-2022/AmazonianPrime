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

  const { ListingID, Quantity } = JSON.parse(event.body);

  if (!ListingID || !Quantity) {
    return {
      statusCode: 400,
      body: 'Missing required fields',
    };
  }

  const addToCartQuery = `INSERT INTO ShoppingCartItem(UserID, ListingID, Quantity) VALUES(${UserID}, ${ListingID}, ${Quantity})`;

  const addToCart = await new Promise((resolve, reject) => {
    con.query(addToCartQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  const ShoppingCartItemID = addToCart['insertId'];

  const getShoppingCartItemByIDQuery = `SELECT * FROM ShoppingCartItem WHERE ShoppingCartItemID = "${ShoppingCartItemID}"`;

  const getShoppingCartItemByID = await new Promise((resolve, reject) => {
    con.query(getShoppingCartItemByIDQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getShoppingCartItemByID[0]),
  };
};

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

  for(const order of Orders) {
    const getPaymentQuery = `SELECT * FROM PaymentDetails, Address WHERE PaymentDetails.AddressID = Address.AddressID AND PaymentDetails.UserID = ${UserID}`;

    order.Payment = await new Promise((resolve, reject) => {
      con.query(getPaymentQuery, function (err, res) {
        if (err) {
          reject("Couldn't get the payment details from database!");
        }
        resolve(res);
      });
    });
    getShippingQuery = `SELECT * FROM ShippingAddress, Address WHERE ShippingAddress.AddressID = Address.AddressID AND ShippingAddress.UserID = order.UserID`;

    order.Shipping = await new Promise((resolve, reject) => {
      con.query(getPaymentQuery, function (err, res) {
        if (err) {
          reject("Couldn't get the payment details from database!");
        }
        resolve(res);
      });
    });
    var listings = []
    for (const shoppingCartItem of Items) {
      const getListingQuery = `SELECT *
                               FROM Listing
                                      LEFT JOIN (SELECT ListingID AS ImageListingID, S3ImagePath
                                                 FROM ListingImage
                                                 WHERE S3ImagePath IN
                                                       (SELECT MAX(S3ImagePath) FROM ListingImage GROUP BY ListingID)) AS Images
                                                ON Listing.ListingID = Images.ImageListingID
                                      JOIN Users on Listing.UserID = Users.UserID
                               WHERE Listing.ListingID = ${shoppingCartItem.ListingID};`;
      const Listing = await new Promise((resolve, reject) => {
        con.query(getListingQuery, function (err, res) {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
      listings.push(Listing);
    }
    order.Listings = listings;
  }
  console.log(Orders);

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: JSON.stringify(Orders),
  };
};

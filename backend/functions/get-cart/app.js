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
  const Response = {};
  Response.TotalQuantity = 0;

  //TODO if we have time, flesh out a giant join and transform to fit the expected result, reduce MySQL call to 1
  const getCartQuery = `SELECT * FROM ShoppingCartItem WHERE UserID = ${UserID}`;

  const Items = await new Promise((resolve, reject) => {
    con.query(getCartQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  let subtotal = 0.0;
  let pst = 0.0;
  let gst = 0.0;
  let total = 0.0;

  for (const shoppingCartItem of Items) {
    const getListingQuery = `SELECT * FROM Listing LEFT JOIN (SELECT ListingID AS ImageListingID, S3ImagePath FROM ListingImage WHERE S3ImagePath IN (SELECT MAX(S3ImagePath) FROM ListingImage GROUP BY ListingID)) AS Images ON Listing.ListingID = Images.ImageListingID JOIN Users on Listing.UserID = Users.UserID WHERE Listing.ListingID = ${shoppingCartItem.ListingID};`;
    const Listing = await new Promise((resolve, reject) => {
      con.query(getListingQuery, function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
    const {
      FirstName,
      LastName,
      Email,
      Department,
      S3ImagePath,
      ...ListingData
    } = Listing[0];
    shoppingCartItem.Listing = ListingData;
    shoppingCartItem.Listing.User = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Department: Department,
    };
    shoppingCartItem.Listing.ImagePreview = S3ImagePath;
    Response.TotalQuantity += shoppingCartItem.Quantity;
    if (ListingData.ItemCondition === 'New') {
      pst += shoppingCartItem.Quantity * ListingData.Cost * 0.07;
      gst += shoppingCartItem.Quantity * ListingData.Cost * 0.05;
    }
    subtotal += shoppingCartItem.Quantity * ListingData.Cost;
  }
  total += subtotal + pst + gst;

  Response.Subtotal = subtotal.toFixed(2);
  Response.PSTTax = pst.toFixed(2);
  Response.GSTTax = gst.toFixed(2);
  Response.TotalCost = total.toFixed(2);
  Response.Items = Items;
  console.log(Response);

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: JSON.stringify(Response),
  };
};

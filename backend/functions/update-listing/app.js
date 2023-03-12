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

  const {
    listingID,
    listingName,
    description,
    cost,
    quantity,
    category,
    condition,
  } = JSON.parse(event.body);

  const updateListingQuery = `UPDATE Listing SET ListingName="${listingName}", Description="${description}", Cost=${cost}, Quantity=${quantity}, Category="${category}", ItemCondition="${condition}" WHERE ListingID = ${listingID}`;

  const updateListing = await new Promise((resolve, reject) => {
    con.query(updateListingQuery, function (err, res) {
      if (err) {
        reject("Couldn't update listing to database!");
      }
      resolve(res);
    });
  });

  console.log(updateListing);

  return {
    statusCode: 200,
    body: JSON.stringify(updateListing),
  };
};

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
    ListingID,
    ListingName,
    Description,
    Cost,
    Quantity,
    Category,
    Size,
    Brand,
    Colour,
    ItemCondition,
  } = JSON.parse(event.body);

  if (
    !ListingID ||
    !ListingName ||
    !Description ||
    !Cost ||
    !Quantity ||
    !Category ||
    !ItemCondition
  ) {
    return {
      statusCode: 400,
      body: 'Missing required fields',
    };
  }

  const updateListingQuery = `UPDATE Listing SET ListingName="${ListingName}", Description="${Description}", Cost=${Cost}, Quantity=${Quantity}, Category="${Category}", ${Size !== undefined ? `Size = "${Size}", ` : ""}${Brand !== undefined ? `Brand = "${Brand}", ` : ""}${Colour !== undefined ? `Colour = "${Colour}", ` : ""}ItemCondition="${ItemCondition}" WHERE ListingID = ${ListingID}`;

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

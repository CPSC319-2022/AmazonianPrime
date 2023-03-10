var { v4: uuidv4 } = require('uuid');
const dbConnection = require("dbConnection.js");
var mysql = require("mysql");

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
    "user",
    "Password1234",
    "databaseAmazonianPrime"
  );

  const { userID, listingName, description, cost, quantity, category, condition, isActiveListing, postedTimestamp } =
    JSON.parse(event.body);

  const listingID = uuidv4();

  const createListingQuery = `INSERT INTO Listing(ListingID, UserID, ListingName, Description, Cost, Quantity, Category, Condition, PostedTimestamp, IsActiveListing) VALUES(${listingID}, ${userID}, "${listingName}", "${description}", ${cost}, ${quantity}, "${category}", "${condition}", "${postedTimestamp}", ${isActiveListing})`;

  const createListing = await new Promise((resolve, reject) => {
    con.query(createListingQuery, function (err, res) {
      if (err) {
        reject("Couldn't add listing to database!");
      }
      resolve(res);
    });
  });

  console.log(createListing);

  return {
    statusCode: 200,
    body: JSON.stringify(listingID),
  };
};

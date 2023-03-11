var { v4: uuidv4 } = require("uuid");
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

  const {
    userID,
    listingName,
    description,
    cost,
    quantity,
    category,
    condition,
  } = JSON.parse(event.body);

  const createListingQuery = `INSERT INTO Listing(UserID, ListingName, Description, Cost, Quantity, Category, ItemCondition, IsActiveListing) VALUES(${userID}, "${listingName}", "${description}", ${cost}, ${quantity}, "${category}", "${condition}", true)`;

  const createListing = await new Promise((resolve, reject) => {
    con.query(createListingQuery, function (err, res) {
      if (err) {
        reject("Couldn't add listing to database!");
      }
      resolve(res);
    });
  });

  console.log(createListing);

  const listingID = createListing["insertId"];

  const getListingByIdQuery = `SELECT * FROM Listing WHERE ListingID = "${listingID}"`;

  const getListing = await new Promise((resolve, reject) => {
    con.query(getListingByIdQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the listing from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getListing[0]),
  };
};

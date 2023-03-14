var { v4: uuidv4 } = require('uuid');
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
    UserID,
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
    !UserID ||
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

  const createListingQuery = `INSERT INTO Listing(UserID, ListingName, Description, Cost, Quantity, Category, ${Size !== undefined ? "Size, " : ""}${Brand !== undefined ? "Brand, " : ""}${Colour !== undefined ? "Colour, " : ""}ItemCondition, IsActiveListing) VALUES(${UserID}, "${ListingName}", "${Description}", ${Cost}, ${Quantity}, "${Category}", ${Size !== undefined ? `"${Size}",`: ""} ${Brand !== undefined ? `"${Brand}",`: ""} ${Colour !== undefined ? `"${Colour}",`: ""} "${ItemCondition}", true)`;

  try {
    const createListing = await new Promise((resolve, reject) => {
      con.query(createListingQuery, function (err, res) {
        if (err) {
          reject("Couldn't add listing to database!");
        }
        resolve(res);
      });
    });

    const listingID = createListing['insertId'];

    const getListingByIDQuery = `SELECT * FROM Listing WHERE ListingID = "${listingID}"`;

    const getListing = await new Promise((resolve, reject) => {
      con.query(getListingByIDQuery, function (err, res) {
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
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(createListingQuery),
  };
};

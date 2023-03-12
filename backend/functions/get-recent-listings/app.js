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

  const name = event.queryStringParameters.name;
  const category = event.queryStringParameters.category;
  const offset = event.queryStringParameters.offset;
  const limit = event.queryStringParameters.limit;
  const filterDate = event.queryStringParameters.filterDate;

  var options = [];

  if (name != null && name !== undefined) {
    options.push(`ListingName = ${name}`);
  }
  if (category !== null && category !== undefined) {
    options.push(`Category = ${category}`);
  }
  options.push(`Listing.UserID = Users.UserID`);

  const whereClause = options.reduce((a, b) => {
    return a + " AND " + b + " AND " + whereClauseDate;
  });

  const whereClauseDate = `Listing.PostedTimestamp BETWEEN ${filterDate} AND CAST(GETDATE() AS DATE)`;

  const getListingsQuery = `SELECT * FROM Listing, Users WHERE ${whereClause} LIMIT ${limit} OFFSET ${offset}`;

  const getListings = await new Promise((resolve, reject) => {
    con.query(getListingsQuery, function (err, res) {
      if (err) {
        reject("Error getting listings");
      }
      resolve(res);
    });
  });

  console.log(getListings);

  // Need to figure out how to extract the image preview as well for each image here. Perhaps
  const output = getListings.map((entry) => {
    const { FirstName, LastName, Email, Department, ...ListingData } = entry;
    return {
      ...ListingData,
      User: { FirstName, LastName, Email, Department },
      ImagePreview: "",
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(output),
  };
};
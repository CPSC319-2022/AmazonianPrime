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
  
  var optionalWhere = `WHERE `
  var change = false
  if(name!==null) {
    optionalWhere += `ListingName = ${name}`
    change = true
  }
  if(category!==null) {
    if(change) {
      optionalWhere += ` AND Category = ${category}`
    } else {
      optionalWhere += `Category = ${category}`
      change = true
    }
  }
  if(!change) {
    optionalWhere = ""
  }

  const getListingsQuery = `SELECT * FROM Listing ${optionalWhere} LIMIT ${limit} OFFSET ${offset}`;

  const getListings = await new Promise((resolve, reject) => {
    con.query(getListingsQuery, function (err, res) {
      if (err) {
        reject("Error getting listings");
      }
      resolve(res);
    });
  });

  console.log(getListings);

  return {
    statusCode: 200,
    body: JSON.stringify(getListings),
  };
};

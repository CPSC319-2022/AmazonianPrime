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

  const name = event.queryStringParameters.name;
  const category = event.queryStringParameters.category;
  const offset = event.queryStringParameters.offset;
  const limit = event.queryStringParameters.limit;
  const startDate = event.queryStringParameters.startDate;
  const listingUserID = event.queryStringParameters.listingUserId;

  var options = [];

  options.push(`Listing.UserID IS NOT NULL`);
  options.push(`IsActiveListing = TRUE`);

  if (name != null && name !== undefined) {
    let parsedName = name.replace(/-/g, ' ');
    parsedName = name.replace(/\"/g, '');
    options.push(`ListingName LIKE '%${parsedName}%'`);
  }
  if (category !== null && category !== undefined) {
    options.push(`Category = ${category.replace(/-/g, ' ')}`);
  }
  if (startDate != null && startDate !== undefined) {
    options.push(`Date(PostedTimestamp) > ${startDate}`);
  }
  if (listingUserID != null && listingUserID !== undefined) {
    options.push(`Listing.UserID = ${listingUserID}`);
  }
  options.push(`Quantity > 0`);

  let whereClause;

  if (options.length > 0) {
    whereClause = options.reduce((a, b) => {
      return a + ' AND ' + b;
    });
  }

  const getListingsQuery = `SELECT * FROM Listing LEFT JOIN (SELECT ListingID AS ImageListingID, S3ImagePath FROM ListingImage WHERE S3ImagePath IN (SELECT MAX(S3ImagePath) FROM ListingImage GROUP BY ListingID)) AS Images ON Listing.ListingID = Images.ImageListingID JOIN Users on Listing.UserID = Users.UserID ${
    whereClause !== undefined ? `WHERE ${whereClause} ` : ''
  }LIMIT ${limit} OFFSET ${offset};`;

  const getListings = await new Promise((resolve, reject) => {
    con.query(getListingsQuery, function (err, res) {
      if (err) {
        reject('Error getting listings');
      }
      resolve(res);
    });
  });

  console.log(getListings);

  const getNumberOfListings = `SELECT COUNT(*) FROM Listing ${
    whereClause !== undefined ? `WHERE ${whereClause} ` : ''
  };`;

  const getListingsCount = await new Promise((resolve, reject) => {
    con.query(getNumberOfListings, function (err, res) {
      if (err) {
        reject('Error getting listings');
      }
      resolve(res);
    });
  });

  // Need to figure out how to extract the image preview as well for each image here. Perhaps
  const output = getListings.map((entry) => {
    const {
      FirstName,
      LastName,
      Email,
      Department,
      S3ImagePath,
      ...ListingData
    } = entry;
    return {
      ...ListingData,
      User: { FirstName, LastName, Email, Department },
      ImagePreview: S3ImagePath,
    };
  });

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: JSON.stringify({
      TotalListings: getListingsCount[0]['COUNT(*)'],
      Data: output,
    }),
  };
};

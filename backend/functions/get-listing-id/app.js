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

  const listingID = event.pathParameters.id;

  const getImagesQuery = `SELECT S3ImagePath FROM ListingImage WHERE ListingImage.ListingID = ${listingID} LIMIT 5`;

  const getImages = await new Promise((resolve, reject) => {
    con.query(getImagesQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the listing from database!");
      }
      resolve(res);
    });
  });

  // Still unsure how to extract the base64 images from the S3ImagePaths, but it will be done here!
  const imageArray = getImages.map((entry) => {
    return entry['S3ImagePath'];
  });

  const getListingByIDQuery = `SELECT * FROM Listing, Users WHERE Listing.UserID = Users.UserID AND Listing.ListingID = ${listingID}`;

  const getListingByID = await new Promise((resolve, reject) => {
    con.query(getListingByIDQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the listing from database!");
      }
      resolve(res);
    });
  });

  // if (getListingByID.length < 1) {
  //   return {
  //     statusCode: 304,
  //     body: "No Listings Found!",
  //   };
  // }

  const { FirstName, LastName, Email, Department, ...ListingData } =
    getListingByID[0];

  return {
    statusCode: 200,
    body: JSON.stringify({
      ...ListingData,
      User: { FirstName, LastName },
      Images: imageArray,
    }),
  };
};

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

  const ListingID = event.pathParameters.ListingId;

  if (ListingID === null || ListingID == undefined) {
    return {
      statusCode: 400,
      body: `Missing ListingID. Please provide a ListingID in the URL.`,
    };
  }

  const { UserID } = JSON.parse(event.body);

  if (UserID === null || UserID == undefined) {
    return {
      statusCode: 400,
      body: `Missing UserID. Please provide a UserID in the request body.`,
    };
  }

  // If the user isn't an admin and the given userID doesn't match, don't delete listing
  const getUserQuery = `SELECT IsAdmin FROM Users WHERE UserID = ${UserID}`;

  const getUser = await new Promise((resolve, reject) => {
    con.query(getUserQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  if (getUser.length < 1) {
    return {
      statusCode: 400,
      body: `User with UserID ${UserID} not found`,
    };
  }

  const userPriveleges = getUser[0]['IsAdmin'];

  const getListingQuery = `SELECT * FROM Listing WHERE ListingID = ${ListingID}`;

  const getListing = await new Promise((resolve, reject) => {
    con.query(getListingQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  if (getListing.length < 1) {
    return {
      statusCode: 400,
      body: `Listing with ListingID ${ListingID} not found`,
    };
  }

  if (
    parseInt(getListing[0]['UserID']) !== parseInt(UserID) &&
    userPriveleges === 0
  ) {
    return {
      statusCode: 403,
      body: `The user is not authorized to remove the listing`,
    };
  }

  const deleteListingImagesQuery = `DELETE FROM ListingImage WHERE ListingID = ${ListingID}`;

  const deleteListingImage = await new Promise((resolve, reject) => {
    con.query(deleteListingImagesQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  // TODO: Need to confirm that the Listing isn't a part of a completed order or a user's shopping cart.
  const deleteFromCartsQuery = `DELETE FROM ShoppingCartItem WHERE ListingID = ${ListingID}`;

  const deleteFromCarts = await new Promise((resolve, reject) => {
    con.query(deleteFromCartsQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  const deleteListingQuery = `DELETE FROM Listing WHERE ListingID = ${ListingID}`;

  const deleteListing = await new Promise((resolve, reject) => {
    con.query(deleteListingQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(deleteListing),
  };
};

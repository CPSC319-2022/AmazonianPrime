var mysql = require("mysql");
var OAuth2Client = require("google-auth-library");

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

// let clientId = "";
// let googleClientId =
//   "564219752620-5lcsrf60frhamrotf69bceiktsiamjmh.apps.googleusercontent.com";
// const oauthClient = new OAuth2Client(clientId);

exports.lambdaHandler = async (event, context) => {
  // ------- Google Authentication -------
  // const tokenJWT = event.pathParameters.gmail;

  // const ticket = await oauthClient.verifyIdToken({
  //   idToken: tokenJWT,
  //   audience: googleClientId,
  // });

  // setTimeout(() => {
  //   if (!ticket) {
  //     return {
  //       statusCode: 504,
  //       body: "Timeout on log in. Please try to log in again!",
  //     };
  //   }
  // }, 500);

  // // Source: https://developers.google.com/identity/sign-in/web/backend-auth
  // const payload = ticket.getPayload();
  // const givenName = payload.get("given_name");
  // const familyName = payload.get("family_name");
  // const email = payload.getEmail();

  // ------- Get user from Database -------

  const email = event.pathParameters.token; // This is actually the userToken, but I am passing in the email for now.

  var con = mysql.createConnection({
    host: process.env.DatabaseAddress,
    user: "user",
    password: "Password1234",
    database: "databaseAmazonianPrime",
  });

  const connectionStatus = await new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.log("Failed to connect to the database");
        reject("Failed to connect to the database");
      }
      resolve("Connected to Database!");
    });
  });

  console.log("Successfully connected to database!");

  const useDatabase = await new Promise((resolve, reject) => {
    con.query("USE databaseAmazonianPrime", function (err, res) {
      if (err) {
        reject("Couldn't switch to database!");
      }
      resolve(res);
    });
  });

  let getUserByEmailQuery = `SELECT * FROM Users WHERE Email = "` + email + `"`;

  const getUser = await new Promise((resolve, reject) => {
    con.query(getUserByEmailQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the user from database!");
      }
      resolve(res);
    });
  });

  if (getUser.length < 1) {
    // The user doesn't exist in database, return 204 error
    return {
      statusCode: 204,
      body: "No users were found with the given",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(getUser[0]),
  };
};

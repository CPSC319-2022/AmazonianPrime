var mysql = require("mysql");
var OAuth2Client = require("google-auth-library");
const dbConnection = require("dbConnection.js");

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

  const con = await dbConnection.connectDB(
    process.env.DatabaseAddress,
    "user",
    "Password1234",
    "databaseAmazonianPrime"
  );

  const getUserByEmailQuery = `SELECT * FROM Users WHERE Email = "${email}"`;

  var getUser = await new Promise((resolve, reject) => {
    con.query(getUserByEmailQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the user from database!");
      }
      resolve(res);
    });
  });

  if (getUser.length < 1) {
    let firstName = "fromJWT";
    let lastName = "alsoFromJWT";
    let userEmail = email; //this should also be from jwt
    const addUserQuery = `INSERT INTO Users(firstName, lastName, email, isAdmin) VALUES("${firstName}", "${lastName}", "${userEmail}", false)`;

    const addUsers = await new Promise((resolve, reject) => {
      con.query(addUserQuery, function (err, res) {
        if (err) {
          reject("Couldn't add the user to database!");
        }
        resolve(res);
      });
    });

    const insertedId = addUsers["insertId"];

    const getUserByIdQuery = `SELECT * FROM Users WHERE UserID = "${insertedId}"`;
    getUser = await new Promise((resolve, reject) => {
      con.query(getUserByIdQuery, function (err, res) {
        if (err) {
          reject("Couldn't get the user from database!");
        }
        resolve(res);
      });
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify(getUser[0]),
  };
};

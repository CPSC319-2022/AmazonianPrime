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

  const RequestUserID = event.pathParameters.UserID;

  if (RequestUserID === null) {
    return {
      statusCode: 400,
      body: `Missing UserID. Please provide a UserID in the URL.`,
    };
  }

  const { UserID, IsAdmin } = JSON.parse(event.body);

  if (UserID === null || UserID == undefined) {
    return {
      statusCode: 400,
      body: `Missing Admin UserID. Please provide a Admin UserID in the Request Body.`,
    };
  }

  const getAdminQuery = `SELECT IsAdmin FROM Users WHERE UserID = ${UserID}`;

  const getAdmin = await new Promise((resolve, reject) => {
    con.query(getAdminQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  if (getAdmin.length < 1) {
    return {
      statusCode: 404,
      body: `Admin with UserID ${UserID} not found`,
    };
  }

  const userPrivileges = getAdmin[0]['IsAdmin'];

  const getUserQuery = `SELECT * FROM Users WHERE UserID = ${RequestUserID}`;

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
      statusCode: 404,
      body: `Requested Promotion of User with UserID ${RequestUserID} not found`,
    };
  }

  if (
    parseInt(getAdmin[0]['UserID']) !== parseInt(UserID) &&
    userPrivileges === 0
  ) {
    return {
      statusCode: 403,
      body: `The User ${UserID} is Not Authorized to Modify the Privileges of User ${RequestUserID}`,
    };
  }

  const updateUserStatusQuery = `UPDATE Users SET IsAdmin = ${IsAdmin} WHERE UserID = ${RequestUserID}`

  const updateUserStatus = await new Promise((resolve, reject) => {
    con.query(updateUserStatusQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
  
  const getAlteredUserQuery = `SELECT UserID, IsAdmin FROM Users WHERE UserID = ${RequestUserID}`;

  const getAlteredUser = await new Promise((resolve, reject) => {
    con.query(getAlteredUserQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getAlteredUser[0]),
  };
};

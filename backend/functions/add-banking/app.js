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
    AddressID,
    InstitutionNum,
    AccountNum,
    TransitNum,
    NameOnCard,
  } = JSON.parse(event.body);

  if (
    !UserID ||
    !AddressID ||
    !InstitutionNum ||
    !AccountNum ||
    !TransitNum ||
    !NameOnCard
  ) {
    return {
      statusCode: 400,
      body: 'Missing required fields',
    };
  }

  const checkUserIDQuery = `SELECT * FROM BankingDetails WHERE UserID = ${UserID}`;

  const checkUserID = await new Promise((resolve, reject) => {
    con.query(checkUserIDQuery, function (err, res) {
      if (err) {
        reject("Couldn't return the select from database!");
      }
      resolve(res);
    });
  });

  if (checkUserID.length !== 0) {
    return {
      statusCode: 401,
      body:
        'the following banking details entry already exists for this user: ' +
        JSON.stringify(checkUserID),
    };
  }

  const addBankingDetailsQuery = `INSERT INTO BankingDetails(UserID, AddressID, InstitutionNum, AccountNum, TransitNum, NameOnCard) VALUES(${UserID}, ${AddressID}, ${InstitutionNum}, ${AccountNum}, ${TransitNum}, "${NameOnCard}")`;

  const addBankingDetails = await new Promise((resolve, reject) => {
    con.query(addBankingDetailsQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the banking detail to database!");
      }
      resolve(res);
    });
  });

  const BankingID = addBankingDetails['insertId'];

  const getBankingByIdQuery = `SELECT * FROM BankingDetails WHERE UserID = ${UserID}`;

  const getBanking = await new Promise((resolve, reject) => {
    con.query(getBankingByIdQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the banking details from database!");
      }
      resolve(res);
    });
  });

  await dbConnection.disconnectDB(con);

  return {
    statusCode: 200,
    body: JSON.stringify(getBanking[0]),
  };
};

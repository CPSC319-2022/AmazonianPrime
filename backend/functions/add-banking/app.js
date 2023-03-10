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

  const { institutionNum, accountNum, transitNum } =
    JSON.parse(event.body);

  const addBankingDetailsQuery = `INSERT INTO BankingDetails(InstitutionNum, AccountNum, TransitNum) VALUES(${institutionNum}, ${accountNum}, ${transitNum})`;

  const addBankingDetails = await new Promise((resolve, reject) => {
    con.query(addBankingDetailsQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the banking detail to database!");
      }
      resolve(res);
    });
  });

  const bankingId = addBankingDetails["insertId"];

  const addBankingAccountQuery = `INSERT INTO BankingAccount(UserID, PaymentID) VALUES(${bankingId}, ${userId})`;

  const addBankingAccount = await new Promise((resolve, reject) => {
    con.query(addBankingAccountQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the banking account to database!");
      }
      resolve(res);
    });
  });

  const getBankingByIdQuery = `SELECT * FROM BankingDetails WHERE BankingID = "${bankingId}"`;

  const getBanking = await new Promise((resolve, reject) => {
    con.query(getBankingByIdQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the address from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getPayment[0]),
  };
};

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
      body: 'Missing required fields'
    };
  }

  const updateBankingQuery = `UPDATE BankingDetails SET AddressID=${AddressID}, InstitutionNum=${InstitutionNum}, AccountNum=${AccountNum}, TransitNum=${TransitNum}, NameOnCard="${NameOnCard}" WHERE UserID = ${UserID} `;

  const updateBankingDetails = await new Promise((resolve, reject) => {
    con.query(updateBankingQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the banking detail to database!");
      }
      resolve(res);
    });
  });

  console.log(updateBankingDetails);

  let getBanking;
  const getBankingByIdQuery = `SELECT * FROM BankingDetails WHERE UserID = "${UserID}"`;
  getBanking = await new Promise((resolve, reject) => {
    con.query(getBankingByIdQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the banking detail from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getBanking[0]),
  };
};

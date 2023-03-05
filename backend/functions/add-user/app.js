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
  var con = await dbConnection.connectDB(
    process.env.DatabaseAddress,
    "user",
    "Password1234",
    "databaseAmazonianPrime"
  );

  const { firstName, lastName, email, department } = JSON.parse(event.body);

  let addUserQuery = `INSERT INTO Users(firstName, lastName, email, department, isAdmin) VALUES("${firstName}", "${lastName}", "${email}", "${department}", false)`;

  const addUsers = await new Promise((resolve, reject) => {
    con.query(addUserQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the user to database!");
      }
      resolve(res);
    });
  });

  console.log(addUsers);

  return {
    statusCode: 200,
    body: JSON.stringify(addUsers),
  };
};

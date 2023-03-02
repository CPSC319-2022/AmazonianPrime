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
  console.log("--- Initializing DB Tables ---");

  console.log("Connecting to database...");
  var con = mysql.createConnection({
    host: "myrdsdemo.cl0n1j7rxinq.us-west-2.rds.amazonaws.com",
    user: "user",
    password: "Password1234",
    database: "testingdb",
  });

  const connectionStatus = await new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.log("Failed to connect to the database");
        reject("Failed to connect to the database");
        //TO-DO: Need to figure out how to throw an error to primer function so that it rollsback the deployment
      }
      resolve("Connected to Database!");
    });
  });

  console.log("Successfully connected to database!");

  const newDatabase = await new Promise((resolve, reject) => {
    con.query("CREATE DATABASE testing3", function (err, res) {
      if (err) {
        reject("Couldn't obtain list of databases");
      }
      console.log("Successfully created dummy database!");
      resolve(res);
    });
  });

  console.log(newDatabase);

  return {
    status: "SUCCESS",
  };
};

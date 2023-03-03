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
        //TO-DO: Need to figure out how to throw an error to primer function so that it rollsback the deployment
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

  let createUserTableQuery = `CREATE TABLE Users (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
  );`;
  const createTable = await new Promise((resolve, reject) => {
    con.query(createUserTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create persons table!");
      }
      resolve(res);
    });
  });

  console.log(createTable);

  return {
    status: "SUCCESS",
  };
};

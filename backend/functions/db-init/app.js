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
    UserID int NOT NULL AUTO_INCREMENT,
    FirstName varchar(255),
    LastName varchar(255),
    Email varchar(255) UNIQUE,
    Department varchar(255),
    IsAdmin Boolean,
    PRIMARY KEY (UserID)
  );`;
  const createTable = await new Promise((resolve, reject) => {
    con.query(createUserTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create users table!");
      }
      resolve(res);
    });
  });

  let createPaymentDetailsTableQuery = `CREATE TABLE PaymentDetails (
    PaymentID int NOT NULL AUTO_INCREMENT, 
    UserID int, 
    AddressID int, 
    CreditCardNum int, 
    ExpiryDate varchar(10), 
    CVV int, 
    CardHolderName varchar(255),
    PRIMARY KEY (PaymentID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
  );`;

  const createTablePaymentDetails = await new Promise((resolve, reject) => {
    con.query(createPaymentDetailsTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create payment details table!");
      }
      resolve(res);
    });
  });

  let createPaymentsMethodTableQuery = `CREATE TABLE PaymentMethod (
    PaymentID int NOT NULL, 
    UserID int NOT NULL, 
    PRIMARY KEY (PaymentID, UserID),
    FOREIGN KEY (PaymentID) REFERENCES PaymentDetails(PaymentID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
  );`;

  const createTablePaymentMethod = await new Promise((resolve, reject) => {
    con.query(createPaymentsMethodTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create payment method table!");
      }
      resolve(res);
    });
  });

  let createCountryTableQuery = `CREATE TABLE Country (
    CityName varchar(255) NOT NULL, 
    Province varchar(255) NOT NULL, 
    StreetAddress varchar(255) NOT NULL, 
    PostalCode varchar(255), 
    Country varchar(255),
    PRIMARY KEY (CityName, Province, StreetAddress)
  );`;

  const createTableCountry = await new Promise((resolve, reject) => {
    con.query(createCountryTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create country table!");
      }
      resolve(res);
    });
  });

  let createAddressTableQuery = `CREATE TABLE Address (
    AddressID int NOT NULL AUTO_INCREMENT, 
    UserID int, 
    CityName varchar(255), 
    Province varchar(255), 
    StreetAddress varchar(255), 
    IsBillingAddress Boolean, 
    IsShippingAddress Boolean, 
    PRIMARY KEY (AddressID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CityName, Province, StreetAddress) REFERENCES Country(CityName, Province, StreetAddress)
  );`;

  const createTableAddress = await new Promise((resolve, reject) => {
    con.query(createAddressTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create address table!");
      }
      resolve(res);
    });
  });

  console.log(createTable);

  let createListingTableQuery = `CREATE TABLE Listing (
    ListingID int NOT NULL, 
    UserID int, 
    ListingName varchar(255), 
    Description TEXT, 
    Cost DECIMAL(6,2), 
    Quantity int, 
    Category varchar(255), 
    Condition varchar(255), 
    PostedTimestamp TIMESTAMP,
    IsActiveListing Boolean,
    PRIMARY KEY (ListingID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
  );`;

  const createListingTable = await new Promise((resolve, reject) => {
    con.query(createListingTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create listing table!");
      }
      resolve(res);
    });
  });

  console.log(createListingTable);

  return {
    status: "SUCCESS",
  };
};

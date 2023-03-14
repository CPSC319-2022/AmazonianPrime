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
  console.log('--- Initializing DB Tables ---');

  console.log('Connecting to database...');
  var con = mysql.createConnection({
    host: process.env.DatabaseAddress,
    user: 'user',
    password: 'Password1234',
    database: 'databaseAmazonianPrime',
  });

  const connectionStatus = await new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.log('Failed to connect to the database');
        reject('Failed to connect to the database');
        //TO-DO: Need to figure out how to throw an error to primer function so that it rollsback the deployment
      }
      resolve('Connected to Database!');
    });
  });

  console.log('Successfully connected to database!');

  const useDatabase = await new Promise((resolve, reject) => {
    con.query('USE databaseAmazonianPrime', function (err, res) {
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

  console.log(createTable);

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

  console.log(createTableCountry);

  let createAddressTableQuery = `CREATE TABLE Address (
    AddressID int NOT NULL AUTO_INCREMENT, 
    CityName varchar(255), 
    Province varchar(255), 
    StreetAddress varchar(255), 
    PRIMARY KEY (AddressID),
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

  console.log(createTableAddress);

  let createPaymentDetailsTableQuery = `CREATE TABLE PaymentDetails (
    PaymentID int NOT NULL AUTO_INCREMENT, 
    UserID int, 
    AddressID int, 
    CreditCardNum int, 
    ExpiryDate varchar(10), 
    CVV int, 
    CardHolderName varchar(255),
    PRIMARY KEY (PaymentID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AddressID) REFERENCES Address(AddressID)
  );`;

  const createTablePaymentDetails = await new Promise((resolve, reject) => {
    con.query(createPaymentDetailsTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create payment details table!");
      }
      resolve(res);
    });
  });

  console.log(createTablePaymentDetails);

  let createBankingDetailsTableQuery = `CREATE TABLE BankingDetails (
    BankingID int NOT NULL AUTO_INCREMENT, 
    UserID int NOT NULL,
    AddressID int NOT NULL,
    InstitutionNum int NOT NULL, 
    AccountNum int NOT NULL, 
    TransitNum int NOT NULL, 
    NameOnCard varchar(255),
    PRIMARY KEY (BankingID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AddressID) REFERENCES Address(AddressID)
  );`;

  const createTableBankingDetails = await new Promise((resolve, reject) => {
    con.query(createBankingDetailsTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create banking details table!");
      }
      resolve(res);
    });
  });

  console.log(createTableBankingDetails);

  let createShippingAddressTableQuery = `CREATE TABLE ShippingAddress (
    UserID int NOT NULL,
    AddressID int NOT NULL,
    PRIMARY KEY (UserID, AddressID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AddressID) REFERENCES Address(AddressID)
  );`;

  const createTableShippingAddress = await new Promise((resolve, reject) => {
    con.query(createShippingAddressTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create shipping address table!");
      }
      resolve(res);
    });
  });

  console.log(createTableShippingAddress);

  let createListingTableQuery = `CREATE TABLE Listing (
    ListingID int NOT NULL AUTO_INCREMENT, 
    UserID int, 
    ListingName varchar(255), 
    Description TEXT, 
    Cost DECIMAL(6,2), 
    Quantity int, 
    Category varchar(255), 
    ItemCondition varchar(255), 
    PostedTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

  let createListingImageTableQuery = `CREATE TABLE ListingImage (
    PictureID int NOT NULL AUTO_INCREMENT,
    ListingID int NOT NULL, 
    S3ImagePath varchar(255),
    PRIMARY KEY (PictureID),
    FOREIGN KEY (ListingID) REFERENCES Listing(ListingID)
  );`;

  const createListingImageTable = await new Promise((resolve, reject) => {
    con.query(createListingImageTableQuery, function (err, res) {
      if (err) {
        reject("Couldn't create listing image table!");
      }
      resolve(res);
    });
  });

  console.log(createListingImageTable);

  return {
    status: 'SUCCESS',
  };
};

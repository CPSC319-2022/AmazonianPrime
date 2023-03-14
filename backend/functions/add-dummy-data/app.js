const dbConnection = require("dbConnection.js");
const mysql = require("mysql");

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

  const addUserQueries = [`INSERT INTO Users (UserID, FirstName, LastName, Email, Department, IsAdmin) VALUES (1, "John", "Doe", "johndoe@gmail.com", "Marketing", false)`,
  `INSERT INTO Users (UserID, FirstName, LastName, Email, Department, IsAdmin) VALUES (2, "Alice", "Ather", "aather@gmail.com", null, false)`, 
  `INSERT INTO Users (UserID, FirstName, LastName, Email, Department, IsAdmin) VALUES (3, "Bob", "Carlson", "bobc321@gmail.com", "Management", true)`];
  
  addUserQueries.forEach(async (queryString) => {
    let insertUsers = await new Promise((resolve, reject) => {
      con.query(queryString, function (err, res) {
        if (err) {
          reject("Error inserting dummy data into Users");
        }
        resolve(res);
      });
    });
  });

  const addListingsQueries = [`INSERT INTO Listing (ListingID, UserID, ListingName, Description, Cost, Quantity, Category, ItemCondition, PostedTimestamp, IsActiveListing) VALUES (1, 1, "MCM Arm Chair", "Great condition.", 40.00, 2, "Amazon Merchandise", "Used- Like New", "2023-03-01 12:00:00", true)`,
  `INSERT INTO Listing (ListingID, UserID, ListingName, Description, Cost, Quantity, Category, ItemCondition, PostedTimestamp, IsActiveListing) VALUES (2, 2, "Healthy Monstera", "Selling this very healthy monstera", 20.00, 1, "Garden & Outdoors", "New", "2023-03-01 12:00:00", true)`,
  `INSERT INTO Listing (ListingID, UserID, ListingName, Description, Cost, Quantity, Category, ItemCondition, PostedTimestamp, IsActiveListing) VALUES (3, 3, "Listing 3", "Listing 3 Description", 5.00, 10, "Miscellaneous", "Used Fair", "2023-03-10 12:00:00", false)`];
  
  addListingsQueries.forEach(async (queryString) => {
    let insertListing = await new Promise((resolve, reject) => {
      con.query(queryString, function (err, res) {
        if (err) {
          reject("Error inserting dummy data into Listings");
        }
        resolve(res);
      });
    });
  });

  const addCountryQueries = [`INSERT INTO Country (CityName, Province, StreetAddress, PostalCode, Country) VALUES ("Vanvouver", "BC", "100 St", "V0V 0V0", "Canada")`,
  `INSERT INTO Country (CityName, Province, StreetAddress, PostalCode, Country) VALUES ("Richmond", "BC", "1000 St", "V1V 1V1", "Canada")`, 
  `INSERT INTO Country (CityName, Province, StreetAddress, PostalCode, Country) VALUES ("Toronto", "ON", "2000 St", "V2V 2V2", "Canada")`];
  
  addCountryQueries.forEach(async (queryString) => {
    let insertCountry = await new Promise((resolve, reject) => {
      con.query(queryString, function (err, res) {
        if (err) {
          reject("Error inserting dummy data into Country");
        }
        resolve(res);
      });
    });
  });

  const addAddressQueries = [`INSERT INTO Address (AddressID, CityName, Province, StreetAddress) VALUES (1, "Vanvouver", "BC", "100 St")`,
  `INSERT INTO Address (AddressID, CityName, Province, StreetAddress) VALUES (2, "Richmond", "BC", "1000 St")`,
  `INSERT INTO Address (AddressID, CityName, Province, StreetAddress) VALUES (3, "Toronto", "ON", "2000 St")`];
  
  addAddressQueries.forEach(async (queryString) => {
    let insertAddress = await new Promise((resolve, reject) => {
      con.query(queryString, function (err, res) {
        if (err) {
          reject("Error inserting dummy data into Address");
        }
        resolve(res);
      });
    });
  });

  const addPaymentDetailsQueries = [`INSERT INTO PaymentDetails (PaymentID, UserID, AddressID, CreditCardNum, ExpiryDate, CVV, CardHolderName) VALUES (1, 1, 1, 1234123412341234, "1025", 100, "John Doe")`,
  `INSERT INTO PaymentDetails (PaymentID, UserID, AddressID, CreditCardNum, ExpiryDate, CVV, CardHolderName) VALUES (2, 2, 2, 4321432143214321, "0626", 200, "Alice Ather")`,  
  `INSERT INTO PaymentDetails (PaymentID, UserID, AddressID, CreditCardNum, ExpiryDate, CVV, CardHolderName) VALUES (3, 3, 3, 1234567812345678, "0825", 300, "Bob Carlson")`];
  
  addPaymentDetailsQueries.forEach(async (queryString) => {
    let insertPaymentDetails = await new Promise((resolve, reject) => {
      con.query(queryString, function (err, res) {
        if (err) {
          reject("Error inserting dummy data into PaymentDetails");
        }
        resolve(res);
      });
    });
  });
  
  const getAllUsersQuery = `SELECT * FROM Users`;

  const getAllUsers = await new Promise((resolve, reject) => {
    con.query(getAllUsersQuery, function (err, res) {
      if (err) {
        reject("Couldn't get all Users from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getAllUsers),
  };
};

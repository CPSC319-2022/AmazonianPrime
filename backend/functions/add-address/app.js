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
    CityName,
    Province,
    StreetAddress,
    PostalCode,
    Country,
    IsBillingAddr,
    IsShipAddr,
  } = JSON.parse(event.body);

  const checkCountryQuery = `SELECT * FROM Country WHERE CityName = "${CityName}" AND Province = "${Province}" AND StreetAddress = "${StreetAddress}"`;

  const getCountry = await new Promise((resolve, reject) => {
    con.query(checkCountryQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the Country from database!");
      }
      resolve(res);
    });
  });

  if (getCountry.length < 1) {
    const addCountryQuery = `INSERT INTO Country(CityName, Province, StreetAddress, PostalCode, Country) VALUES("${CityName}", "${Province}", "${StreetAddress}", "${PostalCode}", "${Country}")`;
    const addCountry = await new Promise((resolve, reject) => {
      con.query(addCountryQuery, function (err, res) {
        if (err) {
          reject("Couldn't add Country to database!");
        }
        resolve(res);
      });
    });
  }

  const addAddressQuery = `INSERT INTO Address(UserID, CityName, Province, StreetAddress, IsBillingAddress, IsShippingAddress) VALUES(${UserID}, "${CityName}", "${Province}", "${StreetAddress}", ${IsBillingAddr}, ${IsShipAddr})`;

  const addAddress = await new Promise((resolve, reject) => {
    con.query(addAddressQuery, function (err, res) {
      if (err) {
        reject("Couldn't add the user to database!");
      }
      resolve(res);
    });
  });

  const AddressId = addAddress['insertId'];

  const getAddressByIdQuery = `SELECT * FROM Address WHERE AddressID = "${AddressId}"`;

  const getAddress = await new Promise((resolve, reject) => {
    con.query(getAddressByIdQuery, function (err, res) {
      if (err) {
        reject("Couldn't get the address from database!");
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(getAddress[0]),
  };
};

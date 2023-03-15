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

    const UserID = event.pathParameters.UserID;
    console.log(UserID)

    const {
        AddressID,
        ShippingStatus
    } = JSON.parse(event.body);

    if (
        !AddressID ||
        !ShippingStatus
    ) {
        return {
            statusCode: 400,
            body: 'Missing required fields',
        };
    }

    if (UserID === null || UserID == undefined) {
        return {
            statusCode: 400,
            body: `Missing UserID. Please provide a UserID in the URL.`,
        };
    }

    const getUserQuery = `SELECT * FROM Users WHERE UserID = ${parseInt(UserID)}`;

    const getUser = await new Promise((resolve, reject) => {
        con.query(getUserQuery, function (err, res) {
            if (err) {
                reject("Couldn't get the user from database!");
            }
            resolve(res);
        });
    });

    if (getUser.length < 1) {
        return {
            statusCode: 404,
            body: `User with UserID ${UserID} not found`,
        };
    }

    if (getUser.length < 1) {
        return {
            statusCode: 404,
            body: `Missing UserID. Please provide a UserID in the request body.`,
        };
    }

    // If the user isn't an admin and the given userID doesn't match, don't delete listing
    const createOrdersQuery = `INSERT INTO Orders (UserID, AddressID, ShippingStatus)
                          VALUES (${UserID}, ${AddressID}, ${ShippingStatus});`;

    const createOrdersUser = await new Promise((resolve, reject) => {
        con.query(createOrdersQuery, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });

    return {
        statusCode: 200,
        body: createOrdersUser,
    };
};

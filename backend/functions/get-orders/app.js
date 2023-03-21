const dbConnection = require('dbConnection.js');
const userValidate = require('UserValidate.js');
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

    const UserID = event.queryStringParameters.userID;
    const offset = event.queryStringParameters.offset;
    const limit = event.queryStringParameters.limit;

    if (!userValidate.validateUser(UserID)) {
        return {
            statusCode: 404,
            body: 'User doesnt exist'
        }
    }

    const getOrderByUserIDQuery = `SELECT *
                                   FROM Users
                                   WHERE UserID = ${UserID} 
                                   LIMIT ${limit}
                                   OFFSET ${offset}`;

    getOrderByUserID = await new Promise((resolve, reject) => {
        con.query(getOrderByUserIDQuery, function (err, res) {
            if (err) {
                reject("Couldn't get the user from database!");
            }
            resolve(res);
        });
    });

    const result = getOrderByUserID.map(order => ({
        OrderID: order.OrderID,
        UserID: order.UserID,
        AddressID: order.AddressID,
        ShippingStatus: order.ShippingStatus ,
        OrderTimestamp: order.OrderTimestamp
    }));

    return {
        statusCode: 200,
        body: JSON.stringify({
            Data: result
        }),
    };
}
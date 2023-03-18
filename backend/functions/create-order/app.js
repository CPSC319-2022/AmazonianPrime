const dbConnection = require('dbConnection.js');
var mysql = require('mysql');
const userValidate = require('UserValidate.js')

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
        ShoppingCartItems,
        ShippingStatus
    } = JSON.parse(event.body);

    if (
        !UserID ||
        !AddressID ||
        !ShoppingCartItems ||
        !Array.isArray(ShoppingCartItems) ||
        !ShippingStatus
    ) {
        return {
            statusCode: 400,
            body: 'Missing required fields'
        }
    }

    if (!userValidate.validateUser(UserID)) {
        return {
            statusCode: 404,
            body: 'User doesnt exist'
        }
    }


    const createOrdersQuery = `INSERT INTO Orders (UserID, AddressID, ShippingStatus)
                               VALUES (${UserID}, ${AddressID}, ${ShippingStatus});`;

    const createOrders = await new Promise((resolve, reject) => {
        con.query(createOrdersQuery, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });


    for (item in ShoppingCartItems) {
        const addOrderItemQuery = `INSERT INTO OrderItem (OrderID, ListingID, OrderQuantity)
                                   VALUES (${createOrders['insertId']}, ${item.ListingID}, ${item.OrderQuantity});`;

        const addOrderItem = await new Promise((resolve, reject) => {
            con.query(addOrderItemQuery, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    return {
        statusCode: 200,
        body: createOrders,
    };
};

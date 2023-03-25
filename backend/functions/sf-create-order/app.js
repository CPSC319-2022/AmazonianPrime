const dbConnection = require('dbConnection.js');
// const userValidate = require('UserValidate.js')

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

  const { UserID, AddressID, Items } = event['body'];

  const ShoppingCartItems = Items;

  if (
    !UserID ||
    !AddressID ||
    !ShoppingCartItems ||
    !Array.isArray(ShoppingCartItems)
  ) {
    return {
      statusCode: 400,
      body: 'Missing required fields',
    };
  }

  const createOrdersQuery = `INSERT INTO Orders (UserID, AddressID, ShippingStatus)
                              VALUES (${UserID}, ${AddressID}, "On it's way");`;

  const createOrders = await new Promise((resolve, reject) => {
    con.query(createOrdersQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  for (const index in ShoppingCartItems) {
    let CartItem = ShoppingCartItems[index];
    const addOrderItemQuery = `INSERT INTO OrderItem (OrderID, ListingID, OrderQuantity)
                                    VALUES (${createOrders['insertId']}, ${CartItem.ListingID}, ${CartItem.Quantity});`;
    const addOrderItem = await new Promise((resolve, reject) => {
      con.query(addOrderItemQuery, function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  const OrderID = createOrders['insertId'];

  const getOrderItemsQuery = `SELECT * FROM OrderItem WHERE OrderID = ${OrderID}`;

  const getOrderItems = await new Promise((resolve, reject) => {
    con.query(getOrderItemsQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  const getOrderDetailsQuery = `SELECT * FROM Orders WHERE OrderID = ${OrderID}`;

  const getOrder = await new Promise((resolve, reject) => {
    con.query(getOrderDetailsQuery, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  return {
    statusCode: 200,
    body: { ...getOrder[0], Items: getOrderItems },
  };
};

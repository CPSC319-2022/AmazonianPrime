const dbConnection = require('dbConnection.js');
// var mysql = require('mysql');

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
  const Items = event['Items']

  for (let x in Items){
    const Item = Items[x];
    const PurchaseQuantity = Item['Quantity'];
    const ListedQuantity = Item['Listing']['Quantity'];

    if (PurchaseQuantity > ListedQuantity){
      return {
        statusCode: 400,
        body: "Error: INVALID Purchase! Item to purchase is more than listed quantity!",
      };
    }
  }

  // return {
  //   statusCode: 200,
  //   body: Items,
  // };
  return {
    statusCode: 200,
    body: {...event}
  }
};

const dbConnection = require('dbConnection.js');
const {
  EmptyShoppingCartError,
  PurchaseQuantityExceededError,
} = require('errorStates.js');
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
  try{
  const Items = event['Items'];

  if (Items.length < 1) {
    throw new EmptyShoppingCartError(`The user's shopping cart is empty!`);
  }

  for (let x in Items) {
    const Item = Items[x];
    const ListingName = Item['Listing']['ListingName'];
    const PurchaseQuantity = Item['Quantity'];
    const ListedQuantity = Item['Listing']['Quantity'];

    if (PurchaseQuantity > ListedQuantity) {
      throw new PurchaseQuantityExceededError(
        `The amount to purchase, ${ListingName}, is exceeding the available quantity`,
      );
    }
  }

  return {
    statusCode: 200,
    body: { ...event },
  };
  } catch (e) {
    return {
      statusCode: 500, body: JSON.stringify({error: err.toString()})
    };
  }
};

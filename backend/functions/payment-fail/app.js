const {
  PaymentFailureError,
  ErrorWrapper,
  jsonFriendlyErrorReplacer
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
  let error = new PaymentFailureError('The payment process was unsucessful!');
  let message = {
    body: event,
    error: JSON.stringify(error, jsonFriendlyErrorReplacer)
  }
  throw new ErrorWrapper(JSON.stringify(message));
};

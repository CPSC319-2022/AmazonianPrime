const {
  EmptyShoppingCartError,
  PurchaseQuantityExceededError,
  ErrorWrapper
} = require('errorStates.js');

const dbConnection = require('dbConnection.js');

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
  if (event['Error'] === "ErrorWrapper"){
    let errorCause = JSON.parse(event['Cause']);
    let errorWrapper = JSON.parse(errorCause['errorMessage']);
    
    let errorBody = errorWrapper['body'];
    let errorObject = JSON.parse(errorWrapper['error']);

    let itemsToReturn = errorBody['Items']
    if (itemsToReturn.length > 0){
      try {
        const con = await dbConnection.connectDB(
          process.env.DatabaseAddress,
          'user',
          'Password1234',
          'databaseAmazonianPrime',
        );

        for(const item of itemsToReturn) {
          let quantityToAdd = item['Quantity'];
          let ListingID = item['ListingID'];

          const updateListingQuery = `UPDATE Listing SET Quantity = Quantity + ${quantityToAdd} WHERE ListingID = ${ListingID}`;

          console.log(updateListingQuery);

          const updateListing = await new Promise((resolve, reject) => {
            con.query(updateListingQuery, function (err, res) {
              if (err) {
                reject("There was an error whilst updating the listing quantity!");
              }
              resolve(res);
            });
          });
        };

        await dbConnection.disconnectDB(con);
      } catch (e){
        // If there is an issue whilst unreserving the items, return an error!
        return {
          status: 400,
          body: 'The step function encountered an error unreserving the items',
          error: e,
        };
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      status: 400,
      body: 'The step function encountered an error in the checkout process',
      error: errorObject,
    };
  }
  return {
    status: 400,
    body: 'The step function encountered an error in the checkout process',
    error: event,
  };
};
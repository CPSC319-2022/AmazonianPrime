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
  const itemsToReserve = event['Items']
  if (itemsToReserve.length > 0){
      const con = await dbConnection.connectDB(
        process.env.DatabaseAddress,
        'user',
        'Password1234',
        'databaseAmazonianPrime',
      );

      for(const item of itemsToReserve) {
        let quantityToAdd = item['Quantity'];
        let ListingID = item['ListingID'];

        const updateListingQuery = `UPDATE Listing SET Quantity = Quantity - ${quantityToAdd} WHERE ListingID = ${ListingID}`;

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
  }
  return {
    statusCode: 200,
    body: { ...event },
  };
};
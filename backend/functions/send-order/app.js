const AWS = require('aws-sdk');

const ses = new AWS.SES();
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
  console.log([`tmartinuson@gmail.com`]);
  const params = {
      Source: 'amazonianprime2023@gmail.com',
      Destination: {
          ToAddresses: [`tmartinuson@gmail.com`],
      },
      Message: {
          Subject: {
              Data: 'Order Confirmation',
              Charset: 'UTF-8',
          },
          Body: {
              Text: {
                  Data: 'Order has been received',
                  Charset: 'UTF-8',
              },
          },
      },
  };

  try {
      await ses.sendEmail(params).promise();
      return {
          statusCode: 200,
          body: 'Order Email Sent',
      };
  } catch (err) {
      return {
          statusCode: 500,
          body: JSON.stringify({
              Message: 'Failed to Send Order Email',
              Error: err.message,
          }),
      };
  }
};

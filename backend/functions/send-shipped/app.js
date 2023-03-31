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
  const { User, OrderID, OrderDate, Order } = event['body'];

  console.log(event);

  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short', timeZone: 'America/Los_Angeles' };
  const ShippedDate = date.toLocaleDateString('en-US', options);

  const carriers = ['Canada Post', 'FedEx', 'Purolator', 'UPS'];
  const ShippedCarrier = carriers[Math.floor(Math.random() * carriers.length)];

  const TrackingNumber = Math.floor(Math.random() * 900000000000) + 100000000000;

  const params = {
      Source: 'amazonianprime2023@gmail.com',
      Destination: {
          ToAddresses: [User.Email],
      },
      Message: {
          Subject: {
              Data: `Order #${OrderID} Shipped`,
              Charset: 'UTF-8',
          },
          Body: {
              Text: {
                  Data: `Dear ${User.FirstName} ${User.LastName},

We are excited to let you know that your Amazonian Prime order has shipped! Here are the details of your shipment:

Order Number: #${OrderID}
Order Date: ${OrderDate}
Shipment Date: ${ShippedDate}
Shipping Carrier: ${ShippedCarrier}
Tracking Number: ${TrackingNumber}

Order Details:
${Order}

We have carefully packed your items and they are on their way to you. You can track your package's journey using the tracking number provided above. Please note that tracking information may take a few hours to update after the shipment has left our facility.

If you have any questions or concerns about your shipment, please don't hesitate to contact us. We are always here to help.

Thank you for choosing Amazonian Prime. We hope you enjoy your purchase and look forward to serving you again soon.

Best regards,

Amazonian Prime Customer Service`,
                  Charset: 'UTF-8',
              },
          },
      },
  };

  try {
      await ses.sendEmail(params).promise();
      return {
          statusCode: 200,
          body: {...event['body'], ShippedDate, ShippedCarrier, TrackingNumber},
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

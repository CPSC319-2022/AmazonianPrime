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
  const { User, OrderID, OrderDate, ShippedDate, ShippedCarrier, TrackingNumber, Order } = event['body'];

  console.log(event);
  
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short', timeZone: 'America/Los_Angeles' };
  const DeliveredDate = date.toLocaleDateString('en-US', options);

  const params = {
      Source: 'amazonianprime2023@gmail.com',
      Destination: {
          ToAddresses: [User.Email],
      },
      Message: {
          Subject: {
              Data: `Order #${OrderID} Delivered`,
              Charset: 'UTF-8',
          },
          Body: {
              Text: {
                  Data: `Dear ${User.FirstName} ${User.LastName},

We are delighted to inform you that your Amazonian Prime order has been successfully delivered! We hope you are satisfied with your purchase and everything arrived in good condition.

Here are the delivery details:

Order Number: #${OrderID}
Order Date: ${OrderDate}
Shipment Date: ${ShippedDate}
Delivery Date: ${DeliveredDate}
Shipping Carrier: ${ShippedCarrier}
Tracking Number: ${TrackingNumber}

Order Details:
${Order}

If you have any questions or concerns about your order, please do not hesitate to reach out to us. We are always here to assist you.

Thank you for shopping with Amazonian Prime. We value your business and look forward to serving you again in the future.

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
          body: "Send email workflow successful",
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

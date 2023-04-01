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
  const { User, OrderID, OrderTimestamp, Order } = event['body'];
  
  const date = new Date(OrderTimestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short', timeZone: 'America/Los_Angeles' };
  const OrderDate = date.toLocaleDateString('en-US', options);

  console.log(event);
  
  const params = {
      Source: 'amazonianprime2023@gmail.com',
      Destination: {
          ToAddresses: [User.Email],
      },
      Message: {
          Subject: {
              Data: `Order Confirmation #${OrderID}`,
              Charset: 'UTF-8',
          },
          Body: {
              Text: {
                  Data: `Dear ${User.FirstName} ${User.LastName},

Thank you for choosing Amazonian Prime! We wanted to let you know that your order has been received and is being processed. Here are the details of your order:

Order Number: #${OrderID}
Order Date: ${OrderDate}

Order Details:
${Order}

We want you to know that we are working hard to get your order to you as soon as possible. Once your order ships, you will receive a shipping confirmation email with tracking information so you can easily follow your package's journey.

If you need to make any changes to your order, please reach out to us as soon as possible. We will do our best to make any changes before your order ships.

Thank you for your business, and please let us know if you have any questions or concerns.

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
          body: {...event['body'], OrderDate},
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

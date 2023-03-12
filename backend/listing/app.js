let response;
var fs = require('fs');

// TODO: DELETE THIS FUNCTION
// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

const values = [
  [
    'da95cf19-91de-4eca-8a95-18eb4ce42bce',
    {
      images: [
        base64_encode('./images/monstera-1.PNG'),
        base64_encode('./images/monstera-3.PNG'),
        base64_encode('./images/monstera-3.PNG'),
        base64_encode('./images/monstera-4.PNG'),
        base64_encode('./images/monstera-5.PNG'),
      ],
      listingName: 'Healthy Monstera',
      cost: '20',
      condition: 'Good - New',
      description: 'Selling this very healthy monstera',
      user: {
        FirstName: 'Phil',
        LastName: 'Dunphy',
      },
    },
  ],
  [
    'aa95cf19-91de-4eca-8a95-18eb4ce42bce',
    {
      images: [base64_encode('./images/arm-chair.PNG')],
      listingName: 'MCM Arm Chair',
      cost: '40',
      condition: 'Good - New',
      description: 'Great condition.',
      user: {
        FirstName: 'Claire',
        LastName: 'Dunphy',
      },
    },
  ],
];
const listingDB = new Map(values);
exports.lambdaHandler = async (event, context) => {
  try {
    response = {
      statusCode: 200,
      headers: {
        // CORS: https://stackoverflow.com/questions/67065130/how-to-enable-cors-with-aws-sam
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*', // Allow from anywhere
        'Access-Control-Allow-Methods': 'GET', // Allow only GET request
      },
      body: JSON.stringify(listingDB.get(event.pathParameters.listingid)),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

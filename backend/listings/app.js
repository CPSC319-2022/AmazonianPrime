// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        response = {
            'statusCode': 200,
            headers: {
                // CORS: https://stackoverflow.com/questions/67065130/how-to-enable-cors-with-aws-sam
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
                "Access-Control-Allow-Methods": "GET" // Allow only GET request 
            },
            'body': JSON.stringify([
                {
                    // IMPORTANT: we need this id component
                    id: "da95cf19-91de-4eca-8a95-18eb4ce42bce",
                    image: base64_encode('./images/monstera.PNG'),
                    listingName: "Healthy Monstera",
                    cost: "20",
                    condition: "Good - New",
                    description: "Selling this very healthy monstera",
                    user: {
                        firstName: "Phil",
                        lastName: "Dunphy"
                    }
                },
                {
                    id: "aa95cf19-91de-4eca-8a95-18eb4ce42bce",
                    image: base64_encode('./images/arm-chair.PNG'),
                    listingName: "MCM Arm Chair",
                    cost: "40",
                    condition: "Good - New",
                    description: "Great condition.",
                    user: {
                        firstName: "Claire",
                        lastName: "Dunphy"
                    }
                },
                {
                    id: "fa95cf19-91de-4eca-8a95-18eb4ce42bce",
                    image: base64_encode('./images/dress.PNG'),
                    listingName: "Prom Dress",
                    cost: "60",
                    condition: "Used - Good",
                    description: "Great condition.",
                    user: {
                        firstName: "Hailey",
                        lastName: "Dunphy"
                    }
                },
                {
                    id: "da95cf19-91de-4eca-8a95-18ea4ce42bce",
                    image: base64_encode('./images/shoes.PNG'),
                    listingName: "New Balance Shoes",
                    cost: "40",
                    condition: "Good - New",
                    description: "Great condition.",
                    user: {
                        firstName: "Luke",
                        lastName: "Dunphy"
                    }
                },
                {
                    id: "da95cf19-91de-4eca-8a95-18eb4ce42bcd",
                    image: base64_encode('./images/sweater.PNG'),
                    listingName: "Comfortable Sweater",
                    cost: "10",
                    condition: "Good - New",
                    description: "Great condition.",
                    user: {
                        firstName: "Alex",
                        lastName: "Dunphy"
                    }
                },
                {
                    id: "da95cf19-91de-4eca-8a95-18eb4ce42bcb",
                    image: base64_encode('./images/tree.PNG'),
                    listingName: "Tall Coffee Tree",
                    cost: "30",
                    condition: "Good - New",
                    description: "Great condition.",
                    user: {
                        firstName: "Jeff",
                        lastName: "Bezos"
                    }
                }
            ])
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

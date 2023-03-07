const fileType = require('file-type');
const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;
const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

exports.lambdaHandler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        // mime is the type of the image
        if (!body || !body.image || !body.mime) {
            return {
                headers: {
                    // CORS: https://stackoverflow.com/questions/67065130/how-to-enable-cors-with-aws-sam
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*", // Allow from anywhere
                    "Access-Control-Allow-Methods": "GET", // Allow only GET request
                },
                statusCode: 400,
                body: JSON.stringify({error: 'Incorrect body on request, doesnt satisfy "!body || !body.image || !body.mime" '}),
            };
        }
        // not allowed to save this kind of image
        if (allowedMimes.includes(body.mime)) {
            return {
                headers: {
                    // CORS: https://stackoverflow.com/questions/67065130/how-to-enable-cors-with-aws-sam
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*", // Allow from anywhere
                    "Access-Control-Allow-Methods": "GET", // Allow only GET request
                },
                statusCode: 400,
                body: JSON.stringify({error: 'Mime is not one of "image/jpeg, image/png, image/jpeg" '}),
            };
        }

        let imageData = body.image;

        //check if image is base 64, and getting the data to make it a buffer
        if (body.image.substring(0, 7) === 'base64,') {
            imageData = body.image.substring(7, body.image.length);
        }

        const buffer = Buffer.from(imageData, 'base64');
        const fileInfo = await fileType.fileTypeFromBuffer(buffer);
        const detectedExt = fileInfo.ext;
        const detectedMime = fileInfo.mime;

        if (detectedMime !== body.mime) {
            return {
                headers: {
                    // CORS: https://stackoverflow.com/questions/67065130/how-to-enable-cors-with-aws-sam
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*", // Allow from anywhere
                    "Access-Control-Allow-Methods": "GET", // Allow only GET request
                },
                statusCode: 400,
                body: JSON.stringify({error: 'Mime types doesnt match'})
            };
        }

        const name = uuid()
        const key = `${name}.${detectedExt}`;

        console.log(`Writing Image to S3 Bucket. Image: {$key}`);

        const params = {
            Bucket: bucketName,
            Key: key, // Replace my-file.txt with the desired name of your file
            Body: buffer, // Replace Hello, world! with the contents of your file
            ContentType: body.mime
        };

        const result = await s3.upload(params).promise();

        console.log(`File uploaded successfully to ${result.Location}`);
        return {
            headers: {
                // CORS: https://stackoverflow.com/questions/67065130/how-to-enable-cors-with-aws-sam
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere
                "Access-Control-Allow-Methods": "GET", // Allow only GET request
            },
            statusCode: 200,
            body: JSON.stringify({imageUrl: result.Location})
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

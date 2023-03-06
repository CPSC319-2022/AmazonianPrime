const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;

exports.lambdaHandler = async (event, context) => {
    // get the image body from the event
    const imageBody = JSON.parse(event.body).base64;
    if (!imageBody) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'body is null '}),
        };
    }
    // parse the image body into a buffer
    const imageBuffer = Buffer.from(imageBody, 'base64');
    console.log(imageBuffer);
    // generate a unique key for the image based on the current timestamp
    const key = `images/${Date.now()}.jpeg`;

    // write the image buffer into an S3 bucket with the generated key
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: imageBuffer
    };

    const result = await s3.upload(params).promise();

    // return a success message with the generated key
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
    // return result;
};
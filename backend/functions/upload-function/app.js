const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;

exports.lambdaHandler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        if (!body || !body.image || !body.mime) {
            return Responses._400({ message: 'incorrect body on request' });
        }
        const params = {
            Bucket: bucketName, // Replace my-s3-bucket with the name of your S3 bucket
            Key: 'my-file.txt', // Replace my-file.txt with the desired name of your file
            Body: 'Hello, world!', // Replace Hello, world! with the contents of your file
        };

        const result = await s3.upload(params).promise();

        console.log(`File uploaded successfully to ${result.Location}`);
        return result.Location;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

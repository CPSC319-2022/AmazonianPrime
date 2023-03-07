const AWS = require('aws-sdk');
const {v4: uuid} = require('uuid');
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;


exports.lambdaHandler = async (event, context) => {

    const listOfImages = JSON.parse(event.body).images;
    if (!Array.isArray(listOfImages) || listOfImages.length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'Invalid image list'}),
        };
    }

    const results = [];
    for (const image of listOfImages) {
        const imageBuffer = Buffer.from(image, 'base64');
        const key = `${uuid()}.jpeg`;
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: imageBuffer,
        };

        const result = await s3.upload(params).promise();
        results.push(result);
    }

    return {
        statusCode: 200,
        body: results,
    };
};

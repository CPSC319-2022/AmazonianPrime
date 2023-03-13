const AWS = require('aws-sdk');
const {v4: uuid} = require('uuid');
const mysql = require('mysql');
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;

exports.lambdaHandler = async (event, context) => {
    var con = mysql.createConnection({
        host: process.env.DatabaseAddress,
        user: "user",
        password: "Password1234",
        database: "databaseAmazonianPrime",
    });

    const connectionStatus = await new Promise((resolve, reject) => {
        con.connect(function (err) {
            if (err) {
                console.log(err);
                reject(err);
                //TO-DO: Need to figure out how to throw an error to primer function so that it rollsback the deployment
            }
            resolve("Connected to Database!");
        });
    });

    const {ListingID, Images} = JSON.parse(event.body);
    if (!Array.isArray(Images) || Images.length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'Invalid image array'}),
        };
    }

    for (const image of Images) {
        const imageBuffer = Buffer.from(image, 'base64');
        const key = `${uuid()}.jpeg`;
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: imageBuffer,
        };
        const result = await s3.upload(params).promise();

        const addListingQuery = `INSERT INTO ListingImage (ListingID, S3ImagePath)
                                 VALUES (?, ?);`;
        console.log("adding to DB ")
        const addImage = await new Promise((resolve, reject) => {
            con.query(addListingQuery, [ListingID, result.Location], function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Addition was succesful"}),
    };
};

const AWS = require('aws-sdk');
const {v4: uuid} = require('uuid');
const mysql = require('mysql');
const dbConnection = require("dbConnection.js");
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;

exports.lambdaHandler = async (event, context) => {
    const con = await dbConnection.connectDB(
        process.env.DatabaseAddress,
        "user",
        "Password1234",
        "databaseAmazonianPrime"
    );

    const {
        UserID,
        ListingName,
        Description,
        Cost,
        Quantity,
        Category,
        ItemCondition,
        Images,
    } = JSON.parse(event.body);

    console.log("UserID: " + UserID)
    console.log("ListingName: " + ListingName)
    console.log("Description: " + Description)
    console.log("Cost: " + Cost)
    console.log("Quantity: " + Quantity)
    console.log("Category: " + Category)
    console.log("ItemCondition: " + ItemCondition)
    console.log("Images: " + Images)

    if (
        !UserID ||
        !ListingName ||
        !Description ||
        !Cost ||
        !Quantity ||
        !Category ||
        !ItemCondition ||
        !Array.isArray(Images) ||
        Images.length === 0
    ) {
        return {
            statusCode: 400,
            body: 'Missing required fields',
        };
    }
    const createListingQuery = `INSERT INTO Listing(UserID, ListingName, Description, Cost, Quantity, Category,
                                                    ItemCondition, IsActiveListing)
                                VALUES (${UserID}, "${ListingName}", "${Description}", ${Cost}, ${Quantity},
                                        "${Category}", "${ItemCondition}", true)`
    let createListing;
    try {
       createListing = await new Promise((resolve, reject) => {
            con.query(createListingQuery, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    } catch(err){
        return {
            statusCode: 400,
            body: JSON.stringify({error: err})
        }
    }

    const ListingID = createListing['insertId'];
    console.log("ListingID: " + ListingID)

    const getListingByIdQuery = `SELECT * FROM Listing WHERE ListingID = "${ListingID}"`;

    const getListing = await new Promise((resolve, reject) => {
        con.query(getListingByIdQuery, function (err, res) {
            if (err) {
                console.log("Failed on line 93")
                return {
                    status:400,
                    body: JSON.stringify(err)
                }
            }
            resolve(res);
        });
    });

    for (const image of Images) {
        let imageBuffer;
        try {
            imageBuffer = Buffer.from(image, 'base64');
        } catch (error) {
            console.log("Failed on line 109")
            return {
                statusCode: 400,
                body: JSON.stringify({error: error})
            }
        }

        const key = `${uuid()}.jpeg`;
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: imageBuffer,
        };
        let result;
        try {
            result = await s3.upload(params).promise();
            console.log('Upload successful: ', result);
        } catch (err) {
            console.log("Failed on line 126")
            return{
                statusCode: 400,
                body: JSON.stringify(err)
            }
        }


        const addListingQuery = `INSERT INTO ListingImage (ListingID, S3ImagePath)
                                 VALUES (?, ?);`;
        console.log("adding to DB ")
        const addImage = await new Promise((resolve, reject) => {
            con.query(addListingQuery, [ListingID, result.Location], function (err, res) {
                if (err) {
                    console.log("Failed on line 140")
                    reject(err);
                }
                resolve(res);
            });
        });

        const PictureID = addImage['insertId'];
        const getListingImageByIdQuery = `SELECT * FROM ListingImage WHERE PictureID = ${PictureID}`;
        const getListing = await new Promise((resolve, reject) => {
            con.query(getListingImageByIdQuery, function (err, res) {
                if (err) {
                    console.log("Failed on line 153")
                    reject(err)
                    return {
                        status:400,
                        body: JSON.stringify(err)
                    }
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

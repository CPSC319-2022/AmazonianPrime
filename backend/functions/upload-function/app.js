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
                reject("Failed to connect to the database");
                //TO-DO: Need to figure out how to throw an error to primer function so that it rollsback the deployment
            }
            resolve("Connected to Database!");
        });
    });

    const {ListingID,Images} = JSON.parse(event.body);
    if (!Array.isArray(Images) || Images.length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'Invalid image list'}),
        };
    }

    const results = [];
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

            const addImage = await new Promise((resolve, reject) => {
                con.query(addListingQuery, [ListingID, result.Location] ,function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });

        results.push(result);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(results),
    };
    // var con = mysql.createConnection({
    //     host: "cpsc319rds.cejp5sru6t7p.us-west-2.rds.amazonaws.com",
    //     user: "user",
    //     password: "Password1234",
    //     database: "databaseAmazonianPrime",
    // });
    //
    // // const connectionStatus = await new Promise((resolve, reject) => {
    // //     con.connect(function (err) {
    // //         if (err) {
    // //             console.log("Failed to connect to the database");
    // //             reject(err);
    // //             //TO-DO: Need to figure out how to throw an error to primer function so that it rollsback the deployment
    // //         }
    // //
    // //         resolve("Connected to Database!");
    // //     });
    // // });
    //
    //
    // // const listingID = 2;
    // // const listOfImages = ["iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="]
    // const listOfImages = JSON.parse(event.body).listOfImages;
    // // const listOfImages = JSON.parse(event.body).images;
    // if (!Array.isArray(listOfImages) || listOfImages.length === 0) {
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify({error: 'Invalid image list'}),
    //     };
    // }
    //
    //
    // const results = [];
    // for (const image of listOfImages) {
    //     const imageBuffer = Buffer.from(image, 'base64');
    //     const key = `${uuid()}.jpeg`;
    //     const params = {
    //         Bucket: bucketName,
    //         Key: key,
    //         Body: imageBuffer,
    //     };
    //
    //     const result = await s3.upload(params).promise();
    //
    //     // const addListingQuery = `INSERT INTO ListingImage (ListingID, S3ImagePath)
    //     //                          VALUES (?, ?);`;
    //     //
    //     // return {
    //     //     statusCode: 200,
    //     //     body: JSON.stringify({query: addListingQuery})
    //     // };
    //
    //     // const addImage = await new Promise((resolve, reject) => {
    //     //     con.query(addListingQuery, [listingID, result.Location] ,function (err, res) {
    //     //         if (err) {
    //     //             reject(err);
    //     //         }
    //     //         resolve(res);
    //     //     });
    //     // });
    //
    //
    //     results.push(result);
    // }
    //
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(results),
    // };
};

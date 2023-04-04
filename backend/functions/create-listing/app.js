const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');
const dbConnection = require('dbConnection.js');
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;

exports.lambdaHandler = async (event, context) => {
  const con = await dbConnection.connectDB(
    process.env.DatabaseAddress,
    'user',
    'Password1234',
    'databaseAmazonianPrime',
  );

  const {
    UserID,
    ListingName,
    Description,
    Cost,
    Quantity,
    Category,
    Size,
    Brand,
    Colour,
    ItemCondition,
    Images,
  } = JSON.parse(event.body);

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

  const escapedDescription = Description.replace(/"/g, '\\"');
  const createListingQuery = `INSERT INTO Listing(UserID, ListingName, Description, Cost, Quantity, Category, ${
    Size !== undefined ? 'Size, ' : ''
  }${Brand !== undefined ? 'Brand, ' : ''}${
    Colour !== undefined ? 'Colour, ' : ''
  }ItemCondition, IsActiveListing) VALUES(${UserID}, "${ListingName}", "${escapedDescription}", ${Cost}, ${Quantity}, "${Category}", ${
    Size !== undefined ? `"${Size}",` : ''
  } ${Brand !== undefined ? `"${Brand}",` : ''} ${
    Colour !== undefined ? `"${Colour}",` : ''
  } "${ItemCondition}", true)`;

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
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err }),
    };
  }

  const ListingID = createListing['insertId'];
  console.log('ListingID: ' + ListingID);

  const getListingByIdQuery = `SELECT * FROM Listing WHERE ListingID = "${ListingID}"`;

  const getListing = await new Promise((resolve, reject) => {
    con.query(getListingByIdQuery, function (err, res) {
      if (err) {
        console.log('Failed on line 93');
        return {
          status: 400,
          body: JSON.stringify(err),
        };
      }
      resolve(res);
    });
  });
  let ImagesUrl = [];
  for (const image of Images) {
    let imageBuffer;
    try {
      imageBuffer = Buffer.from(image, 'base64');
    } catch (error) {
      console.log('Failed on line 109');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error }),
      };
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
      console.log('Failed on line 126');
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }
    ImagesUrl.push(result.Location);

    const addListingQuery = `INSERT INTO ListingImage (ListingID, S3ImagePath)
                                 VALUES (?, ?);`;
    console.log('adding to DB ');
    const addImage = await new Promise((resolve, reject) => {
      con.query(
        addListingQuery,
        [ListingID, result.Location],
        function (err, res) {
          if (err) {
            console.log('Failed on line 140');
            reject(err);
          }
          resolve(res);
        },
      );
    });
  }
  getListing[0]['Images'] = ImagesUrl;

  await dbConnection.disconnectDB(con);
  return {
    statusCode: 200,
    body: JSON.stringify(getListing[0]),
  };
};

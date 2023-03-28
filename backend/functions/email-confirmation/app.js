const AWS = require('aws-sdk');

const ses = new AWS.SES();

exports.lambdaHandler = async (event) => {
    const Email = JSON.parse(event.body).email;
    // Email parameters
    console.log([Email]);
    const params = {
        Source: 'amazonianprime2023@gmail.com',
        Destination: {
            ToAddresses: [Email],
        },
        Message: {
            Subject: {
                Data: 'Test Email from AWS SES',
                Charset: 'UTF-8',
            },
            Body: {
                Text: {
                    Data: 'This is a test email sent using AWS SES from a Lambda function.',
                    Charset: 'UTF-8',
                },
            },
        },
    };
    console.log("Email created");

    try {
        console.log("sending email now");
        const result = await ses.sendEmail(params).promise();
        console.log('Email sent:', result);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Email sent successfully',
            }),
        };
    } catch (error) {
        console.error('Failed to send email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to send email',
                error: error.message,
            }),
        };
    }
};

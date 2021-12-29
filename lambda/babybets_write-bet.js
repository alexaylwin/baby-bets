const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');

exports.handler = async (event, context) => {
    // TODO implement
    
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    
    try {
        switch(event.routeKey) {
            case "PUT /bets":
                const requestJSON = JSON.parse(event.body);
                const uuid = crypto.randomUUID();
                await dynamo.put({
                    TableName: "babybets_bets",
                    Item: {
                        betid: uuid,
                        ticketNum: requestJSON.ticketNum,
                        bets: requestJSON.bets,
                        user: requestJSON.user
                    }
                }).promise();
                body = `PUT item ${uuid}`;
                break;
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }
    
    return {
        statusCode,
        body,
        headers
    };
};

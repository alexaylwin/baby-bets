const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');

exports.handler = async (event, context) => {
    // TODO implement
    
    let body = '{[';
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    
    try {
        switch(event.routeKey) {
            case "PUT /bets":
                const requestJSON = JSON.parse(event.body);
                
                //Update bet table
                const betuuid = crypto.randomUUID();
                await dynamo.put({
                    TableName: "babybets_bets",
                    Item: {
                        betid: betuuid,
                        ticketNum: requestJSON.ticketNum,
                        bets: requestJSON.bets,
                        user: requestJSON.user
                    }
                }).promise();
                body += `{"operation": "PUT", "type":"bet", "id":"${betuuid}"}`;
                
                //Update pools table
                let poolsResp = await dynamo.scan({
                    TableName: "babybets_pools",
                }).promise();
                const pools = poolsResp.Items.map( (p) => {
                    const bet = requestJSON.bets.filter( (b) => p.betName == b.name)[0];
                    p.totalPool = parseInt(p.totalPool) + parseInt(bet.amount);
                    p.betsPerOption = p.betsPerOption.map( (bo) => {
                        if(bet.selectedBet == bo.option) {
                            bo.amount = parseInt(bo.amount) + parseInt(bet.amount); //Add the bet total to the selected option
                            bo.bets += parseInt(bet.amount) / 2; //Add the new numbers of bets
                        }
                        return bo;
                    });
                    
                    return p;
                });
                for(let p of pools) {
                    await dynamo.put({
                        TableName: "babybets_pools",
                        Item: {
                            poolid: p.poolid,
                            betName: p.betName,
                            totalPool: p.totalPool,
                            betsPerOption: p.betsPerOption
                        }
                    }).promise();
                    body += `{"operation": "PUT", "type":"pool", "id":"${p.poolid}"}`;
                }            
                
                break;
        }
    } catch (err) {
        statusCode = 400;
        body += `{"operation":"Error", "message":"${err}"}`;
    } finally {
        body += "]}";
        body = JSON.stringify(body);
    }
    
    return {
        statusCode,
        body,
        headers
    };
};

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    let winningBets = [{
        bet: 'Gender',
        win: 'Girl',
        label: 'Girl'
    }, {
        bet: 'BirthDate',
        win: '12',
        label: 'January 12th'
    }, {
        bet: 'BirthTime',
        win: '0',
        label: '3:00PM'
    },{
        bet: 'BabyName',
        win: 'A',
        label: 'Aurora'
    },{
        bet: 'BabyWeight',
        win: 'lt7',
        label: '6 pounds, 13 ounces'
    },{
        bet: 'AlexPassOut',
        win: 'No',
        label: 'Alex didn\'t pass out!'
    }]

   
    try {
        switch (event.routeKey) {
            case "GET /ticket":
                /**
                 * Do the following:
                 *  - Confirm we have a well formed ticket number from the num param
                 *  - Find the ticket identified by the ticket number
                 *  - Determine which bets were 'won'
                 *  - For each won bet, find the 
                 */
                const ticketNum = 'ZYT-SU0'; //event.queryStringParameters.num;
                const ticketQuery = {
                  TableName: 'babybets_bets',
                  IndexName: 'ticketNum-index',
                  KeyConditionExpression: 'ticketNum = :number',
                  ExpressionAttributeValues: {
                    ':number': ticketNum
                  },
                  
                }
                const ticket = await dynamo.query(ticketQuery).promise();
                console.log(ticket);
                if(ticket == null || ticket == undefined) { return 'ok' }
            default: 
                return event
        }
    } catch (e) {
        console.log(e);
        return 'error'
        
    }finally {

    }

}
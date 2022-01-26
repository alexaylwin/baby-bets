const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

const emptyPools = [
  {
    "poolid": "BirthDate",
    "totalPool": 0,
    "betsPerOption": [
     {
      "bets": 0,
      "amount": 0,
      "option": "lt10"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "11"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "12"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "13"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "14"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "15"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "16"
     }
    ],
    "betName": "BirthDate"
   },
   {
    "poolid": "AlexPassOut",
    "totalPool": 0,
    "betsPerOption": [
     {
      "bets": 0,
      "amount": 0,
      "option": "Yes"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "No"
     }
    ],
    "betName": "AlexPassOut"
   },
   {
    "poolid": "BabyName",
    "totalPool": 0,
    "betsPerOption": [
     {
      "bets": 0,
      "amount": 0,
      "option": "A"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "BZ"
     }
    ],
    "betName": "BabyName"
   },
   {
    "poolid": "Gender",
    "totalPool": 0,
    "betsPerOption": [
     {
      "bets": 0,
      "amount": 0,
      "option": "Boy"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "Girl"
     }
    ],
    "betName": "Gender"
   },
   {
    "poolid": "BirthTime",
    "totalPool": 0,
    "betsPerOption": [
     {
      "bets": 0,
      "amount": 0,
      "option": "0"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "10"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "20"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "30"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "40"
     },
     {
      "bets": 0,
      "amount": 8,
      "option": "50"
     }
    ],
    "betName": "BirthTime"
   },
   {
    "poolid": "BabyWeight",
    "totalPool": 0,
    "betsPerOption": [
     {
      "bets": 0,
      "amount": 0,
      "option": "lt7"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "7lb5"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "7lb12"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "8lb2"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "8lb9"
     },
     {
      "bets": 0,
      "amount": 0,
      "option": "gt8lb10"
     }
    ],
    "betName": "BabyWeight"
   }   
]

const calcTotalPool = (pool) => {
  return pool.betsPerOption.reduce((sum, betInfo) => sum + betInfo.amount, 0);
};

const updateBetInfo = (pool, option, amount) => {
  const newBpo = [...pool.betsPerOption];
  const newBets = amount / 2;
  const boIndex = newBpo.findIndex((bo) => bo.option === option);
  newBpo[boIndex].amount = newBpo[boIndex].amount + amount;
  newBpo[boIndex].bets = newBpo[boIndex].bets + newBets;

  return {
    ...pool,
    betsPerOption: newBpo,
  };
};

exports.handler = async (event, context) => {
  /**
   * Update the pool totals via batch, so that payouts can be recalculated
   */

  let body = "";
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  const newPools = [...emptyPools];

  try {
    /**
     * Do the following:
     * 1. Initialize the data structure for pools - initialized to zero
     * 2. For each bet
     *  2a. Update the betsPerOption for the option
     *  2b. Update the totalPool value
     */

    const ticketQuery = {
      TableName: "babybets_bets",
    };
    const ticketQueryResp = await dynamo.scan(ticketQuery).promise();
    const tickets = ticketQueryResp.Items;

    let acc = 0;

    tickets.forEach((ticket) => {
      console.log(ticket.user.name);
      ticket.bets.forEach((bet, index) => {
        let pIndex = newPools.findIndex((p) => p.betName === bet.name);
        if(bet !== undefined && pIndex > -1) {
          let p = {...newPools[pIndex]};
          console.log(p);
          p = updateBetInfo(p, bet.selectedBet, bet.amount);
          console.log(p);
          p.totalPool = calcTotalPool(p);
          newPools[pIndex] = { ...p };
        } else {
          console.log(ticket);
          console.log('Error on index: ' + index);
        }
      });
    });

    console.log(JSON.stringify(newPools));
  } catch (e) {
    console.log(e);
  } finally {
    return {
      statusCode,
      headers,
      body,
    };
  }
};

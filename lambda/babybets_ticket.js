const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

const calcPayout = (
  betAmount,
  betOption,
  pool
) => {
  //Calc payout
  if (pool === undefined) return 0;
  if (betOption === undefined || betOption === '') return 0;
  if (isNaN(betAmount)) betAmount = 0;
  if (betAmount === 0) return 0;

  let betsForOption = pool?.betsPerOption.find(
    (bo) => bo.option === betOption
  )?.bets;
  betsForOption =
    betsForOption === undefined ? betAmount / 2 : betsForOption + betAmount / 2;
  const payoutPerShare = (pool?.totalPool + betAmount) / betsForOption;
  return +(payoutPerShare * (betAmount / 2)).toFixed(2);
};

exports.handler = async (event, context) => {
  const winningBets = [
    {
      name: "Gender",
      win: "Girl",
      label: "Girl",
    },
    {
      name: "BirthDate",
      win: "12",
      label: "January 12th",
    },
    {
      name: "BirthTime",
      win: "0",
      label: "3:00PM",
    },
    {
      name: "BabyName",
      win: "A",
      label: "Aurora",
    },
    {
      name: "BabyWeight",
      win: "lt7",
      label: "6 pounds, 13 ounces",
    },
    {
      name: "AlexPassOut",
      win: "No",
      label: "Alex didn't pass out!",
    },
  ];

  let body = "";
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json'
  }

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
        const ticketNum = event.queryStringParameters.num;
        const ticketQuery = {
          TableName: "babybets_bets",
          IndexName: "ticketNum-index",
          KeyConditionExpression: "ticketNum = :number",
          ExpressionAttributeValues: {
            ":number": ticketNum,
          },
        };

        const ticketQueryResp = await dynamo.query(ticketQuery).promise();
        const ticket = ticketQueryResp.Items[0];
        if (ticket == null || ticket == undefined) {
          throw new Error(`Invalid ticket number: ${ticketNum}`)
        }

        const poolQuery = {
          TableName: "babybets_pools",
        }
        const poolQueryResp = await dynamo.scan(poolQuery).promise();
        const pools = poolQueryResp.Items;

        const betPayouts = ticket.bets.map((userBet) => {
          const pool = pools.find( (pool) => pool.betName == userBet.name);
          if(pool == undefined || pool == null) { throw new Error('No pool for bet ' + JSON.stringify(userBet))}

          const index = winningBets.findIndex(
            (winningBet) => userBet.name == winningBet.name && userBet.selectedBet == winningBet.win
          );
          const won = index >= 0;
          const payout = won ? calcPayout(userBet.amount, userBet.selectedBet, pool) : 0;
          const totalPool = pool.totalPool;
          return {
            name: userBet.name,
            selectedBet: userBet.selectedBet,
            amount: userBet.amount,
            won,
            payout,
            totalPool
          };
        });

        const totalPayout = betPayouts.reduce( (prev, curr) => prev + curr.payout, 0);
        const totalAmountBet = betPayouts.reduce ( (prev, curr) => prev + curr.amount, 0 );

        body += JSON.stringify({
          ticketNum: ticket.ticketNum,
          user: ticket.user,
          bets: betPayouts,
          totalPayout,
          totalAmountBet
        })
        break;
      default:
        throw new Error('Invalid operation: ' + event.routeKey)
    }
  } catch (e) {
    statusCode = 400
    body += `{"operation: "error" "message": "${e.message}"}`
    return 'Error ' + e;
  } finally {
    return {
      headers,
      statusCode,
      body
    }
  }
};

import React, { useState, useEffect } from "react";
import { BetTile } from "./components/bet-tile";
import { PlaceBet } from "./components/place-bet";
import Ticket from "./components/ticket";
import { Bet } from "./models/bet";
import { allBets } from "./data/bets";
import * as BetsAPI from "./services/bets-api";
import { UserInfo } from "./models/user";
import { generateTicketNumber } from "./utils/ticket-num";
import { Pool } from "./models/pool";
import { getPools } from "./services/pool-api";
import { Header } from "./components/header";
import { calcEstimatedPayout } from "./utils/bets";

function App() {
  const [bets, setBets] = useState<Bet[]>(allBets);
  const [betsSubmitted, setBetsSubmitted] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo>({name: '', email: ''});
  const [ticketNumber, setTicketNumber] = useState<string>('');
  const [pools, setPools] = useState<Pool[]>([]);
  const [initData, setInitData] = useState<boolean>(false);
  
  useEffect( () => {
    if(!initData) {
      getPools().then( (newPools) => setPools(newPools))
      setInitData(true);
    }
  });

  const changeBetAmount = (index: number) => (newAmount: number) => {
    const newbets = [...bets];
    //@ts-ignore
    newbets[index].amount = newAmount;
    setBets(newbets);
  };

  const changeBetSelection = (index: number) => (newSelection: string) => {
    const newBets = [...bets];
    newBets[index].selectedBet = newSelection;
    setBets(newBets);
  };

  const changeName = (name: string) => { setUser({...user, name })}
  const changeEmail = (email: string) => { setUser({...user, email })}

  
  /**
   * Calculate ticket code
   */
  const placeBets = () => {
    const ticketNum = generateTicketNumber();
    setTicketNumber(ticketNum);
    BetsAPI.placeBets(bets, user, ticketNum);
    //@ts-ignore
    const newBets = bets.map( (b) => b.estimatedPayout = calcEstimatedPayout(b.amount, b.selectedBet, pools[pools.findIndex( p => p.betName === b.name)]))
    setBetsSubmitted(true);
  }

  const betTiles = allBets.map((cbet, index) => {
    const rowClass = index % 2 == 0 ? "bet-row--light" : "bet-row--dark";
    const pool = pools.find( (p) => p.betName == cbet.name );
    
    return (
      <BetTile
        bet={cbet}
        rowClass={rowClass}
        key={index}
        pool={pool}
        onChangeAmount={changeBetAmount(index)}
        onChangeSelection={changeBetSelection(index)}
      ></BetTile>
    );
  });

  if(!betsSubmitted) {
    return (
      <div>
        <main className="bg-purple-300 h-screen grid grid-rows-1 place-content-evenly">
            <div>
              {betTiles}
            </div>
        </main>
        <PlaceBet bets={bets} onPlaceBets={placeBets} onChangeEmail={changeEmail} onChangeName={changeName}/>
      </div>
    );
  } else {
    return (
      <div>
        <main>
        </main>
      </div>
    )
  }
}

export default App;

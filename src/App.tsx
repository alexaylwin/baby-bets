import React, { useState, useEffect } from "react";
import { BetTile } from "./components/bet-tile";
import { Footer } from "./components/footer";
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
import { Start } from "./components/start";

function App() {
  const [bets, setBets] = useState<Bet[]>(allBets);
  const [betsSubmitted, setBetsSubmitted] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo>({name: '', email: ''});
  const [ticketNumber, setTicketNumber] = useState<string>('');
  const [pools, setPools] = useState<Pool[]>([]);
  const [initData, setInitData] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [currentView, setCurrrentView] = useState<any>( (<Start></Start>))

  
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
  const nextView = () => {
    const betTiles = allBets.map((cbet, index) => {
      const pool = pools.find( (p) => p.betName == cbet.name );
      
      return (
        <BetTile
          bet={cbet}
          key={index}
          pool={pool}
          onChangeAmount={changeBetAmount(index)}
          onChangeSelection={changeBetSelection(index)}
        ></BetTile>
      );
    });

    setStep(step+1);
    switch (step+1) {
      case 0:
        setCurrrentView((<Start></Start>))
         break;
      case betTiles.length + 1:
        setCurrrentView((<Ticket bets={bets} ticketNumber='alex' userInfo={ {name: 'alex', email: 'alex'}}></Ticket>));
          break;
      default:
        console.log(step);
        console.log(betTiles)
        setCurrrentView(betTiles[step]);
    }
   };

  
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
  
  return (
    <div className="bg-purple-400 h-screen">
      <Header></Header>
      <main className="flex flex-cols place-content-evenly w-full">
        {currentView}
      </main>
      <Footer bets={bets} onNextClick={nextView}/>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Col, Container, Row } from "react-bootstrap";
import { BetTile } from "./components/bet-tile";
import { allBets } from "./data/bets";
import { PlaceBet } from "./components/place-bet";
import { Bet } from "./models/bet";
import Ticket from "./components/ticket";
import * as BetsAPI from "./services/bets-api";
import { UserInfo } from "./models/user";
import { generateTicketNumber } from "./utils/ticket-num";

function App() {
  const [bets, setBets] = useState<Bet[]>(allBets);
  const [betsSubmitted, setBetsSubmitted] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo>({name: '', email: ''});
  const [ticketNumber, setTicketNumber] = useState<string>('');

  const changeAmount = (index: number) => (newAmount: number) => {
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
    setBetsSubmitted(true);
    
  }

  const betTiles = allBets.map((cbet, index) => {
    const rowClass = index % 2 == 0 ? "bet-row--light" : "bet-row--dark";
    return (
      <BetTile
        bet={cbet}
        rowClass={rowClass}
        key={index}
        onChangeAmount={changeAmount(index)}
        onChangeSelection={changeBetSelection(index)}
      ></BetTile>
    );
  });

  if(!betsSubmitted) {
    return (
      <div>
        <main>
          <Container fluid>
            <Row className="border-bottom border-3">
              <Col>
                <h1>Baby Bets</h1>
              </Col>
            </Row>
            {betTiles}
          </Container>
        </main>
        <PlaceBet bets={bets} onPlaceBets={placeBets} onChangeEmail={changeEmail} onChangeName={changeName}/>
      </div>
    );
  } else {
    return (
      <div>
        <main>
          <Container fluid className="vh-100">
            <Ticket bets={bets} ticketNumber={ticketNumber} userInfo={ {name: 'Alex Aylwin', email: 'alex.aylwin@gmail.com'}} />
          </Container>
        </main>
      </div>
    )
  }
}

export default App;

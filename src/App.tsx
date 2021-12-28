import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Col, Container, Row } from "react-bootstrap";
import { BetTile } from "./components/bet-tile";
import { allBets } from "./data/bets";
import { PlaceBet } from "./components/place-bet";
import { Bet } from "./models/bet";
import Ticket from "./components/ticket";

function App() {
  const [bets, setBets] = useState<Bet[]>(allBets);
  const [betsSubmitted, setBetsSubmitted] = useState<boolean>(false);

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

  
  /**
   * Calculate ticket code
   */
  const placeBets = () => {
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
        <PlaceBet bets={bets} onPlaceBets={placeBets}/>
      </div>
    );
  } else {
    return (
      <div>
        <main>
          <Container fluid className="vh-100">
            <Ticket bets={bets} ticketNumber="A23-S3D" userInfo={ {name: 'Alex Aylwin', email: 'alex.aylwin@gmail.com'}} />
          </Container>
        </main>
      </div>
    )
  }
}

export default App;

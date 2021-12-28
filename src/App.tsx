import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { BetTile } from './components/bet-tile';
import { allBets } from './data/bets';
import { PlaceBet } from './components/place-bet';
import { Bet } from './models/bet';

function App() {

  const [bets, setBets] = useState<Bet[]>(allBets);

  const changeAmount = (index:number) => (newAmount: number) => {
    const newbets = [...bets];
    //@ts-ignore
    newbets[index].amount = newAmount;
    setBets(newbets)
  }

  const betTiles = allBets.map( (cbet, index) => { 
    const rowClass = index % 2 == 0 ? 'bet-row--light' : 'bet-row--dark';
    return <BetTile bet={cbet} rowClass={rowClass} key={index} onChangeAmount={changeAmount(index)}></BetTile>
  });

  return (
    <div>
      <main>
        <Container fluid>
          <Row className="border-bottom border-3">
            <Col><h1>Baby Bets</h1></Col>
          </Row>
          {betTiles}
        </Container>
      </main>
      <PlaceBet bets={bets}/>
    </div>
  );
}

export default App;

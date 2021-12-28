import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { BetTile } from './components/bet-tile';
import { allBets } from './data/bets';
import { PlaceBet } from './components/place-bet';

function App() {

  const [amounts, setAmounts] = useState(new Array());

  const changeAmount = (index:number) => (newAmount: number) => {
    const newAmounts = [...amounts];
    //@ts-ignore
    newAmounts[index] = newAmount;
    setAmounts(newAmounts)
  }

  const bets = allBets.map( (cbet, index) => { 
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
          {bets}
        </Container>
      </main>
      <PlaceBet amounts={amounts}/>
    </div>
  );
}

export default App;

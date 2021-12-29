
import { useState } from 'react';
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { Bet } from "../models/bet";
import { Pool } from "../models/pool";

export const BetTile = (props: {
  bet: Bet;
  rowClass: string;
  onChangeAmount: (newAmount: number) => void;
  onChangeSelection: (newSelection: string) => void;
  pool: Pool | undefined;
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options = [{ name: "", label: "" }, ...props.bet.options];

  const betOptions = options.map((opt, index) => (
    <option key={index} value={opt.label}>
      {opt.label}
    </option>
  ));

  const calcEstimatedPayout = (
    betAmount: number,
    betOption: string
  ): number => {
    //Calc payout
    if(props.pool == undefined) return 0;

    let betsForOption = props.pool?.betsPerOption.find( (bo) => bo.option == betOption)?.bets;
    betsForOption = betsForOption == undefined ? (betAmount / 2) : (betsForOption + (betAmount / 2))
    console.log(betsForOption);
    const payoutPerShare = (props.pool?.totalPool + betAmount) / betsForOption;
    console.log(payoutPerShare);
    return +(payoutPerShare * (betAmount / 2)).toFixed(2);
  };

  return (
    <Row className={props.rowClass + " py-2"}>
      <Row>
        <Col>{props.bet.displayName}</Col>
        <Col>
          <Form.Select
            onChange={(e) => { props.onChangeSelection(e.target.value); setSelectedOption(e.target.value) }}
          >
            {betOptions}
          </Form.Select>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="0"
              onChange={(e) =>
                { props.onChangeAmount(Number.parseInt(e.target.value)); setSelectedAmount(parseInt(e.target.value)) }
              }
            ></Form.Control>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>{props.bet.description}</Col>
        <Col>
          Odds: {props.bet.odds} <br />
          Pool: ${props.pool?.totalPool}{" "}
        </Col>
        <Col>
          <span className="text-small">
            Increments of ${props.bet.increment}
          </span>
          <br />
          Est. payout: ${calcEstimatedPayout(selectedAmount, selectedOption)}
        </Col>
      </Row>
    </Row>
  );
};

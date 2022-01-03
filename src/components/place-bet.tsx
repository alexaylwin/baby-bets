import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { Bet } from "../models/bet";
import { UserInfo } from "../models/user";

export const PlaceBet = (props: {
  bets: Bet[];
  onPlaceBets: () => void;
  onChangeName: (name: string) => void;
  onChangeEmail: (email: string) => void;
}) => {
  const calcTotal = (amounts: number[]): number => {
    return amounts.reduce((p, c) => {
      if(isNaN(c)) c = 0;
      return p + c
    }, 0);
  };

  return (
    <footer className="footer mt-auto py-2 fixed-bottom border-top border-2">
      <Container>
        <Row>
          <Col>
            <span>
              <b>Total: ${calcTotal(props.bets.map((b) => b.amount))}</b>
            </span>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <FormControl
              id="name"
              placeholder="Enter your name"
              size="sm"
              onChange={(e) => props.onChangeName(e.target.value)}
            ></FormControl>
            <Form.Control
              type="email"
              id="email"
              placeholder="Enter your email"
              size="sm"
              onChange={(e) => props.onChangeEmail(e.target.value)}
            ></Form.Control>
          </Col>
          <Col className="text-center">
            <Button
              variant="success"
              size="lg"
              className=""
              onClick={props.onPlaceBets}
            >
              Place Bets
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

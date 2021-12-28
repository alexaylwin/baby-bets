import { useState } from "react";
import { Button, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { Bet } from "../models/bet";

export const PlaceBet = (props: {bets: Bet[]}) => {

    const calcTotal = (amounts: number[] ): number => { console.log(amounts); return amounts.reduce( (p, c) => p + c, 0)}

    return (
        <footer className="footer mt-auto py-2 fixed-bottom border-top border-2">
        <Container>
            <Row>
                <Col>
                    Total: ${ calcTotal(props.bets.map( (b) => b.amount)) }
                </Col>
            </Row>
            <Row className="py-3">
                <Col>
                    <FormControl id="name" placeholder="Name" size="sm"></FormControl> 
                    <Form.Control type="email" id="email" placeholder="Email" size="sm"></Form.Control>
                </Col>
                <Col className="text-center">
                    <Button variant="success" size="lg" className="">Place Bets</Button>
                </Col>
            </Row>
        </Container>
        </footer>
    );
};

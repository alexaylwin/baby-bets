import { useState } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { Bet } from "../models/bet";

export const BetTile = ( props: {bet: Bet, rowClass: string, onChangeAmount: (newAmount: number) => void} ) => {

    const betOptions = props.bet.options.map( (opt, index) => <option key={index} value={opt.name}>{opt.label}</option> );
    
    return (
        <Row className={props.rowClass + ' py-2'}>
            <Row>
                <Col>{props.bet.displayName}</Col>
                <Col>
                    <Form.Select>
                        {betOptions}
                    </Form.Select>    
                </Col>
                <Col>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type="number" placeholder="0" onChange={(e) => props.onChangeAmount(Number.parseInt(e.target.value))}></Form.Control>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>{props.bet.description}</Col>
                <Col>Odds: {props.bet.odds} <br />
                    Pool: ${props.bet.pool} </Col>
                <Col>
                    <span className="text-small">Increments of ${props.bet.increment}</span><br />
                    Est. payout: $0
                </Col>
            </Row>
        </Row>
    )
}
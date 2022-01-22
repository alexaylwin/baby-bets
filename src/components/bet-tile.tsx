import { useState } from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import { Bet } from "../models/bet";
import { Pool } from "../models/pool";
import { calcEstimatedPayout } from "../utils/bets";
import { BetRatio } from "./bet-ratio";

export const BetTile = (props: {
  bet: Bet;
  rowClass: string;
  onChangeAmount: (newAmount: number) => void;
  onChangeSelection: (newSelection: string) => void;
  pool: Pool | undefined;
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [formErrors, setFormErrors] = useState({});
  const [oddsVisible, setOddsVisible] = useState<boolean>(false);

  const options = [...props.bet.options];

  const betOptions = options.map((opt, index) => (
    <button
      className={`py-2 
        px-4 
        rounded 
        m-3 
        font-bold 
        uppercase
        shadow-md
        max-w-sm
        text-white ` +
        (index == selectedOption ? 'bg-purple-900' : 'bg-purple-500 hover:bg-purple-700')}
      key={index}
      onClick={() => {
        setSelectedOption(index);
      }}
    >
      {opt.label}
    </button>
  ));

  return (
    <div className="grid place-items-center px-4">
      <div className="font-bold text-white py-6">{props.bet.description}</div>
      <div className="grid grid-cols-2 w-full">{betOptions}</div>
      <div className="grid grid-cols-2 place-items-center w-full mt-10 ">
        <input 
          type="number"
          className="form-control 
          w-40
          px-3 py-1.5 
          text-base 
          rounded
          border border-solid border-gray-500
          m-0
          transition
          ease-in-out
          bg-clip-padding
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Amount"></input>
        <span className="w-40 mp-10
        border border-solid border-white rounded px-3 py-1.5 text-white font-bold">
          Est. Payout: $25
        </span>
      </div>
      <div>{ options[selectedOption]?.label }</div>
    </div>
  );

  // return (
  //   <Row className={props.rowClass + " py-2"}>
  //     <Row>
  //       <Col>{props.bet.displayName}</Col>
  //       <Col>
  //         <Form.Select
  //           onChange={(e) => {
  //             props.onChangeSelection(e.target.value);
  //             setSelectedOption(e.target.value);
  //           }}
  //         >
  //           {betOptions}
  //         </Form.Select>
  //       </Col>
  //       <Col>
  //         <InputGroup>
  //           <InputGroup.Text>$</InputGroup.Text>
  //           <Form.Control
  //             type="number"
  //             step="2"
  //             max="100"
  //             min="0"
  //             placeholder="0"
  //             onChange={(e) => {
  //               props.onChangeAmount(Number.parseInt(e.target.value));
  //               setSelectedAmount(parseInt(e.target.value));
  //             }}
  //           ></Form.Control>
  //         </InputGroup>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col>{props.bet.description}</Col>
  //       <Col>
  //         <p>
  //           Total Pool: ${props.pool?.totalPool}{" "}
  //         </p>
  //         <OverlayTrigger
  //           trigger="click"
  //           placement="right"
  //           overlay={BetRatio({ bet: props.bet, pool: props.pool })}
  //         >
  //           <Button variant={ (() => oddsVisible ? "outline-danger": "outline-secondary")()} size="sm" onClick={() => setOddsVisible(!oddsVisible)}>
  //             {(() => oddsVisible ? "Close Info": "Odds Info")()}
  //           </Button>
  //         </OverlayTrigger> <br />
  //       </Col>
  //       <Col>
  //         <span className="text-small">
  //           Increments of ${props.bet.increment}
  //         </span>
  //         <br />
  //         Est. payout: $
  //         {calcEstimatedPayout(selectedAmount, selectedOption, props.pool)}
  //       </Col>
  //     </Row>
  //   </Row>
  // );
};

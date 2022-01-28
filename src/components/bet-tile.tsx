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
    <div className="flex flex-col">
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
      <span className="text-xs display-block max-w-sm content-center text-center">Current bets: 34%</span>
    </div>
  ));

  return (
    <div className="grid place-items-center px-4">
      <div className="font-bold text-white py-6 text-2xl">{props.bet.description}</div>
      <div className="grid grid-cols-2 w-full">{betOptions}</div>

      <div className="grid grid-cols-2 place-items-center w-full mt-10 ">
        <div className=" rounded">
          <label htmlFor="amount" className="inline leading-normal
          px-2 py-2 0 bg-gray-700 
          border border-solid border-gray-500 border-r-0 
          rounded rounded-r-none 
          font-bold text-white">$</label>
          <input 
            id="amount"
            type="number"
            className="form-control 
            w-20 h-10
            px-3 py-1.5 
            text-base 
            border border-solid border-gray-500 border-l-0
            rounded rounded-l-none 
            m-0
            transition
            ease-in-out
            bg-clip-padding
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Amount"
            onChange={(e) => {
                            props.onChangeAmount(Number.parseInt(e.target.value));
                            setSelectedAmount(parseInt(e.target.value));
                          }}></input>
        </div>
        <span className="w-40 mp-10
        border border-solid border-white rounded px-3 py-1.5 text-white font-bold">
          Est. Payout: {calcEstimatedPayout(selectedAmount,  options[selectedOption]?.name, props.pool)}
        </span>
      </div>
    </div>
  );
};

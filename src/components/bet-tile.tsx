import { useState } from "react";
import { Bet } from "../models/bet";
import { Pool } from "../models/pool";
import { calcEstimatedPayout } from "../utils/bets";

export const BetTile = (props: {
  bet: Bet;
  rowClass: string;
  onChangeAmount: (newAmount: number) => void;
  onChangeSelection: (newSelection: string) => void;
  pool: Pool | undefined;
}) => {
  const {
    pool, bet, rowClass, onChangeAmount, onChangeSelection
  } = props;

  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [formErrors, setFormErrors] = useState({});
  const [oddsVisible, setOddsVisible] = useState<boolean>(false);

  const options = [...bet.options];

  const betPercentages = pool?.betsPerOption.map( (bo, index) => 
  {
    return {opt: bo.option, percent: ((bo.amount / pool.totalPool) * 100).toFixed(2)}
  });

  const betOptions = options.map((opt, index) => (
    <div className="flex flex-col">
      <button
        className={
          `py-2 
          px-4 
          rounded 
          m-3 
          font-bold 
          uppercase
          shadow-md
          max-w-sm
          text-white ` +
          (index == selectedOption
            ? "bg-purple-900"
            : "bg-purple-500 hover:bg-purple-700")
        }
        key={index}
        onClick={() => {
          setSelectedOption(index);
        }}
      >
        {opt.label}
      </button>
      <span className="text-xs display-block max-w-sm content-center text-center">
        Current bets: { betPercentages?.find( (v) => v.opt === opt.name)?.percent }%
      </span>
    </div>
  ));

  return (
    <div className="grid place-items-center px-4">
      <div className="font-bold text-white py-6 text-2xl">
        {bet.description}
      </div>
      <div className="grid grid-cols-2 w-full">{betOptions}</div>

      <div className="grid grid-cols-2 place-items-center w-full mt-10 ">
        <div className="flex flex-wrap items-stretch w-28 relative">
          <div className="flex -mr-px">
            <span className="font-bold text-white bg-gray-700 -tracking-normal flex items-center leading-normal rounded rounded-r-none border border-r-0 border-gray-500 px-3 whitespace-no-wrap text-sm">
              $
            </span>
          </div>
          <input
            type="number"
            className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-gray-500 rounded rounded-l-none px-3 relative focus:border-blue focus:shadow"
            placeholder="Amount"
            onChange={(e) => {
              onChangeAmount(Number.parseInt(e.target.value));
              setSelectedAmount(parseInt(e.target.value));
            }}
          ></input>
        </div>
        <span
          className="w-42 mp-10
        border border-solid border-white rounded 
        px-3 py-1.5 text-white font-bold"
        >
          Est. Payout: $
          {calcEstimatedPayout(
            selectedAmount,
            options[selectedOption]?.name,
            pool
          )}
        </span>
      </div>
    </div>
  );
};

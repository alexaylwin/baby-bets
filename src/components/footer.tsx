import { useState } from "react";
import { Bet } from "../models/bet";
import { UserInfo } from "../models/user";

export const Footer = (props: {
  bets: Bet[],
  onNextClick: () => void,
  step: number
}) => {
  const {bets, onNextClick, step} = props;
  const calcTotal = (amounts: number[]): number => {
    return amounts.reduce((p, c) => {
      if (isNaN(c)) c = 0;
      return p + c;
    }, 0);
  };

  return (
    <footer className="
      border-t-2 border-white 
      fixed inset-x-0 bottom-0 
      leading-10
      flex flex-auto max-w-2xl">
      <div className="flex flex-col place-content-center px-4 py-8 w-56">
        <span className="text-2xl text-white pb-3">
          Total Bet: <span className="font-bold">${calcTotal(bets.map((b) => b.amount))}</span>
        </span>
        <hr />
        <span className="text-white">
          Total est. payout: <span className="font-bold">$37.12</span>
        </span>
      </div>
      <div className="grow flex flex-col place-content-center">
        <button
          className="py-2 
          px-4 
          rounded 
          m-3 
          font-bold 
          uppercase
          shadow-md
          max-w-sm
          text-white bg-purple-600 hover:bg-purple-700"
          onClick={ () => { onNextClick();} }
        >
          Next Bet ({step+1}/6)
        </button>
      </div>
    </footer>
  );
};

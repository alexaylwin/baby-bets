import { useState } from "react";
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
      if (isNaN(c)) c = 0;
      return p + c;
    }, 0);
  };

  return (
    <footer className="
      border-t-2 border-black 
      fixed inset-x-0 bottom-0 
      leading-10
      grid grid-cols-2 w-full content-center">
      <div className="flex flex-col place-content-center px-4 py-8">
        <span className="font-bold text-2xl">
          Total: ${calcTotal(props.bets.map((b) => b.amount))}
        </span>
      </div>
      <div className="flex flex-col place-content-center">
        <button
          className="py-2 
          px-4 
          rounded 
          m-3 
          font-bold 
          uppercase
          shadow-md
          max-w-sm
          text-white bg-purple-500 hover:bg-purple-700"
        >
          Next Bet
        </button>
      </div>
    </footer>
  );
};

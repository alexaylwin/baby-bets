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
      if(isNaN(c)) c = 0;
      return p + c
    }, 0);
  };

  return (
    <footer className="border-t-2 border-black">
      <div>
        <span>
          <b>Total: ${calcTotal(props.bets.map((b) => b.amount))}</b>
        </span>
      </div>
    </footer>
  );
};

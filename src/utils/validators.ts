import { Bet } from "../models/bet";

export const filterEmptyBets = (bets: Bet[]): Bet[] => bets.filter(
  (b) => b.amount > 0 && b.selectedBet != undefined && b.selectedBet != ''
)
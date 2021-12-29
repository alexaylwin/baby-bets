import { Pool } from "../models/pool";

export const calcEstimatedPayout = (
  betAmount: number,
  betOption: string,
  pool: Pool | undefined
): number => {
  //Calc payout
  if (pool == undefined) return 0;
  if (betOption == undefined || betOption == '') return 0;

  let betsForOption = pool?.betsPerOption.find(
    (bo) => bo.option == betOption
  )?.bets;
  betsForOption =
    betsForOption == undefined ? betAmount / 2 : betsForOption + betAmount / 2;
  const payoutPerShare = (pool?.totalPool + betAmount) / betsForOption;
  return +(payoutPerShare * (betAmount / 2)).toFixed(2);
};

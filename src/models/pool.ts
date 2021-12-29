export type Pool = {
  poolid: string,
  betName: string,
  totalPool: number,
  betsPerOption: PoolBetOption[]
}

export type PoolBetOption = {
  option: string,
  bets: number
  amount: number;
}
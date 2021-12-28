export type Bet = {
    name: string,
    displayName: string,
    increment: number,
    odds: string,
    pool: number,
    description: string,
    options: BetOption[],
    selectedBet?: string,
    amount: number
}

export type BetOption = {
    name: string,
    label: string
}
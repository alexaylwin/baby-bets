export type Bet = {
    name: string,
    displayName: string,
    increment: number,
    odds: string,
    pool: number,
    description: string,
    options: BetOption[]
}

export type BetOption = {
    name: string,
    label: string
}
import { Modal, Popover } from "react-bootstrap"
import { Bet } from "../models/bet"
import { Pool } from "../models/pool"

export const BetRatio = (props: {bet: Bet, pool: Pool | undefined}) => {
  return (
    <Popover>
      <Popover.Header as="h3">Odds for {props.bet.displayName} </Popover.Header>
      <Popover.Body>
        <p>Odds are {props.bet.odds}</p>
        <strong>Current bets: </strong>
          <ul>
            <li> Boy: 37% </li>
            <li> Girl: 63% </li>
          </ul>
      </Popover.Body>
    </Popover>
  )
}
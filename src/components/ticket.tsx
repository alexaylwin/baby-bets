import { Col, Row, Table } from "react-bootstrap";
import { Bet } from "../models/bet";

const Ticket = (props: {
  bets: Bet[];
  ticketNumber: string;
  userInfo: { name: string; email: string };
}) => {
  const betDetails = props.bets.map((bet: Bet, index: number) => {
    if (bet.amount > 0 && bet.selectedBet != undefined && bet.selectedBet != '') {
      return (
        <tr className="bet-row" key={index}>
          <td> {index + 1} </td>
          <td>
            {bet.displayName} - {bet.selectedBet}
          </td>
          <td> ${bet.amount}</td>
          <td> ${bet.pool} </td>
        </tr>
      );
    }
  });

  const betTotal = props.bets.map((b) => b.amount).reduce((p, c) => p + c, 0);

  const today = new Date();
  const formattedDate = `
    ${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}@${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  return (
    <Row className="h-100">
      <Col className="ticket d-flex align-items-center justify-content-center">
        <div className="border border-3 p-5">
          <h2>Your bets have been recorded!</h2>
          <h2>Your ticket number is: </h2>
          <h2>
            {props.ticketNumber} - {props.userInfo.name} - {formattedDate}
          </h2>
          <p className="lead py-2">
            To validate your bet, etransfer the total bet amount of ${betTotal}{" "}
            to Ash at ash.aylwin@gmail.com
          </p>
          <h3>Placed Bets:</h3>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Bet</th>
                <th>Amount</th>
                <th>Est. Payout*</th>
              </tr>
            </thead>
            <tbody>{betDetails}</tbody>
          </Table>
          * Payouts may change as more bets are placed.
          <p className="lead py-2 visually-hidden">
            To change your bet, enter your ticket number and name on the home
            screen.
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Ticket;

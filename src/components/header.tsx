import { useState } from "react";
import {
  Button,
  Col,
  Modal,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";

export const Header = () => {
  const [faqShow, setFaqShow] = useState(false);
  const [tipsShow, setTipsShow] = useState(false)

  return (
    <Row className="border-bottom border-3 pb-2">
      <Col>
        <h1>Baby Bets</h1>
      </Col>

      <Col className="d-flex justify-content-end">
        <Button className="me-2" onClick={() => setFaqShow(true)}>About</Button>
        <Faq show={faqShow} onHide={() => setFaqShow(false)}></Faq>

        <Button onClick={() => setTipsShow(true)}>Bet Tips</Button>
        <Tips show={tipsShow} onHide={() => setTipsShow(false)}></Tips>
      </Col>
    </Row>
  );
};

const Faq = (props: any) => {
  return (
    <Modal size="lg" centered {...props}>
      <Modal.Header>
        <Modal.Title>FAQ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Where does the money go?</strong> <br />
          100% of the money is paid out to winners - none is kept!
        </p>
        <p>
          <strong>Is this a fundraiser?</strong>
          <br />
          No! Just fun!
        </p>
        <p>
          <strong>How are payouts calculated?</strong>
          <br />
          The payout for a winning bet is calculated by dividing the total prize pool across all
          winning bets. Bets amounts are split into $2 increments.
          <br />
          <br />
          <strong>Example:</strong>
          <br />
          John has placed a <i>$10 bet on "Boy"</i>, James has placed a <i>$6 bet on "Boy"</i>, and Rachel 
          has placed a <i>$10 bet on "Girl"</i>. The values are then calculated as follows: 
          <ul>
          <li>Total prize pool for 'Gender': $10 + $6 + $10 = $26 </li>
          <li>John has 5 shares ($10/2) on "Boy", James has 3 shares on "Boy", and Rachel has 5 shares on "Girl"</li>
          <li>If "Boy" wins
            <ul>
              <li>John's payout is:  $26 (total prize pool) / 8 (winning bets) * 5 (John's shares) = <strong>$16.25</strong></li>
              <li>James's payout is:  $26 (total prize pool) / 8 (winning bets) * 3 (John's shares) = <strong>$7</strong></li>
              <li>Rachels's payout is <strong>$0</strong></li>
            </ul>
          </li>
          <li>If "Girl" wins
            <ul>
              <li>John's payout is <strong>$0</strong></li>
              <li>James's payout is <strong>$0</strong></li>
              <li>Rachels's payout is: $26 (total prize pool) / 5 (winning bets) * 5 (Rachel's shares) = <strong>$26</strong></li>
            </ul>
          </li>          
          </ul>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const Tips = (props: any) => {
  return (
    <Modal size="lg" centered {...props}>
      <Modal.Header>
        <Modal.Title>Oddsmaker's Tips</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To keep things fair, here's what we can tell you: </p>
        <p>Allison was born on her due date (40 weeks), 7lb 15oz at 11:36am.</p>

        <p>Baby is expected to be delivered after 39 weeks via c-section.</p>

        <p>Alex doesn't like thinking about how the body works.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

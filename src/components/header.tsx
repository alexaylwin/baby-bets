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
          Your payout is calculated by dividing up the total pool for your bet
          across all winners
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

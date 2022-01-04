import { Col, Modal, Popover, Row } from "react-bootstrap"
import { Bet } from "../models/bet"
import { Pool } from "../models/pool"

export const BetRatio = (props: {bet: Bet, pool: Pool | undefined}) => {
  const colors = ["#A5D3CA","#FF8E8E","#67C7E2","#E994AB","#9191FF","#FF2DFF","#CAFFD8",]
  const {
    pool,
    bet
  } = props;

  const betData = pool?.betsPerOption.map( (bo, index) => { 
    const percent = (bo.amount / pool.totalPool) * 100;
    const opt = bo.option;
    const color = colors[index];
    return {percent, opt, color}
  })
  console.log(betData);
  return (
    <Popover className="odds-popover">
      <Popover.Header as="h3">Odds for {props.bet.displayName} </Popover.Header>
      <Popover.Body>
        <Row className="h-100">
          <Col>
          <strong>Odds are</strong><p> {props.bet.odds}</p>
          <strong>Current bets -&gt;</strong>
          </Col>
          <Col>
            <Bar data={betData}></Bar>
          </Col>
        </Row>
      </Popover.Body>
    </Popover>
  )
}


//@ts-ignore
const Bar = ({ data }) => {
  if(data === undefined) return null;
  //@ts-ignore
  const dataElements = data.map((d: any) => {
    if(d.percent === 0) return null;
    return (
        <div className="BarData text-center" style={{ background: `${d.color}`, height: `${d.percent}%` }}>
            <p className="PercentText text-small">{d.opt}</p>
        </div>
    )});

  return (
      <div className="BarChart">
          {dataElements}
      </div>
  );
};


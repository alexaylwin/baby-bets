import axios from 'axios';
import { Bet } from '../models/bet';
import { UserInfo } from '../models/user';
import { filterEmptyBets } from '../utils/validators';

export const placeBets = async (bets: Bet[], user: UserInfo, ticketNum: string): Promise<boolean> => {
  //return true;
  const io = axios.create(
    {
      baseURL: 'https://t6hendx94f.execute-api.us-east-2.amazonaws.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  bets = filterEmptyBets(bets);
  const resp = await io.put('/bets', {bets, user, ticketNum})
  console.log(resp);
  return resp.status === 200
}


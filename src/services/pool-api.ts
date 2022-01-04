import axios from 'axios';
import { Bet } from '../models/bet';
import { Pool } from '../models/pool';
import { UserInfo } from '../models/user';
import { filterEmptyBets } from '../utils/validators';

const mockResponse = [
  {
      "totalPool": 600,
      "poolid": "Gender",
      "betsPerOption": [
          {
              "bets": 100,
              "amount": 200,
              "option": "Boy"
          },
          {
              "bets": 200,
              "amount": 400,
              "option": "Girl"
          }
      ],
      "betName": "Gender"
  }
]

export const getPools = async (): Promise<Pool[]> => {
  //return new Promise( (v) => v(mockResponse) );
  const io = axios.create(
    {
      baseURL: 'https://t6hendx94f.execute-api.us-east-2.amazonaws.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  const resp = await io.get('/pools');
  return resp.data;
}

import axios from 'axios';
import {host} from '../config/config';

const post: (action: string, data: object) => Promise<object> =  (action, data) => axios.post(`${host}${action}`, data);
const get: (action: string, data: object) => Promise<object> = (action, data) => axios.post(`${host}${action}`, data);


export const loginRequest = async (data: object) : Promise<object> => {
  let response = await post('login', {});
  console.log(response);
  return response;
};
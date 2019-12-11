import axios from 'axios';
import {host} from '../config/config';

interface RequestData {
  action: string,
  [dataName: string]: any
}

interface ResponseObject {
  data: object[],
  [dataName: string]: any
}
const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },

};

const call: (type: string, data: RequestData, secure: boolean) => Promise<ResponseObject> = async (type, data, secure) : Promise<ResponseObject> => {
  const call = type === 'post' ? axios.post : axios.get;
  if(secure) {
    let {data: status} = await axios.post(host,{
      action: 'checkAccess'
    }, config);
    if(status.status) {
      return call(host, {
        ...data
      }, config);
    } else {
      return status;
    }
  } else {
    return call(host, {
      ...data
    }, config);
  }
};

export const sendData: (requestData: RequestData, secure?: boolean) => Promise<object> = async (requestData: RequestData, secure = true) : Promise<object> => {
  console.log('asdasd');
  let {data: response}: ResponseObject = await call('post', requestData, secure);
  console.log(response);
  return response;
};

export const getData: (requestData: RequestData, secure?: boolean) => Promise<object> = async (requestData: RequestData, secure = true) : Promise<object> => {
  let {data: response}: ResponseObject = await call('get', requestData, secure);
  console.log(response);
  return response;
};
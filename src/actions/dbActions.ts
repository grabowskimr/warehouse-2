import axios from 'axios';
import { host } from '../config/config';
import { getCookieValueByRegEx } from '../utils/session';

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },

};

export const checkAccess = async () => {
    let cookie: any = getCookieValueByRegEx('login');
    let secure = await axios.post(host, {
        action: 'checkAccess',
        sessionId: cookie.session_id,
        id: cookie.id
    }, config);

    return secure.data;
};

const call: (type: string, data: RequestData, secure: boolean) => Promise<ResponseObject> = async (type, data, secure): Promise<ResponseObject> => {
    const call = type === 'post' ? axios.post : axios.get;
    if (secure) {
        let secureInfo = await checkAccess();
        if (secureInfo.status) {
            return call(host, {
                ...data
            }, config);
        } else {
            return secureInfo;
        }
    } else {
        return call(host, {
            ...data
        }, config);
    }
};

export const sendData: (requestData: RequestData, secure?: boolean) => Promise<ReturnedData> = async (requestData: RequestData, secure = true): Promise<ReturnedData> => {
    let {data: response}: ResponseObject = await call('post', requestData, secure);
    return response;
};

export const getData: (requestData: RequestData, secure?: boolean) => Promise<ReturnedData> = async (requestData: RequestData, secure = true): Promise<ReturnedData> => {
    let {data: response}: ResponseObject = await call('get', requestData, secure);
    return response;
};
import axios from 'axios';
import { api, upload } from '../config/config';
import { getCookieValueByRegEx } from '../utils/session';

const config = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json'
	}
};

export const checkAccess = async (isAdmin?: boolean) => {
	let cookie: any = getCookieValueByRegEx('login');
	let secure = await axios.post(
		api,
		{
			action: 'checkAccess',
			sessionId: cookie.session_id,
			id: cookie.id,
			isAdmin: isAdmin ? true : false
		},
		config
	);

	return secure.data;
};

const call: (type: string, data: RequestData, secure: boolean) => Promise<ResponseObject> = async (type, data, secure): Promise<ResponseObject> => {
	const call = type === 'post' ? axios.post : axios.get;
	if (secure) {
		let secureInfo = await checkAccess();
		if (secureInfo.status) {
			if (type === 'post') {
				return call(
					api,
					{
						...data
					},
					config
				);
			} else {
				return call(
					api,
					{
						params: {
							...data
						}
					},
					config
				);
			}
		} else {
			return secureInfo;
		}
	} else {
		return call(
			api,
			{
				...data
			},
			config
		);
	}
};

const uploadFile = async (file: File) => {
	const formData = new FormData();
	formData.append('image', file);
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	};

	const { data } = await axios.post(upload, formData, config);
	return data;
};

export const sendData: (requestData: RequestData, secure?: boolean) => Promise<ReturnedData> = async (requestData: RequestData, secure = true): Promise<ReturnedData> => {
	if (requestData.file) {
		let { path, status } = await uploadFile(requestData.file);
		if (status) {
			requestData.picture = path;
		}
	}
	let { data: response }: ResponseObject = await call('post', requestData, secure);
	return response;
};

export const getData: (requestData: RequestData, secure?: boolean) => Promise<ReturnedData> = async (requestData: RequestData, secure = true): Promise<ReturnedData> => {
	let { data: response }: ResponseObject = await call('get', requestData, secure);
	response.data = response.data.map((data: { [dataName: string]: any }) => {
		Object.keys(data).forEach((key: string) => {
			if (!!Number(data[key])) {
				data[key] = parseInt(data[key]);
			}
		});
		return data;
	});
	return response;
};

export const makeId = (length: number): string => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	result += new Date().getTime();
	return result;
};

export const getCookieValueByRegEx = (cookieName: string): object => {
	let value: RegExpMatchArray | null = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
	let cookie: string = value ? value[value.length - 1] : '{}';
	return cookie ? JSON.parse(unescape(cookie)) : null;
};

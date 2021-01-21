const { URL } = require("url");

interface Proxy {
	host: string;
	port: number;
	protocol: string;
	auth?: {
		username: string;
		password: string;
	};
}

function parse(string: string): Proxy[] {
	const rawArray = stringToArray(string);
	const fixedArray = rawArray.map((string) => fixProxyString(string));
	const proxyArray = fixedArray.map((string) => stringToProxy(string));
	return proxyArray;
}

function stringToArray(string: string): string[] {
	return string
		.trim()
		.replace(/[ ,\n]+/g, ",")
		.split(",");
}

//If user doesnt specify protocol we'll assume its http
function fixProxyString(string: string): string {
	return string.includes("://") ? string : `http://${string}`;
}

function stringToProxy(string: string): Proxy {
	const url = new URL(string);
	return {
		host: url.hostname,
		port: url.port ? parseInt(url.port) : 80, //URL ignores port 80 so we gotta do this
		protocol: url.protocol.slice(0, -1), //URL includes colon in protocol so we slice it out
		...(url.username && { auth: { username: url.username.replace("%40", "@"), password: url.password } }) //URL turns @ into hex for some reason so we change it back
	};
}

export = parse;

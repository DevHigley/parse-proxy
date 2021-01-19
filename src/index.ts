const { URL } = require("url");

interface Proxy {
	host: string;
	port: number;
	protocol?: string;
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

function fixProxyString(string: string): string {
	return string.includes("://") ? string : `http://${string}`;
}

function stringToProxy(string: string): Proxy {
	const url = new URL(string);
	return {
		host: url.hostname,
		port: url.port ? parseInt(url.port) : 80,
		protocol: url.protocol.slice(0, -1),
		auth: url.username ? { username: url.username, password: url.password } : undefined
	};
}

export = parse;

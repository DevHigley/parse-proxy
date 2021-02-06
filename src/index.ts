interface Proxy {
	host: string;
	port: number;
	protocol: string;
	auth?: {
		username: string;
		password: string;
	};
}

function parse(input: string): Proxy[] {
	return stringToArray(input).map(stringToProxy);
}

function stringToArray(input: string): string[] {
	if (!/[ ,\n]+/g.test(input) && input.split(/\w:\d/g).length > 2) throw new Error("Invalid delimiter");
	return input.split(/[ ,\n]+/g);
}

function stringToProxy(input: string): Proxy {
	return { ...getAddress(input), ...getProtocol(input), ...getAuth(input) };
}

function getAddress(input: string): { host: string; port: number } {
	if (input.includes("@")) input = input.substring(input.lastIndexOf("@") + 1);
	else if (input.includes("://")) input = input.split("://")[1];
	if (!input.includes(":")) throw new Error("Invalid address");
	const host = input.split(":")[0];
	const port = parseInt(input.split(":")[1]);
	if (/^\w+$/.test(host)) throw new Error("Invalid host");
	if (isNaN(port)) throw new Error("Invalid port");
	return { host: host, port: port };
}

function getProtocol(input: string): { protocol: string } {
	if (!input.includes("://")) return { protocol: "http" };
	const protocol = input.split("://")[0];
	if (protocol.length < 3 || protocol.length > 6) throw new Error("Invalid protocol");
	return { protocol };
}

function getAuth(input: string): { auth: { username: string; password: string } } | undefined {
	if (!input.includes("@")) return undefined;
	if (input.includes("://")) input = input.split("://")[1];
	input = input.substring(0, input.lastIndexOf("@"));
	if (!input.includes(":")) throw new Error("Invalid auth");
	const [username, password] = input.split(":");
	return { auth: { username, password } };
}

export = parse;

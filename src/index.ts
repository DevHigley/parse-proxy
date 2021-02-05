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
	return input.split(/[ ,\n]+/g);
}

function stringToProxy(input: string): Proxy {
	return { ...getAddress(input), ...getProtocol(input), ...getAuth(input) };
}

function getAddress(input: string): { host: string; port: number } {
	if (input.includes("@")) input = input.substring(input.lastIndexOf("@") + 1);
	else if (input.includes("://")) input = input.split("://")[1];
	const [host, port] = input.split(":");
	return { host: host, port: parseInt(port) };
}

function getProtocol(input: string): { protocol: string } {
	return input.includes("://") ? { protocol: input.split("://")[0] } : { protocol: "http" };
}

function getAuth(input: string): { auth: { username: string; password: string } } | undefined {
	if (!input.includes("@")) return undefined;
	if (input.includes("://")) input = input.split("://")[1];
	input = input.substring(0, input.lastIndexOf("@"))
	const [username, password] = input.split(":");
	return { auth: { username, password } };
}

export = parse;

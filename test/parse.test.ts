const parse = require("../src");

describe("address tests", () => {
	test("test single proxy uri", () => {
		expect(parse("1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "http" }]);
	});

	test("test single proxy uri with domain", () => {
		expect(parse("proxy.domain.com:80")).toEqual([{ host: "proxy.domain.com", port: 80, protocol: "http" }]);
	});
});

describe("protocol tests", () => {
	test("test single proxy uri with http protocol", () => {
		expect(parse("http://1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "http" }]);
	});

	test("test single proxy uri with https protocol", () => {
		expect(parse("https://1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "https" }]);
	});

	test("test single proxy uri with socks5 protocol", () => {
		expect(parse("socks5://1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "socks5" }]);
	});
});

describe("auth tests", () => {
	test("test single proxy uri with auth", () => {
		expect(parse("user:pass@1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "http", auth: { username: "user", password: "pass" } }]);
	});

	test("test single proxy uri with email auth", () => {
		expect(parse("user@email.com:pass@1.1.1.1:80")).toEqual([
			{ host: "1.1.1.1", port: 80, protocol: "http", auth: { username: "user@email.com", password: "pass" } }
		]);
	});
});

describe("combined tests", () => {
	test("test single proxy uri with domain and protocol", () => {
		expect(parse("https://proxy.domain.com:80")).toEqual([{ host: "proxy.domain.com", port: 80, protocol: "https" }]);
	});

	test("test single proxy uri with domain and auth", () => {
		expect(parse("user:pass@proxy.domain.com:80")).toEqual([
			{ host: "proxy.domain.com", port: 80, protocol: "http", auth: { username: "user", password: "pass" } }
		]);
	});

	test("test single proxy uri with domain and email auth", () => {
		expect(parse("user@email.com:pass@proxy.domain.com:80")).toEqual([
			{ host: "proxy.domain.com", port: 80, protocol: "http", auth: { username: "user@email.com", password: "pass" } }
		]);
	});

	test("test single proxy uri with domain and protocol and auth", () => {
		expect(parse("https://user:pass@proxy.domain.com:80")).toEqual([
			{ host: "proxy.domain.com", port: 80, protocol: "https", auth: { username: "user", password: "pass" } }
		]);
	});

	test("test single proxy uri with domain and protocol and email auth", () => {
		expect(parse("https://user@email.com:pass@proxy.domain.com:80")).toEqual([
			{ host: "proxy.domain.com", port: 80, protocol: "https", auth: { username: "user@email.com", password: "pass" } }
		]);
	});

	test("test single proxy uri with protocol and auth", () => {
		expect(parse("https://user:pass@1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "https", auth: { username: "user", password: "pass" } }]);
	});

	test("test single proxy uri with protocol and email auth", () => {
		expect(parse("https://user@email.com:pass@1.1.1.1:80")).toEqual([
			{ host: "1.1.1.1", port: 80, protocol: "https", auth: { username: "user@email.com", password: "pass" } }
		]);
	});
});

describe("multiline tests", () => {
	const expectedMultilineResult = [
		{ host: "1.1.1.1", port: 80, protocol: "http" },
		{ host: "2.2.2.2", port: 80, protocol: "http" },
		{ host: "3.3.3.3", port: 80, protocol: "http" }
	];

	test("test multiple proxy uri seperated by comma", () => {
		expect(parse("1.1.1.1:80,2.2.2.2:80,3.3.3.3:80")).toEqual(expectedMultilineResult);
	});

	test("test multiple proxy uri seperated by space", () => {
		expect(parse("1.1.1.1:80 2.2.2.2:80 3.3.3.3:80")).toEqual(expectedMultilineResult);
	});

	test("test multiple proxy uri seperated by new line", () => {
		expect(parse("1.1.1.1:80\n2.2.2.2:80\n3.3.3.3:80")).toEqual(expectedMultilineResult);
	});

	test("test multiple proxy uri seperated by comma and space", () => {
		expect(parse("1.1.1.1:80, 2.2.2.2:80, 3.3.3.3:80")).toEqual(expectedMultilineResult);
	});

	test("test multiple proxy uri seperated by comma and new line", () => {
		expect(parse("1.1.1.1:80,\n2.2.2.2:80,\n3.3.3.3:80")).toEqual(expectedMultilineResult);
	});

	test("test multiple proxy uri seperated by comma and space and new line", () => {
		expect(parse("1.1.1.1:80, \n2.2.2.2:80, \n3.3.3.3:80")).toEqual(expectedMultilineResult);
	});
});

describe("error tests", () => {
	test("test single proxy uri with invalid address", () => {
		expect(() => parse("invalidinput")).toThrowError(/Invalid address/);
	});

	test("test single proxy uri with invalid host", () => {
		expect(() => parse("invalidhost:80")).toThrowError(/Invalid host/);
	});

	test("test single proxy uri with invalid port", () => {
		expect(() => parse("1.1.1.1:invalidport")).toThrowError(/Invalid port/);
	});

	test("test single proxy uri with invalid protocol", () => {
		expect(() => parse("invalidprotocol://1.1.1.1:80")).toThrowError(/Invalid protocol/);
	});

	test("test single proxy uri with invalid auth", () => {
		expect(() => parse("invalidauth@1.1.1.1:80")).toThrowError(/Invalid auth/);
	});

	test("test multiple proxy uri with invalid address", () => {
		expect(() => parse("1.1.1.1:80,invalidaddress,3.3.3.3:80")).toThrowError(/Invalid address/);
	});

	test("test multiple proxy uri with invalid host", () => {
		expect(() => parse("1.1.1.1:80,invalidhost:80,3.3.3.3:80")).toThrowError(/Invalid host/);
	});

	test("test multiple proxy uri with invalid port", () => {
		expect(() => parse("1.1.1.1:80,2.2.2.2:invalidport,3.3.3.3:80")).toThrowError(/Invalid port/);
	});

	test("test multiple proxy uri with invalid auth", () => {
		expect(() => parse("1.1.1.1:80,invalidauth@2.2.2.2:80,3.3.3.3:80")).toThrowError(/Invalid auth/);
	});

	test("test multiple proxy uri with invalid protocol", () => {
		expect(() => parse("1.1.1.1:80,invalidprotocol://2.2.2.2:80,3.3.3.3:80")).toThrowError(/Invalid protocol/);
	});

	test("test multiple proxy uri with invalid delimiter", () => {
		expect(() => parse("1.1.1.1:802.2.2.2:803.3.3.3:80")).toThrowError(/Invalid delimiter/);
	});
});

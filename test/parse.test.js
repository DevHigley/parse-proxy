const parse = require("../dist/index");

test("test single proxy uri", () => {
	expect(parse("1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "http" }]);
});

test("test single proxy uri with protocol", () => {
	expect(parse("https://1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "https" }]);
});

test("test single proxy uri with auth", () => {
	expect(parse("user:pass@1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "http", auth: { username: "user", password: "pass" } }]);
});

test("test single proxy uri with protocol and auth", () => {
	expect(parse("https://user:pass@1.1.1.1:80")).toEqual([{ host: "1.1.1.1", port: 80, protocol: "https", auth: { username: "user", password: "pass" } }]);
});

test("test multiple proxy uri seperated by comma", () => {
	expect(parse("1.1.1.1:80,2.2.2.2:80,3.3.3.3:80")).toEqual([
		{ host: "1.1.1.1", port: 80, protocol: "http" },
		{ host: "2.2.2.2", port: 80, protocol: "http" },
		{ host: "3.3.3.3", port: 80, protocol: "http" }
	]);
});

test("test multiple proxy uri seperated by new line", () => {
	expect(parse("1.1.1.1:80\n2.2.2.2:80\n3.3.3.3:80")).toEqual([
		{ host: "1.1.1.1", port: 80, protocol: "http" },
		{ host: "2.2.2.2", port: 80, protocol: "http" },
		{ host: "3.3.3.3", port: 80, protocol: "http" }
	]);
});

test("test multiple proxy uri seperated by space", () => {
	expect(parse("1.1.1.1:80 2.2.2.2:80 3.3.3.3:80")).toEqual([
		{ host: "1.1.1.1", port: 80, protocol: "http" },
		{ host: "2.2.2.2", port: 80, protocol: "http" },
		{ host: "3.3.3.3", port: 80, protocol: "http" }
	]);
});

test("test multiple proxy uri seperated by comma and space", () => {
	expect(parse("1.1.1.1:80, 2.2.2.2:80, 3.3.3.3:80")).toEqual([
		{ host: "1.1.1.1", port: 80, protocol: "http" },
		{ host: "2.2.2.2", port: 80, protocol: "http" },
		{ host: "3.3.3.3", port: 80, protocol: "http" }
	]);
});

test("test multiple proxy uri seperated by comma and new line", () => {
	expect(parse("1.1.1.1:80,\n2.2.2.2:80,\n3.3.3.3:80")).toEqual([
		{ host: "1.1.1.1", port: 80, protocol: "http" },
		{ host: "2.2.2.2", port: 80, protocol: "http" },
		{ host: "3.3.3.3", port: 80, protocol: "http" }
	]);
});

test("test multiple proxy uri with protocol seperated by comma and new line", () => {
	expect(parse(`http://1.1.1.1:80,\nhttp://2.2.2.2:80,\nhttp://3.3.3.3:80`)).toEqual([
		{ host: "1.1.1.1", port: 80, protocol: "http" },
		{ host: "2.2.2.2", port: 80, protocol: "http" },
		{ host: "3.3.3.3", port: 80, protocol: "http" }
	]);
});

test("test multiple proxy uri with protocol and auth seperated by comma and new line", () => {
	expect(parse(`http://user:pass@1.1.1.1:80,\nhttp://user:pass@2.2.2.2:80,\nhttp://user:pass@3.3.3.3:80`)).toEqual([
		{ host: "1.1.1.1", port: 80, protocol: "http", auth: { username: "user", password: "pass" } },
		{ host: "2.2.2.2", port: 80, protocol: "http", auth: { username: "user", password: "pass" } },
		{ host: "3.3.3.3", port: 80, protocol: "http", auth: { username: "user", password: "pass" } }
	]);
});

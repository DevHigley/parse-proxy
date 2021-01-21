interface Proxy {
    host: string;
    port: number;
    protocol: string;
    auth?: {
        username: string;
        password: string;
    };
}
declare function parse(string: string): Proxy[];
export = parse;

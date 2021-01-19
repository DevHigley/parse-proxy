"use strict";
var URL = require("url").URL;
function parse(string) {
    var rawArray = stringToArray(string);
    var fixedArray = rawArray.map(function (string) { return fixProxyString(string); });
    var proxyArray = fixedArray.map(function (string) { return stringToProxy(string); });
    return proxyArray;
}
function stringToArray(string) {
    return string
        .trim()
        .replace(/[ ,\n]+/g, ",")
        .split(",");
}
function fixProxyString(string) {
    return string.includes("://") ? string : "http://" + string;
}
function stringToProxy(string) {
    var url = new URL(string);
    return {
        host: url.hostname,
        port: url.port ? parseInt(url.port) : 80,
        protocol: url.protocol.slice(0, -1),
        auth: url.username ? { username: url.username, password: url.password } : undefined
    };
}
module.exports = parse;

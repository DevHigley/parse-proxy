"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    return __assign({ host: url.hostname, port: url.port ? parseInt(url.port) : 80, protocol: url.protocol.slice(0, -1) }, (url.username && { auth: { username: url.username.replace("%40", "@"), password: url.password } }));
}
module.exports = parse;

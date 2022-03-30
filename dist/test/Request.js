"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const util_1 = (0, tslib_1.__importDefault)(require("util"));
const Request_1 = require("../lib/Request");
async function requestTest() {
    const hosts = ['example.org'];
    const protocols = ['http', 'https'];
    const headers = { 'User-Agent': 'Mozilla 5.0' };
    const protocolsResult = await Promise.all(protocols.map(async (protocol) => {
        console.log(protocol);
        const hostsResult = await Promise.all(hosts.map(async (host) => {
            return [host, await (0, Request_1.request)({
                    host,
                    protocol: `${protocol}:`,
                    headers
                })];
        }));
        return [protocol, Object.fromEntries(hostsResult)];
    }));
    const result = Object.fromEntries(protocolsResult);
    return result;
}
async function getResult() {
    const versionResult = {
        node: (0, child_process_1.execSync)('node -v').toString(),
        tsc: (0, child_process_1.execSync)('tsc -v').toString()
    };
    const requestResult = await requestTest();
    return {
        versionResult,
        requestResult
    };
}
(async function () {
    const result = await getResult();
    console.info(util_1.default.inspect(result, {
        showHidden: false,
        depth: null,
        colors: true
    }));
})();
//# sourceMappingURL=Request.js.map
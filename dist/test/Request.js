"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const Request_1 = require("../lib/Request");
function requestTest() {
    return __awaiter(this, void 0, void 0, function* () {
        const hosts = ['example.org'];
        const protocols = ['http', 'https'];
        const headers = { 'User-Agent': 'Mozilla 5.0' };
        const protocolsResult = yield Promise.all(protocols.map((protocol) => __awaiter(this, void 0, void 0, function* () {
            console.log(protocol);
            const hostsResult = yield Promise.all(hosts.map((host) => __awaiter(this, void 0, void 0, function* () {
                return [host, yield (0, Request_1.request)({
                        host,
                        protocol: `${protocol}:`,
                        headers
                    })];
            })));
            return [protocol, Object.fromEntries(hostsResult)];
        })));
        const result = Object.fromEntries(protocolsResult);
        return result;
    });
}
function getResult() {
    return __awaiter(this, void 0, void 0, function* () {
        const versionResult = {
            node: (0, child_process_1.execSync)('node -v').toString(),
            tsc: (0, child_process_1.execSync)('tsc -v').toString()
        };
        const requestResult = yield requestTest();
        return {
            versionResult,
            requestResult
        };
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getResult();
        console.info(util_1.default.inspect(result, {
            showHidden: false,
            depth: null,
            colors: true
        }));
    });
})();

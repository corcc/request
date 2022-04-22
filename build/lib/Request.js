"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.getProtocol = exports.getClient = void 0;
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const https_1 = tslib_1.__importDefault(require("https"));
const http_logger_1 = require("@corcc/http-logger");
function getClient(protocol) {
    switch ('http:') {
        case protocol: return http_1.default;
        default: return https_1.default;
    }
}
exports.getClient = getClient;
function getProtocol(options) {
    try {
        return new URL(options).protocol;
    }
    catch (error) {
        return options.protocol || 'https:';
    }
}
exports.getProtocol = getProtocol;
async function request(options, body, logger) {
    const _logger = logger || new http_logger_1.HttpLogger();
    const protocol = getProtocol(options);
    const client = getClient(protocol);
    return await new Promise((resolve, reject) => {
        const req = client.request(options, (res) => {
            const body = [];
            const appendBody = (chunk) => {
                chunk.forEach((x) => {
                    body.push(x);
                });
            };
            res.on('data', (chunk) => {
                appendBody(chunk);
                res.body = Buffer.from(body);
                _logger.res.data({ req, res });
            });
            res.on('end', () => {
                res.body = Buffer.from(body);
                _logger.res.end({ req, res });
                resolve(res);
            });
        });
        const _body = Object.assign(options, { body })?.body;
        if (_body) {
            req.write(_body);
        }
        req.on('error', (error) => {
            _logger.req.error({ req });
            reject(error);
        });
        req.end();
    });
}
exports.request = request;

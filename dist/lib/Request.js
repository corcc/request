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
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
function request(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { protocol } = options;
        const prot = protocol.replace(':', '');
        const http = require(prot);
        return yield new Promise((resolve, reject) => {
            const bodyCollect = [];
            const req = http.request(options, (res) => {
                res.on('data', (chunk) => {
                    chunk.forEach((x) => {
                        bodyCollect.push(x);
                    });
                });
                res.on('end', () => {
                    const body = Buffer.from(bodyCollect);
                    res.body = body.toString();
                    resolve(res);
                });
            });
            if (options.body) {
                req.write(options.body);
            }
            req.on('error', (error) => {
                console.error(error);
                reject(error);
            });
            req.end();
        });
    });
}
exports.request = request;

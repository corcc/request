"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
async function request(options) {
    const { protocol } = options;
    const prot = protocol.replace(':', '');
    const http = require(prot);
    return await new Promise((resolve, reject) => {
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
}
exports.request = request;
//# sourceMappingURL=Request.js.map
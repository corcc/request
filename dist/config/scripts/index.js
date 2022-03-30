"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const package_1 = require("@taccl/package");
const scripts = (0, package_1.writeScripts)(path_1.default.join(__dirname.replace(process.cwd(), ''), 'Config'));
console.log('scripts:');
console.log(scripts);
//# sourceMappingURL=index.js.map
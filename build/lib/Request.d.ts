/// <reference types="node" />
import http, { RequestOptions, IncomingMessage } from 'http';
import https from 'https';
import { HttpLogger } from '@corcc/http-logger';
export declare function getClient(protocol: string): typeof http | typeof https;
export declare function getProtocol(options: any): string;
export declare function request(options: RequestOptions | URL | string, body?: Array<number | undefined> | Buffer, logger?: HttpLogger): Promise<IncomingMessage & {
    body?: Array<number | undefined> | Buffer;
}>;

import http, { RequestOptions, IncomingMessage } from 'http';
import https from 'https';
import { HttpLogger } from '@corcc/http-logger';

export function getClient (protocol:string) {
	switch ('http:') {
	case protocol: return http;
	default: return https;
	}
}
export function getProtocol (
	options: any
):string {
	try {
		return new URL(options).protocol;
	} catch (error: any) {
		return options.protocol || 'https:';
	}
}

export async function request (
	options: |
		RequestOptions|
		URL|
		string,
	body?:Array<number|undefined>|Buffer,
	logger?:HttpLogger
): Promise<IncomingMessage & {body?:Array<number|undefined>|Buffer}> {
	const _logger:HttpLogger = logger || new HttpLogger();
	const protocol = getProtocol(options);
	const client = getClient(protocol);
	return await new Promise((resolve, reject) => {
		const req = client.request(options, (
			res:IncomingMessage & {body?:Array<number|undefined>|Buffer}
		) => {
			const body:Array<number> = [];
			const appendBody = (chunk:Buffer) => {
				chunk.forEach((x:number) => {
					body.push(x);
				});
			};
			res.on('data', (chunk:Buffer) => {
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
		const _body = Object.assign(
			options,
			{ body }
		)?.body;
		if (_body) {
			req.write(_body);
		}
		req.on('error', (error:Error) => {
			_logger.req.error({ req });
			reject(error);
		});
		req.end();
	});
}

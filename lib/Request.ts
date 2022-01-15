import { ClientRequest, ServerResponse } from 'http';
export async function request (options: ClientRequest & {
	body: string
}): Promise<ServerResponse & {
	body: string
}> {
	const { protocol }: any = options;
	const http = require(protocol.replace(':', ''));
	return await new Promise((resolve, reject) => {
		const bodyCollect: Array<number> = [];
		const req = http.request(options, (res: any) => {
			res.on('data', (chunk: Buffer) => {
				chunk.forEach((x: number) => {
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
		req.on('error', (error: any) => {
			console.error(error);
			reject(error);
		});
		req.end();
	});
}

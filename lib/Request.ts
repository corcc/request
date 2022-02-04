export async function request (
	options: string | any | URL): Promise<any> {
	const { protocol }: any = options;
	const prot = protocol.replace(':', '');
	const http = require(prot);
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

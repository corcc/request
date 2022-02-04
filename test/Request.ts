import { execSync } from 'child_process';
import util from 'util';
import {
	request
} from '../lib/Request';

async function requestTest ():Promise<any> {
	const hosts = ['example.org'];
	const protocols = ['http', 'https'];
	const headers = { 'User-Agent': 'Mozilla 5.0' };
	const protocolsResult = await Promise.all(
		protocols.map(
			async (protocol:string) => {
				console.log(protocol);
				const hostsResult = await Promise.all(
					hosts.map(
						async (host:string) => {
							return [host, await request({
								host,
								protocol: `${protocol}:`,
								headers
							})];
						}
					)
				);
				return [protocol, Object.fromEntries(
					hostsResult
				)];
			}
		)
	);
	const result = Object.fromEntries(
		protocolsResult
	);
	return result;
}
async function getResult () {
	const versionResult: any = {
		node: execSync('node -v').toString(),
		tsc: execSync('tsc -v').toString()
	};
	const requestResult = await requestTest();
	return {
		versionResult,
		requestResult
	};
}

(async function () {
	const result = await getResult();
	console.info(
		util.inspect(
			result,
			{
				showHidden: false,
				depth: null,
				colors: true
			}
		)
	);
})();

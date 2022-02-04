export const scripts = {
	config: {
		scripts: 'ts-node ./config/scripts'
	},
	lint: {
		fix: 'eslint --fix --ext .ts,.tsx .',
		run: 'eslint --ext .ts,.tsx .'
	},
	test: {
		request: 'ts-node ./test/Request.ts'
	},
	build: {
		tsc: {
			clean: "tsc --build --clean",
			noargs: "tsc",
			version: "tsc --version"
		}
	}
};

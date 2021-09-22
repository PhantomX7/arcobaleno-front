import preprocess from 'svelte-preprocess';
import path from 'path';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					'@env': path.resolve('./src/env'),
					'@api': path.resolve('./src/api'),
					'@components': path.resolve('./src/components'),
					'@helpers': path.resolve('./src/helpers'),
				},
			},
		},
	},

	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};

export default config;

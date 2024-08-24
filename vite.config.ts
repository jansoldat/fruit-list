import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { normalizePath, loadEnv, defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		base: '/fruit-list/',
		define: {
			'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
		},
		plugins: [
			react(),
			viteStaticCopy({
				targets: [
					{
						src: normalizePath(path.resolve('./src/assets/locales')),
						dest: normalizePath(path.resolve('./dist')),
					},
				],
			}),
			tsconfigPaths(),
		],
		server: {
			host: true,
			strictPort: false,
			proxy: {
				'/api': {
					target: 'https://www.fruityvice.com',
					changeOrigin: true,
					secure: false,
					rewrite: path => path.replace(/^\/api/, '/api/'),
				},
			},
		},
		test: {
			environment: 'jsdom',
			setupFiles: ['./vitest.setup.ts'],
			css: true,
		},
	};
});

/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	css: { postcss: { plugins: [] } },
	test: {
		include: ['./src/**/*.test.{ts,tsx}'],
		setupFiles: ['./vitest.setup.ts'],
		restoreMocks: true,
		coverage: {
			include: ['./src/**/*.{ts,tsx}'],
			all: true,
		},
		globals: true,
	},
});

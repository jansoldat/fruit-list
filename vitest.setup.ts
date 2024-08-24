import 'dotenv/config';
import { server } from './src/mocks/node';

import { cleanup } from '@testing-library/react';
import {
	afterEach,
	beforeAll,
	afterAll,
	beforeEach,
	vi,
	type MockInstance,
} from 'vitest';

afterEach(() => {
	cleanup();
	server.resetHandlers();
});

beforeAll(() => {
	server.listen();
});

afterAll(() => {
	server.close();
});

export let consoleError: MockInstance<typeof console.error>;

beforeEach(() => {
	const originalConsoleError = console.error;
	consoleError = vi.spyOn(console, 'error');
	consoleError.mockImplementation(
		(...args: Parameters<typeof console.error>) => {
			originalConsoleError(...args);
			throw new Error(
				'Console error was called. Call consoleError.mockImplementation(() => {}) if this is expected.',
			);
		},
	);
});

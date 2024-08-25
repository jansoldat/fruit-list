import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/tailwind.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './common/i18n';

const enableMocking = async () => {
	if (
		process.env.NODE_ENV === 'test' ||
		process.env.NODE_ENV === 'development'
	) {
		const { worker } = await import('./mocks/browser');
		return worker.start();
	}

	return;
};

enableMocking()
	.then(() => {
		const rootElement = document.querySelector('#root') as Element;
		if (!rootElement.innerHTML) {
			const root = ReactDOM.createRoot(rootElement);
			root.render(
				<React.StrictMode>
					<React.Suspense fallback="loading">
						<App />
					</React.Suspense>
				</React.StrictMode>,
			);
		}
	})
	// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
	.catch(reason => console.error(reason));

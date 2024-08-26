import type { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';
import { useTranslation } from 'react-i18next';

export const Layout = ({ children }: PropsWithChildren) => {
	const year = new Date().getFullYear();
	const { t } = useTranslation();

	return (
		<div className="flex min-h-screen flex-col items-center justify-between bg-background">
			<header className="w-full bg-secondary p-4 py-6">
				<Navbar />
			</header>
			<div className="w-full flex-1 flex-col p-8">{children}</div>
			<footer className="w-full bg-secondary p-4 text-center">
				<p>{t('copyright', { year })}</p>
			</footer>
		</div>
	);
};

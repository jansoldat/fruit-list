import type { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../Tooltip';
import { Icon } from '../Icon';

export const Layout = ({ children }: PropsWithChildren) => {
	const year = new Date().getFullYear();
	const { t } = useTranslation();

	return (
		<>
			<header className="w-full bg-primary p-4 py-6">
				<Navbar />
			</header>
			<main className="flex-1 p-8 text-primary">{children}</main>
			<footer className="w-full bg-primary p-4 text-center text-primary-foreground">
				<p>{t('copyright', { year })}</p>
				<Tooltip content={t('github-tooltip')}>
					<a
						className="mr-3 text-3xl"
						href="https://github.com/jansoldat/fruit-list.git"
						rel="noopener noreferrer"
						target="_blank"
					>
						<Icon name="github-logo" />
					</a>
				</Tooltip>
				<Tooltip content={t('linkedin-tooltip')}>
					<a
						className="text-3xl"
						href="https://www.linkedin.com/in/jan-soldat68/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<Icon name="linkedin-logo" />
					</a>
				</Tooltip>
			</footer>
		</>
	);
};

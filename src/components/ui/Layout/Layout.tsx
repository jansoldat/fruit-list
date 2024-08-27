import type { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../Tooltip';
import { Icon } from '../Icon';

export const Layout = ({ children }: PropsWithChildren) => {
	const year = new Date().getFullYear();
	const { t } = useTranslation();

	return (
		<div className="flex min-h-screen flex-col items-center justify-between bg-background">
			<header className="w-full bg-primary p-4 py-6">
				<Navbar />
			</header>
			<div className="w-full flex-1 flex-col p-8">{children}</div>
			<footer className="w-full bg-secondary p-4 text-center">
				<p>{t('copyright', { year })}</p>
				<Tooltip content={t('github-tooltip')}>
					<a
						className="mr-3 text-3xl"
						href="https://github.com/jansoldat/fruit-list.git"
						target="_blank"
					>
						<Icon name="github-logo" />
					</a>
				</Tooltip>

				<Tooltip content={t('linkedin-tooltip')}>
					<a
						className="text-3xl text-blue-700"
						href="https://www.linkedin.com/in/jan-soldat68/"
						target="_blank"
					>
						<Icon name="linkedin-logo" />
					</a>
				</Tooltip>
			</footer>
		</div>
	);
};

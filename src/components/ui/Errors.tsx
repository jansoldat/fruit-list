import { useTranslation } from 'react-i18next';

export const Error50x = () => {
	const { t } = useTranslation();
	return (
		<div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
			<div className="mx-auto max-w-screen-sm text-center">
				<h1 className="mb-4 text-7xl font-extrabold tracking-tight text-danger lg:text-9xl">
					500
				</h1>
				<p className="mb-4 text-3xl font-bold tracking-tight text-primary md:text-4xl">
					{t('error.500.title')}
				</p>
				<p className="mb-4 text-lg font-light text-secondary">
					{t('error.500.message')}
				</p>
			</div>
		</div>
	);
};

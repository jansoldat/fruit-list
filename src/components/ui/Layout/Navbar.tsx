import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ThemeToggle } from '../../ThemeToggle';
import { Tooltip } from '../Tooltip';

export const Navbar = () => {
	const { t, i18n } = useTranslation();

	const toggleLangChange = async () => {
		const nextLang = i18n.language === 'en' ? 'fr' : 'en';
		await i18n.changeLanguage(nextLang);
	};

	return (
		<nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
			<h4 className="text-h4 text-primary-foreground">🍉🍎🍍 {t('appName')}</h4>
			<div className="flex items-center gap-3">
				<ThemeToggle />
				<Tooltip content={t('navbar.change-lang')}>
					<Button size="icon" variant="outline" onClick={toggleLangChange}>
						<Icon name="globe" />
					</Button>
				</Tooltip>
			</div>
		</nav>
	);
};

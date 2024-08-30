import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { Icon, ToggleGroup, ToggleGroupItem } from './ui';
import { useMemo } from 'react';

export const ThemeToggle = () => {
	const { setThemePreference, currentThemePreference } = useTheme();
	const { t } = useTranslation();

	const iconMap = useMemo(
		() =>
			[
				{ value: 'system', icon: 'laptop', label: 'theme.system' },
				{ value: 'light', icon: 'sun', label: 'theme.light' },
				{ value: 'dark', icon: 'moon', label: 'theme.dark' },
			] as const,
		[],
	);

	return (
		<ToggleGroup
			type="single"
			value={currentThemePreference}
			onValueChange={(value: 'light' | 'system' | 'dark' | '') => {
				if (value) setThemePreference(value);
			}}
		>
			{iconMap.map(({ value, icon, label }) => (
				<ToggleGroupItem key={value} value={value}>
					<Icon name={icon}>
						<span className="sr-only">{t(label)}</span>
					</Icon>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};

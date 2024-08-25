import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import type { FruitItem } from '~/src/types';
import { Button, Icon, Tooltip } from '../ui';
import { isDisabled } from './helpers';

type Props =
	| {
			isLoading: true;
			fruit?: never;
			selected?: never;
			onDelete?: never;
			onAdd?: never;
	  }
	| {
			isLoading?: never;
			fruit: FruitItem;
			selected: Map<number, number>;
			onDelete: () => void;
			onAdd: () => void;
	  };

interface CounterProps extends Pick<Props, 'onDelete'> {
	count: undefined | number;
}

export const CounterHeader: FC<CounterProps> = ({ count, onDelete }) => {
	const { t } = useTranslation();
	if (!count) return null;

	const iconName = count === 1 ? 'trash' : 'minus';
	const tooltipContentKey = isDisabled(count)
		? t('list.item.disabled-tooltip')
		: t(`list.item.${iconName}-tooltip`);

	return (
		<div className="absolute top-4 flex w-full items-center justify-between px-3">
			<Tooltip content={tooltipContentKey}>
				<Button
					aria-label={iconName === 'trash' ? 'delete' : 'decrease'}
					size="icon"
					variant="outlineDestructive"
					onClick={onDelete}
				>
					<Icon className="text-danger" name={iconName} size="md" />
				</Button>
			</Tooltip>
			<Tooltip content={t(`list.item.count-tooltip`)}>
				<div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-background text-sm font-medium shadow-md outline-none">
					{count}
				</div>
			</Tooltip>
		</div>
	);
};

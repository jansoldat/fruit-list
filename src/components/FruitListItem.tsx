import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Tooltip } from './ui';
import { getAssetUrl } from '~/src/api/assets';
import type { FruitItem } from '~/src/types';

const COUNT_LIMIT = 9;

interface Props {
	fruit: FruitItem;
	selected: Map<number, number>;
	onDelete: () => void;
	onAdd: () => void;
}

interface CounterProps extends Pick<Props, 'onDelete'> {
	count: undefined | number;
}

const isDisabled = (count = 0): boolean => count >= COUNT_LIMIT;

const Counter: FC<CounterProps> = ({ count, onDelete }) => {
	const { t } = useTranslation();
	if (!count) return null;

	const iconName = count === 1 ? 'trash' : 'minus';
	const tooltipContentKey = isDisabled(count)
		? t('list.item.disabled-tooltip')
		: t(`list.item.${iconName}-tooltip`);

	return (
		<div className="absolute top-2 flex w-full items-center justify-between px-3">
			<Tooltip content={tooltipContentKey}>
				<Button
					aria-label={iconName === 'trash' ? 'delete' : 'decrease'}
					size="icon"
					variant="outline"
					onClick={onDelete}
				>
					<Icon className="text-danger" name={iconName} size="md" />
				</Button>
			</Tooltip>
			<Tooltip content={t(`list.item.count-tooltip`)}>
				<div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-background text-sm font-medium shadow-lg outline-none">
					{count}
				</div>
			</Tooltip>
		</div>
	);
};

export const FruitListItem = ({ fruit, onDelete, onAdd, selected }: Props) => {
	const count = selected.get(fruit.id);

	return (
		<li className="relative flex w-full min-w-48 max-w-56 flex-col items-center justify-center rounded-lg bg-muted p-3 shadow-lg">
			<Counter count={count} onDelete={onDelete} />
			<img
				alt={fruit.name}
				className="max-h-24 object-contain"
				height={90}
				loading="lazy"
				src={getAssetUrl(fruit.name.toLowerCase())}
				width={100}
			/>
			<h5 className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-caption">
				{fruit.name}
			</h5>
			<span className="mb-4 mt-1 text-body-sm font-light text-secondary">
				({fruit.nutritions.calories} kcal)
			</span>
			<Button disabled={isDisabled(count)} size="full" onClick={onAdd}>
				Add
			</Button>
		</li>
	);
};

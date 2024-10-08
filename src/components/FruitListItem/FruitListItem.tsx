import { cn } from '~/src/common/utils';
import { Button, ConditionalTooltip } from '../ui';
import { canAddFruit } from '../utils/helpers';
import { Picture, Subtitle, Title } from './ContentComponents';
import { CounterHeader } from './CounterHeader';

import type { FruitListItemProps } from './types';
import { useTranslation } from 'react-i18next';

export const FruitListItem = (props: FruitListItemProps) => {
	const { onDelete, onAdd, count, isLoading } = props;
	const { t } = useTranslation();

	const protectedFn = (fn?: (id: number) => void) =>
		isLoading
			? undefined
			: () => {
					fn?.(props.fruit.id);
				};

	const isDisabled = canAddFruit(count) || isLoading;

	return (
		<li
			className={cn(
				'relative flex w-full min-w-48 max-w-56 flex-col items-center justify-center rounded-lg border bg-card p-3 py-6 shadow-lg transition-colors hover:bg-primary/10',
				{ '': (count ?? 0) > 0 },
			)}
		>
			<CounterHeader count={count} onDelete={protectedFn(onDelete)} />

			<Picture {...props} />
			<h5 className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-caption text-primary">
				<Title {...props} />
			</h5>
			<span className="mb-4 mt-1 text-body-sm font-light text-primary">
				<Subtitle {...props} />
			</span>

			<ConditionalTooltip
				content={t(`list.item.disabled-tooltip`)}
				shouldHide={!isDisabled}
			>
				<span className="w-full" tabIndex={0}>
					<Button
						disabled={isDisabled}
						size="full"
						onClick={protectedFn(onAdd)}
					>
						{t('list.item.add-button')}
					</Button>
				</span>
			</ConditionalTooltip>
		</li>
	);
};

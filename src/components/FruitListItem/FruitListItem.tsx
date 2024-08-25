import { Button } from '../ui';
import { Picture, Subtitle, Title } from './ContentComponents';
import { CounterHeader } from './CounterHeader';
import { isDisabled } from './helpers';
import type { FruitListItemProps } from './types';

export const FruitListItem = (props: FruitListItemProps) => {
	const { fruit, onDelete, onAdd, selected, isLoading } = props;
	const count = isLoading ? 0 : selected.get(fruit.id);

	return (
		<li className="relative flex w-full min-w-48 max-w-56 flex-col items-center justify-center rounded-lg border bg-card p-3 py-6 shadow-lg">
			<CounterHeader count={count} onDelete={onDelete} />

			<Picture {...props} />
			<h5 className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-caption">
				<Title {...props} />
			</h5>
			<span className="mb-4 mt-1 text-body-sm font-light text-primary">
				<Subtitle {...props} />
			</span>

			<Button
				disabled={isDisabled(count) || isLoading}
				size="full"
				onClick={onAdd}
			>
				Add
			</Button>
		</li>
	);
};

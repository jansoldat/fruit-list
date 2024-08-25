import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo, type FC } from 'react';
import type { FruitItem } from '../types';
import { FruitListItem } from './FruitListItem';
import { Error50x } from './ui';
import { cn } from '../common/utils';

export type ListProps = Pick<
	UseQueryResult<FruitItem[], Error>,
	'data' | 'status'
> & {
	className?: string;
};

export const List: FC<ListProps> = ({ data, status, className }) => {
	const selected = new Map();

	const loadingArray = useMemo<{ id: number }[]>(
		() => new Array(16).fill(null).map(() => ({ id: Math.random() })),
		[],
	);

	const handleAdd = () => {
		console.log('ADD');
	};

	const handleDelete = () => {
		console.log('DELETE');
	};

	if (status === 'error') return <Error50x />;

	return (
		<ul
			className={cn(
				'flex w-full flex-wrap items-center justify-center gap-6',
				className,
			)}
		>
			{status === 'pending'
				? loadingArray.map(fruit => <FruitListItem key={fruit.id} isLoading />)
				: data?.map(fruit => (
						<FruitListItem
							key={fruit.id}
							fruit={fruit}
							selected={selected}
							onAdd={handleAdd}
							onDelete={handleDelete}
						/>
					))}
		</ul>
	);
};

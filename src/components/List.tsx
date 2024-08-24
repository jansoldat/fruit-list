import { useQuery } from '@tanstack/react-query';
import { getAllFruitQueryOptions } from '../api/queries';
import { FruitListItem } from './FruitListItem';

export const List = () => {
	const { data: fruits, status, error } = useQuery(getAllFruitQueryOptions());

	const handleAdd = () => {
		console.log('ADD');
	};

	const handleDelete = () => {
		console.log('DELETE');
	};

	const selectedMap = new Map();

	if (status === 'pending') return <div>PENDING</div>;
	if (status === 'error') return <div>{error.message}</div>;

	return (
		<ul className="flex w-full flex-wrap items-center justify-center gap-6 delay-200">
			{fruits.map(fruit => (
				<FruitListItem
					key={fruit.id}
					fruit={fruit}
					selected={selectedMap}
					onAdd={handleAdd}
					onDelete={handleDelete}
				/>
			))}
		</ul>
	);
};

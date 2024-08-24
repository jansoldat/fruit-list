import { useQuery } from '@tanstack/react-query';
import { getAllFruitQueryOptions } from '../api/queries';
import { FruitListItem } from './FruitListItem';

interface Props {}

export const List = (props: Props) => {
	const { data: fruits, status, error } = useQuery(getAllFruitQueryOptions());

	console.log('🚀 ~ List ~ fruits:', fruits);

	if (status === 'pending') return <div>PENDING</div>;
	if (status === 'error') return <div>{error.message}</div>;

	return (
		<ul className="flex w-full flex-wrap items-center justify-center gap-6 delay-200">
			{fruits.map(fruit => (
				<FruitListItem key={fruit.id} fruit={fruit} />
			))}
		</ul>
	);
};

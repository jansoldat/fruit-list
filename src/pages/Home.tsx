import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { getAllFruitQueryOptions } from '../api/queries';
import { List, type ListProps } from '../components/List';
import { Toolbar } from '../components/Toolbar';
import { Layout } from '../components/ui';
import { useGrouping } from '../hooks/useGrouping';
import { GroupView } from '../components/GroupView';
import { useSorting } from '../hooks/useSorting';

type HomeProps = ListProps;

export const Home = () => {
	const result = useQuery(getAllFruitQueryOptions());
	return <HomeView {...result} />;
};

const HomeView: FC<HomeProps> = ({ data, ...props }) => {
	const { sortedData, handleSortChange, sorting } = useSorting(data);
	const { groupKey, groupData, handleGroupChange } = useGrouping(sortedData);

	return (
		<Layout>
			<main className="flex-1 px-3">
				<Toolbar
					groupKey={groupKey}
					isLoaded={props.status === 'success'}
					sorting={sorting}
					onGroupChange={handleGroupChange}
					onSortChange={handleSortChange}
				/>
				{groupKey === 'none' ? (
					<List {...props} data={sortedData} />
				) : (
					<GroupView groupData={groupData} />
				)}
			</main>
			<aside className="flex-0 bg-blue-400"></aside>
		</Layout>
	);
};

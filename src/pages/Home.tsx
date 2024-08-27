import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { getAllFruitQueryOptions } from '../api/queries';
import { GroupView } from '../components/GroupView';
import { Jar } from '../components/Jar';
import { JarModal } from '../components/JarModal';
import { List, type ListProps } from '../components/List';
import { Toolbar } from '../components/Toolbar';
import { Layout } from '../components/ui';
import { useGrouping } from '../hooks/useGrouping';
import { useSearch } from '../hooks/useSearch';
import { useSelectedFruit } from '../hooks/useSelectedFruit';
import { useSorting } from '../hooks/useSorting';

type HomeProps = ListProps;

export const Home = () => {
	const result = useQuery(getAllFruitQueryOptions());
	return <HomeView {...result} />;
};

const HomeView: FC<HomeProps> = ({ data, ...props }) => {
	const { filteredData, handleSearchChange, searchTerm } = useSearch(data);
	const { sortedData, handleSortChange, sorting } = useSorting(filteredData);
	const { groupKey, handleGroupChange, groupedData } = useGrouping(sortedData);

	const { selected } = useSelectedFruit();

	return (
		<Layout>
			<Toolbar
				groupKey={groupKey}
				isLoaded={props.status === 'success'}
				searchTerm={searchTerm}
				sorting={sorting}
				onGroupChange={handleGroupChange}
				onSearchChange={handleSearchChange}
				onSortChange={handleSortChange}
			/>

			<div className="flex flex-row gap-6">
				<main className="w-full lg:w-[70%]">
					{groupKey === 'none' ? (
						<List {...props} data={sortedData} />
					) : (
						<GroupView groupData={groupedData} />
					)}
				</main>
				<aside className="hidden h-[60vh] overflow-y-auto rounded bg-muted shadow-lg lg:sticky lg:top-0 lg:block lg:w-[30%]">
					<Jar />
				</aside>
			</div>
			<JarModal isEmpty={!selected.size} />
		</Layout>
	);
};

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

export const Home: FC = () => {
	const result = useQuery(getAllFruitQueryOptions());
	return <HomeView {...result} />;
};

const HomeView: FC<HomeProps> = ({ data, ...props }) => {
	const { filteredData, handleSearchChange, searchTerm } = useSearch(data);
	const { sortedData, handleSortChange, sorting } = useSorting(filteredData);
	const { groupKey, handleGroupChange, groupedData } = useGrouping(sortedData);
	const { selected } = useSelectedFruit();

	const isJarEmpty = selected.size === 0;

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
			<div className="flex flex-col gap-6 lg:flex-row">
				{groupKey === 'none' ? (
					<List
						{...props}
						className="min-[450px]:grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-4 lg:w-[70%] lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
						data={sortedData}
					/>
				) : (
					<GroupView className="w-full lg:w-[70%]" groupData={groupedData} />
				)}
				<Jar className="hidden h-[60vh] overflow-y-auto rounded bg-muted shadow-lg lg:sticky lg:top-0 lg:flex lg:w-[30%]" />
				<JarModal isEmpty={isJarEmpty} />
			</div>
		</Layout>
	);
};

export default Home;

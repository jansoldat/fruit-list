import { useQuery } from '@tanstack/react-query';
import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllFruitQueryOptions } from '../api/queries';
import { GroupView } from '../components/GroupView';
import { Jar } from '../components/Jar';
import { List, type ListProps } from '../components/List';
import { Toolbar } from '../components/Toolbar';
import { Button, Layout } from '../components/ui';
import { Modal } from '../components/ui/Modal';
import { useGrouping } from '../hooks/useGrouping';
import { useSelectedFruit } from '../hooks/useSelectedFruit';
import { useSorting } from '../hooks/useSorting';

type HomeProps = ListProps;

export const Home = () => {
	const result = useQuery(getAllFruitQueryOptions());
	return <HomeView {...result} />;
};

const HomeView: FC<HomeProps> = ({ data, ...props }) => {
	const { sortedData, handleSortChange, sorting } = useSorting(data);
	const { groupKey, handleGroupChange, groupedData } = useGrouping(sortedData);
	const [isOpen, setModalOpen] = useState(false);
	const { t } = useTranslation();
	const { selected } = useSelectedFruit();

	return (
		<Layout>
			<div className="mb-8 flex-row">
				<Toolbar
					groupKey={groupKey}
					isLoaded={props.status === 'success'}
					sorting={sorting}
					onGroupChange={handleGroupChange}
					onSortChange={handleSortChange}
				/>
			</div>
			<div className="flex flex-row gap-6">
				<main className="w-full lg:w-[70%]">
					{groupKey === 'none' ? (
						<List {...props} data={sortedData} />
					) : (
						<GroupView groupData={groupedData} />
					)}
				</main>
				<aside className="hidden lg:block lg:w-[30%]">
					<div className="h-[60vh] overflow-y-auto rounded bg-muted shadow-lg lg:sticky lg:top-0">
						<Jar />
					</div>
				</aside>
			</div>
			<Modal
				isOpen={isOpen}
				triggerElement={
					selected.size === 0 ? null : (
						<Button
							className="fixed bottom-4 right-2 lg:hidden"
							size="wide"
							onClick={() => {
								setModalOpen(true);
							}}
						>
							{t('jar.open')}
						</Button>
					)
				}
				onOpenChange={newOpen => {
					setModalOpen(newOpen);
				}}
			>
				<Jar />
			</Modal>
		</Layout>
	);
};

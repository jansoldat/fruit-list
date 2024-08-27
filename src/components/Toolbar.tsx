import { useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { GroupKey, Sorting } from '../types';
import { Label, Select, Input } from './ui';

interface Items<T> {
	value: T;
	label: string;
}

interface Props {
	groupKey: GroupKey;
	onGroupChange: (newKey: GroupKey) => void;
	onSortChange: (newKey: Sorting) => void;
	isLoaded: boolean;
	sorting: Sorting;
	onSearchChange: (newTerm: string) => void;
	searchTerm: string;
}

export const Toolbar: FC<Props> = ({
	groupKey,
	onGroupChange,
	isLoaded,
	onSortChange,
	sorting,
	onSearchChange,
	searchTerm,
}) => {
	const { t } = useTranslation();
	const grouping = useMemo<Items<GroupKey>[]>(
		() => [
			{ value: 'none', label: t('list.toolbar-groupBy.label-none') },
			{ value: 'family', label: t('list.toolbar-groupBy.label-family') },
			{ value: 'genus', label: t('list.toolbar-groupBy.label-genus') },
			{ value: 'order', label: t('list.toolbar-groupBy.label-order') },
		],
		[t],
	);

	const sortItems = useMemo<Items<Sorting>[]>(
		() => [
			{ value: 'none', label: t('list.toolbar-sortBy.none') },
			{ value: 'name-asc', label: t('list.toolbar-sortBy.name-asc') },
			{ value: 'name-desc', label: t('list.toolbar-sortBy.name-desc') },
			{ value: 'calories-asc', label: t('list.toolbar-sortBy.calories-asc') },
			{ value: 'calories-desc', label: t('list.toolbar-sortBy.calories-desc') },
		],
		[t],
	);

	return (
		<div className="mb-8 flex w-full flex-row flex-wrap gap-4">
			<div className="inline-flex flex-nowrap items-center">
				<Label className="" htmlFor="search-by">
					{t('tooltip.search-label')}:
				</Label>
				<Input
					className="ml-2 w-56 shadow-lg"
					id="search-by"
					name="search"
					placeholder={t('tooltip.search-placeholder')}
					type="search"
					value={searchTerm}
					onChange={event => {
						onSearchChange(event.currentTarget.value);
					}}
				/>
			</div>
			<div className="inline-flex flex-nowrap items-center">
				<Label htmlFor="group-by">{t('tooltip.group-label')}:</Label>
				<Select
					defaultValue="none"
					id="group-by"
					isDisabled={!isLoaded}
					items={grouping}
					value={groupKey}
					onChange={onGroupChange}
				/>
			</div>
			<div className="inline-flex flex-nowrap items-center">
				<Label htmlFor="sort-by">{t('tooltip.sort-label')}:</Label>
				<Select
					defaultValue="none"
					id="sort-by"
					isDisabled={!isLoaded}
					items={sortItems}
					value={sorting}
					onChange={onSortChange}
				/>
			</div>
		</div>
	);
};

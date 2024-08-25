import { useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { GroupKey, Sorting } from '../types';
import { Label, Select } from './ui';

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
}

export const Toolbar: FC<Props> = ({
	groupKey,
	onGroupChange,
	isLoaded,
	onSortChange,
	sorting,
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
		<div className="mb-8 inline-flex gap-6">
			<div>
				<Label htmlFor="group-by">Group by:</Label>
				<Select
					defaultValue="none"
					id="group-by"
					isDisabled={!isLoaded}
					items={grouping}
					value={groupKey}
					onChange={onGroupChange}
				/>
			</div>
			<div>
				<Label htmlFor="sort-by">Sort by:</Label>
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

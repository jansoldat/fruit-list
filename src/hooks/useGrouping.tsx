import { useMemo, useState } from 'react';
import type { FruitItem, GroupKey } from '../types';
import { convertArrayToMap } from '../common/utils';

export const useGrouping = (data: FruitItem[] = []) => {
	const [groupKey, setGroupKey] = useState<GroupKey>('none');

	const groupedData = useMemo(() => {
		if (groupKey === 'none') return new Map<string, FruitItem[]>();
		return convertArrayToMap(data, groupKey, true);
	}, [data, groupKey]);

	const handleGroupChange = (newKey: GroupKey) => {
		setGroupKey(newKey);
	};

	return { groupKey, handleGroupChange, groupedData };
};

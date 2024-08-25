import { useEffect, useState } from 'react';
import type { FruitItem, GroupKey } from '../types';
import { convertArrayToMap } from '../common/utils';

export const useGrouping = (data?: FruitItem[]) => {
	const [groupKey, setGroupKey] = useState<GroupKey>('none');
	const [groupData, setGroupData] = useState<Map<string, FruitItem[]>>(
		new Map(),
	);

	const handleGroupChange = (newKey: GroupKey) => {
		setGroupKey(newKey);
	};

	useEffect(() => {
		if (!data || groupKey === 'none') return;
		setGroupData(convertArrayToMap(data, groupKey, true));
	}, [data, groupKey]);

	return { groupKey, handleGroupChange, groupData };
};

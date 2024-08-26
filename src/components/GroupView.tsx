import { useSelectedFruit } from '../hooks/useSelectedFruit';
import type { FruitItem } from '../types';
import { List } from './List';
import { Button } from './ui';
import {
	AccordionContent,
	AccordionItem,
	AccordionRoot,
	AccordionTrigger,
} from './ui/Accordion';
import { FRUIT_COUNT_LIMIT } from './utils/helpers';

interface Props {
	groupData: Map<string, FruitItem[]>;
}

interface GroupItemProps {
	fruits: FruitItem[];
	id: string;
}

const GroupItem = ({ id, fruits }: GroupItemProps) => {
	const { addMultiple, selected } = useSelectedFruit();

	const isDisabled = fruits.some(
		({ id }) => (selected.get(id)?.count ?? 0) >= FRUIT_COUNT_LIMIT,
	);

	return (
		<AccordionItem value={id}>
			<AccordionTrigger>
				<div className="ml-4 flex w-full items-center justify-between">
					{id}
					<Button
						className="ml-2"
						disabled={isDisabled}
						variant="outline"
						onClick={e => {
							addMultiple(
								fruits.map(({ id, name, nutritions }) => ({
									id,
									name,
									calories: nutritions.calories,
								})),
							);
							e.stopPropagation();
						}}
					>
						Add group ({fruits.length} items)
					</Button>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<List className="justify-start" data={fruits} status="success" />
			</AccordionContent>
		</AccordionItem>
	);
};

export const GroupView = ({ groupData }: Props) => {
	return (
		<AccordionRoot className="w-full rounded-md bg-background" type="multiple">
			{Array.from(groupData.entries()).map(([key, fruits]) => (
				<GroupItem key={key} fruits={fruits} id={key} />
			))}
		</AccordionRoot>
	);
};

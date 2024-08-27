import { useMemo } from 'react';
import { useSelectedFruit } from '../hooks/useSelectedFruit';
import type { FruitItem } from '../types';
import { List } from './List';
import { Button, Icon, Tooltip } from './ui';
import {
	AccordionContent,
	AccordionItem,
	AccordionRoot,
	AccordionTrigger,
} from './ui/Accordion';
import { FRUIT_COUNT_LIMIT } from './utils/helpers';
import { useTranslation } from 'react-i18next';

interface Props {
	groupData: Map<string, FruitItem[]>;
}

interface GroupItemProps {
	fruits: FruitItem[];
	id: string;
}

const GroupItem = ({ id, fruits }: GroupItemProps) => {
	const { addMultiple, removeMultiple, selected } = useSelectedFruit();
	const { t } = useTranslation();
	const { isDisabled, selectedItemsCount } = useMemo(
		() =>
			fruits.reduce(
				(acc, { id }) => {
					const isSelected = selected.has(id);
					if (isSelected) {
						acc.selectedItemsCount++;
						if ((selected.get(id)?.count ?? 0) >= FRUIT_COUNT_LIMIT)
							acc.isDisabled = true;
					}
					return acc;
				},
				{ isDisabled: false, selectedItemsCount: 0 },
			),
		[fruits, selected],
	);

	return (
		<AccordionItem className="relative" value={id}>
			<AccordionTrigger
				controls={
					<div className="absolute right-4 top-1/2 -translate-y-2/4">
						<span className="mr-4 hidden font-light text-primary/50 sm:inline-block">
							{t('group-view.selected-label', {
								total: fruits.length,
								selected: selectedItemsCount,
							})}
						</span>
						<div className="inline-flex items-center">
							<Button
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
								{t('group-view.add-button')}
							</Button>
							<Tooltip
								content={t('group-view.delete-group-tooltip')}
								disableHoverableContent={selectedItemsCount === 0}
							>
								<Button
									className="ml-2 hidden md:block"
									disabled={selectedItemsCount === 0}
									size="icon"
									variant="destructive"
									onClick={() => {
										removeMultiple(fruits.map(f => f.id));
									}}
								>
									<Icon name="trash" />
								</Button>
							</Tooltip>
						</div>
					</div>
				}
			>
				{id}
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

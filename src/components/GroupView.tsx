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
import { cn } from '../common/utils';

interface Props {
	groupData: Map<string, FruitItem[]>;
	className?: string;
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
				<List
					className="min-[500px]:grid-cols-2 min-[750px]:grid-cols-3 min-[900px]:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
					data={fruits}
					status="success"
				/>
			</AccordionContent>
		</AccordionItem>
	);
};

export const GroupView = ({ groupData, className }: Props) => {
	const { t } = useTranslation();

	if (groupData.size === 0) {
		return (
			<div className={cn('flex w-full items-center justify-center', className)}>
				<p className="text-lg text-primary">{t('list.no-data')}</p>
			</div>
		);
	}

	return (
		<AccordionRoot
			className={cn('w-full rounded-md bg-background', className)}
			type="multiple"
		>
			{Array.from(groupData.entries()).map(([key, fruits]) => (
				<GroupItem key={key} fruits={fruits} id={key} />
			))}
		</AccordionRoot>
	);
};

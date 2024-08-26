import { useTranslation } from 'react-i18next';
import { useSelectedFruit } from '../hooks/useSelectedFruit';
import { useTotalCalories } from '../hooks/useTotalCalories';
import { Button, Icon } from './ui';
import { canAddFruit } from './utils/helpers';

export const Jar = () => {
	const { selected, add, remove } = useSelectedFruit();
	const { totalCalories } = useTotalCalories();
	const { t } = useTranslation();
	const isEmpty = selected.size === 0;

	return (
		<div className="flex h-full flex-col justify-between p-4 text-center">
			<div>
				<h3 className="text-h3">{t('jar.heading')}</h3>
				{!isEmpty && (
					<ul className="mt-4 divide-y divide-secondary">
						{Array.from(selected.entries()).map(
							([id, { calories, name, count }]) => (
								<li
									key={id}
									className="flex flex-wrap items-center justify-between gap-2 py-2 text-body-sm"
								>
									{t('jar.item', {
										name,
										count,
										totalCalories: count * calories,
									})}
									<div>
										<Button
											className="mr-2 h-8 w-8"
											disabled={canAddFruit(count)}
											size="icon"
											onClick={() => {
												add(id, name, calories);
											}}
										>
											<Icon name="plus" />
										</Button>
										<Button
											className="h-8 w-8"
											size="icon"
											variant="destructive"
											onClick={() => {
												remove(id);
											}}
										>
											<Icon name="minus" />
										</Button>
									</div>
								</li>
							),
						)}
					</ul>
				)}
			</div>
			{isEmpty && (
				<div className="mt-4 text-body-sm font-light text-primary">
					{t('jar.empty')}
				</div>
			)}
			{isEmpty ? (
				<div />
			) : (
				<h4 className="text-h4">{t('jar.total', { totalCalories })}</h4>
			)}
		</div>
	);
};

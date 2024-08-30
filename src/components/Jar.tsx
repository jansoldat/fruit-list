import { useTranslation } from 'react-i18next';
import { cn } from '../common/utils';
import { useSelectedFruit } from '../hooks/useSelectedFruit';
import { useTotalCalories } from '../hooks/useTotalCalories';
import { Button, Icon, Tooltip } from './ui';
import { canAddFruit } from './utils/helpers';

export const Jar = ({ className }: { className?: string }) => {
	const { selected, add, remove, removeAll } = useSelectedFruit();
	const { totalCalories } = useTotalCalories();
	const { t } = useTranslation();
	const isEmpty = selected.size === 0;

	return (
		<div
			className={cn(
				'flex h-full flex-col justify-between p-4 text-center text-primary',
				className,
			)}
		>
			<div>
				<h3 className="text-h3 text-primary">{t('jar.heading')}</h3>
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
				<div className="inline-flex flex-wrap items-center justify-center gap-6">
					<h5 className="text-h5">{t('jar.total', { totalCalories })}</h5>
					<Tooltip content={t('jar.remove-all')}>
						<Button size="icon" variant="destructive" onClick={removeAll}>
							<Icon name="trash" />
						</Button>
					</Tooltip>
				</div>
			)}
		</div>
	);
};

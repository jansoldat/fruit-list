import Skeleton from 'react-loading-skeleton';
import { getAssetUrl } from '~/src/api/assets';
import type { FruitListItemProps } from './types';

export const Picture = ({ isLoading, fruit }: FruitListItemProps) => {
	if (isLoading) {
		return (
			<Skeleton className="max-h-24 object-contain" height={90} width={100} />
		);
	}

	return (
		<img
			alt={fruit.name}
			className="max-h-24 object-contain"
			height={90}
			loading="lazy"
			src={getAssetUrl(fruit.name.toLowerCase())}
			width={100}
		/>
	);
};

export const Title = ({ isLoading, fruit }: FruitListItemProps) => {
	if (isLoading) {
		return <Skeleton className="min-w-20" />;
	}
	return <>{fruit.name}</>;
};

export const Subtitle = ({ isLoading, fruit }: FruitListItemProps) => {
	if (isLoading) {
		return <Skeleton className="min-w-32" />;
	}
	return <>({fruit.nutritions.calories} kcal)</>;
};

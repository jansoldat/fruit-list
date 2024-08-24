import { useRef } from 'react';
import type { FruitItem } from 'src/types';

import { getAssetUrl } from 'src/api/assets';
import { Button } from './ui/Button/Button';

interface Props {
	fruit: FruitItem;
}

export const FruitListItem = ({ fruit }: Props) => {
	const imgRef = useRef<HTMLImageElement>(null);
	return (
		<li className="flex w-full min-w-48 max-w-56 flex-col items-center justify-center rounded-lg bg-muted p-3 shadow-lg">
			<img
				ref={imgRef}
				alt={fruit.name}
				className="max-h-24 object-contain"
				height={90}
				loading="lazy"
				src={getAssetUrl(fruit.name.toLowerCase())}
				width={100}
			/>

			<h5 className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap text-caption">
				{fruit.name}
			</h5>
			<span className="mb-4 mt-1 text-body-sm font-light text-secondary">
				({fruit.nutritions.calories} kcal)
			</span>
			<Button size="full">Add</Button>
		</li>
	);
};

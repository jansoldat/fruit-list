import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '~/src/common/utils';

const toggleGroupItemClasses = cva(
	'flex items-center justify-center bg-background text-primary leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-lg focus:outline-none hover:bg-accent hover:text-primary  data-[state=on]:bg-muted data-[state=on]:text-primary',
	{
		variants: {
			size: {
				text: 'h-10 px-4 py-2',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			size: 'icon',
		},
	},
);

type ToggleGroupProps = ComponentPropsWithoutRef<
	typeof ToggleGroupPrimitive.Item
> &
	VariantProps<typeof toggleGroupItemClasses>;

export const ToggleGroupItem = ({
	size,
	className,
	...props
}: ToggleGroupProps) => {
	return (
		<ToggleGroupPrimitive.Item
			{...props}
			className={cn(toggleGroupItemClasses({ size }), className)}
		/>
	);
};

export const ToggleGroup = ({
	className,
	...props
}: ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>) => (
	<ToggleGroupPrimitive.Root
		{...props}
		className={cn('inline-flex space-x-px rounded shadow-md', className)}
	/>
);

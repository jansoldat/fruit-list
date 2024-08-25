import { Root } from '@radix-ui/react-label';
import {
	forwardRef,
	type ElementRef,
	type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '~/src/common/utils';

interface Props extends ComponentPropsWithoutRef<typeof Root> {
	className?: string;
}

export const Label = forwardRef<ElementRef<typeof Root>, Props>(
	({ className, ...props }, ref) => (
		<Root
			ref={ref}
			className={cn(
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				className,
			)}
			{...props}
		/>
	),
);

Label.displayName = 'Label';

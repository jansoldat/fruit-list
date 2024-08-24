import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../../src/common/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors outline-none focus-visible:ring-2 focus-within:ring-2 ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md',
	{
		variants: {
			variant: {
				default: 'bg-success text-white hover:bg-success/80',
				outline:
					'bg-background hover:bg-gray-100 shadow-lg focus-visible:ring-1 focus-within:ring-1',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				wide: 'px-24 py-5',
				full: 'px-4 py-1 w-full h-10',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				pill: 'px-12 py-3 leading-3',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				{...props}
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
			/>
		);
	},
);
Button.displayName = 'Button';

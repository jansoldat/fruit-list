import React, {
	type ElementRef,
	type ComponentPropsWithoutRef,
	type ReactNode,
} from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { cn } from '~/src/common/utils';
import { Icon } from './Icon';

interface AccordionItemProps
	extends ComponentPropsWithoutRef<typeof Accordion.Item> {
	className?: string;
}
interface AccordionTriggerProps
	extends ComponentPropsWithoutRef<typeof Accordion.Trigger> {
	className?: string;
	controls?: ReactNode;
}
interface AccordionContentProps
	extends ComponentPropsWithoutRef<typeof Accordion.Content> {
	className?: string;
}

const AccordionRoot = React.forwardRef<
	ElementRef<typeof Accordion.Root>,
	ComponentPropsWithoutRef<typeof Accordion.Root>
>(({ children, className, ...props }, forwardedRef) => (
	<Accordion.Root
		{...props}
		ref={forwardedRef}
		className={cn(
			'mt-px overflow-hidden border first:mt-0 first:rounded-t last:rounded-b focus-within:relative',
			className,
		)}
	>
		{children}
	</Accordion.Root>
));

const AccordionItem = React.forwardRef<
	ElementRef<typeof Accordion.Item>,
	AccordionItemProps
>(({ children, className, ...props }, forwardedRef) => (
	<Accordion.Item
		{...props}
		ref={forwardedRef}
		className={cn(
			'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b',
			className,
		)}
	>
		{children}
	</Accordion.Item>
));

const AccordionTrigger = React.forwardRef<
	ElementRef<typeof Accordion.Trigger>,
	AccordionTriggerProps
>(({ children, className, controls, ...props }, forwardedRef) => (
	<Accordion.Header className="relative flex">
		<Accordion.Trigger
			className={cn(
				'group flex flex-1 cursor-pointer items-center border-b bg-muted/30 px-4 py-4 text-lg font-bold text-primary outline-none hover:bg-muted/40',
				className,
			)}
			{...props}
			ref={forwardedRef}
		>
			<Icon
				className="mr-4 text-primary transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
				name="chevron-down"
			/>
			{children}
		</Accordion.Trigger>
		{controls}
	</Accordion.Header>
));

const AccordionContent = React.forwardRef<
	ElementRef<typeof Accordion.Content>,
	AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
	<Accordion.Content
		className={cn(
			'overflow-hidden bg-background data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down',
			className,
		)}
		{...props}
		ref={forwardedRef}
	>
		<div className="px-5 py-[15px]">{children}</div>
	</Accordion.Content>
));

export { AccordionContent, AccordionTrigger, AccordionItem, AccordionRoot };

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ElementRef,
	type FC,
	type PropsWithChildren,
	type ReactNode,
} from 'react';
import { cn } from 'src/common/utils';

const TooltipContent = forwardRef<
	ElementRef<typeof TooltipPrimitive.Content>,
	ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<TooltipPrimitive.Content
		ref={ref}
		sideOffset={sideOffset}
		className={cn(
			'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md border bg-background px-3 py-1.5 text-sm text-primary shadow-md',
			className,
		)}
		{...props}
	/>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface Props extends PropsWithChildren, TooltipPrimitive.TooltipProps {
	content: ReactNode;
}
const Tooltip: FC<Props> = ({ children, content, ...props }) => {
	return (
		<TooltipPrimitive.Provider {...props}>
			<TooltipPrimitive.Tooltip>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipContent>{content}</TooltipContent>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Tooltip>
		</TooltipPrimitive.Provider>
	);
};

Tooltip.displayName = 'Tooltip';

const ConditionalTooltip = ({
	content,
	shouldHide,
	children,
}: PropsWithChildren<{
	shouldHide?: boolean;
	content: ReactNode;
}>) =>
	shouldHide ? (
		<>{children}</>
	) : (
		<Tooltip content={content}>{children}</Tooltip>
	);

ConditionalTooltip.displayName = 'ConditionalTooltip';

export { Tooltip, TooltipContent, ConditionalTooltip };

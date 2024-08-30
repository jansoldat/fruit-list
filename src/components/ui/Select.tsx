import {
	Root,
	Trigger,
	Value,
	Portal,
	Content,
	ScrollUpButton,
	ScrollDownButton,
	Viewport,
	Item,
	ItemIndicator,
	ItemText,
	Icon as SelectIcon,
} from '@radix-ui/react-select';
import { Icon } from './Icon';
import type { ReactNode } from 'react';
import { cn } from '~/src/common/utils';

interface Item {
	label: ReactNode;
	value: string;
}

interface Props<T extends Item, K> {
	items: T[];
	value: K;
	defaultValue: K;
	id: string;
	isDisabled?: boolean;
	onChange: (value: K) => void;
	className?: string;
}

export const Select = <T extends Item>({
	items,
	onChange,
	value,
	id,
	isDisabled,
	className,
}: Props<T, T['value']>) => {
	return (
		<Root disabled={isDisabled} value={value} onValueChange={onChange}>
			<Trigger
				id={id}
				className={cn(
					'hover:secondary inline-flex h-10 w-44 items-center justify-between rounded-md border border-input bg-background px-1 text-sm font-medium leading-none text-primary shadow-md outline-none ring-ring ring-offset-2 focus-within:ring-2 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2',
					className,
				)}
			>
				<Value placeholder="Select a fruit…" />
				<SelectIcon>
					<Icon name="chevron-down" />
				</SelectIcon>
			</Trigger>
			<Portal>
				<Content
					className="relative z-50 max-h-96 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
					position="popper"
				>
					<ScrollUpButton className="py-1">
						<Icon name="chevron-up" />
					</ScrollUpButton>
					<Viewport className="w-44">
						{items.map(item => (
							<Item
								key={item.value}
								className="flex items-center justify-between rounded-sm px-2 py-1 text-sm outline-none focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
								value={item.value}
							>
								<ItemText>{item.label}</ItemText>
								<ItemIndicator>
									<Icon name="check" />
								</ItemIndicator>
							</Item>
						))}
					</Viewport>
					<ScrollDownButton className="py-1">
						<Icon name="chevron-down" />
					</ScrollDownButton>
				</Content>
			</Portal>
		</Root>
	);
};

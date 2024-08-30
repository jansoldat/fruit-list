import * as Dialog from '@radix-ui/react-dialog';
import type { PropsWithChildren, ReactNode } from 'react';
import { Icon } from './Icon';

export const Modal = ({
	triggerElement,
	isOpen,
	children,
	onOpenChange,
}: PropsWithChildren<{
	triggerElement: ReactNode;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}>) => (
	<Dialog.Root modal open={isOpen} onOpenChange={onOpenChange}>
		<Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 bg-primary/80 data-[state=open]:animate-overlayShow" />
			<Dialog.Content className="fixed left-[50%] top-[50%] h-full max-h-[85vh] w-full translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
				{children}
				<Dialog.Close asChild>
					<button
						aria-label="Close"
						className="absolute right-3 top-3 inline-flex appearance-none items-center justify-center text-primary hover:text-primary/80 focus:outline-none"
					>
						<Icon name="cross-2" />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../common/utils';
import { Button, ConditionalTooltip, Modal } from '../components/ui';
import { Jar } from './Jar';

interface Props {
	isEmpty: boolean;
}

export const JarModal = ({ isEmpty }: Props) => {
	const [isOpen, setModalOpen] = useState(false);
	const { t } = useTranslation();
	return (
		<Modal
			isOpen={isOpen}
			triggerElement={
				<div className="fixed bottom-4 right-2 lg:hidden">
					<ConditionalTooltip
						content={t('jar.empty-tooltip')}
						shouldHide={!isEmpty}
					>
						<span className="w-full py-5">
							<Button
								disabled={isEmpty}
								size="lg"
								className={cn({
									'disabled:bg-slate-400 disabled:opacity-100': isEmpty,
								})}
							>
								{t('jar.open')}
							</Button>
						</span>
					</ConditionalTooltip>
				</div>
			}
			onOpenChange={(newOpen: boolean) => {
				if (!isEmpty || !newOpen) {
					setModalOpen(newOpen);
				}
			}}
		>
			<Jar />
		</Modal>
	);
};

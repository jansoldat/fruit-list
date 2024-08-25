import type { FruitItem } from '../types';
import { List } from './List';
import {
	AccordionContent,
	AccordionItem,
	AccordionRoot,
	AccordionTrigger,
} from './ui/Accordion';

interface Props {
	groupData: Map<string, FruitItem[]>;
}

export const GroupView = ({ groupData }: Props) => {
	return (
		<AccordionRoot
			collapsible
			className="rounded-md bg-background"
			defaultValue="item-1"
			type="single"
		>
			{Array.from(groupData.entries()).map(([key, value]) => (
				<AccordionItem key={key} value={key}>
					<AccordionTrigger>
						<span>
							{key}
							<span className="ml-1 font-thin">({value.length})</span>
						</span>
					</AccordionTrigger>
					<AccordionContent>
						<List className="justify-start" data={value} status="success" />
					</AccordionContent>
				</AccordionItem>
			))}
		</AccordionRoot>
	);
};

import clsx from 'clsx';
import type { SVGProps, FC } from 'react';
import type { IconName } from '@/icon-name';
import href from '../ui/icons/sprite.svg';

const sizeClassName = {
	font: 'w-[1em] h-[1em]',
	xs: 'w-3 h-3',
	sm: 'w-4 h-4',
	md: 'w-5 h-5',
	lg: 'w-6 h-6',
	xl: 'w-7 h-7',
} as const;

type Size = keyof typeof sizeClassName;

const childrenSizeClassName = {
	font: 'gap-1.5',
	xs: 'gap-1.5',
	sm: 'gap-1.5',
	md: 'gap-2',
	lg: 'gap-2',
	xl: 'gap-3',
} satisfies Record<Size, string>;

interface IconProps extends SVGProps<SVGSVGElement> {
	name: IconName;
	size?: Size;
}

export const Icon: FC<IconProps> = ({
	name,
	size = 'font',
	className,
	children,
	...props
}) => {
	if (children) {
		return (
			<span
				className={`inline-flex items-center ${childrenSizeClassName[size]}`}
			>
				<Icon {...props} className={className} name={name} size={size} />
				{children}
			</span>
		);
	}
	return (
		<svg
			{...props}
			className={clsx(sizeClassName[size], 'inline self-center', className)}
		>
			<use href={`${href}#${name}`} />
		</svg>
	);
};

Icon.displayName = 'Icon';

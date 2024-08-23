import type { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';

export const Layout = ({ children }: PropsWithChildren) => {
	const year = new Date().getFullYear();

	return (
		<div className="flex min-h-screen flex-col items-center justify-between bg-background">
			<header className="w-full bg-secondary p-4 py-6">
				<Navbar />
			</header>
			<div className="container flex flex-1 py-8">{children}</div>
			<footer className="w-full bg-secondary p-4 text-center">
				<p>[TBD] © {year} Jan Soldát</p>
			</footer>
		</div>
	);
};

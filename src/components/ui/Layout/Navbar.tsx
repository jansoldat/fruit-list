import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

export const Navbar = () => {
	return (
		<nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
			<h4 className="text-h4">🍉🍎🍍 FruitList</h4>
			<div>
				<Tooltip content="Project GitHub Page">
					<a
						className="mr-3 text-3xl"
						href="https://github.com/jansoldat/fruit-list.git"
						target="_blank"
					>
						<Icon name="github-logo" />
					</a>
				</Tooltip>

				<Tooltip content="Author's LinkedIn Page">
					<a
						className="text-3xl text-blue-700"
						href="https://www.linkedin.com/in/jan-soldat68/"
						target="_blank"
					>
						<Icon name="linkedin-logo" />
					</a>
				</Tooltip>
			</div>
		</nav>
	);
};

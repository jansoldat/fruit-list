// import { useTranslation } from 'react-i18next';
import { Layout } from '../components/ui';
import { List } from '../components/List';

export const Home = () => {
	// const { t } = useTranslation();

	return (
		<Layout>
			<main className="flex-1">
				<List />
			</main>
			<aside className="flex-0 bg-blue-400"></aside>
		</Layout>
	);
};

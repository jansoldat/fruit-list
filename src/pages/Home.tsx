import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const Home = () => {
	const { t } = useTranslation();
	const { data } = useQuery({
		queryKey: ["fruitData"],
		queryFn: () => fetch("/api/fruit/all").then((response) => response.json()),
	});

	console.log("🚀 ~ Home ~ data:", data);
	return (
		<div className="flex h-screen flex-col items-center justify-between">
			<header className="w-full bg-muted p-4 py-6">
				<nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
					<h1 className="">[TBD] FRUIT LIST 🍎 </h1>
					<ul className="flex overflow-y-auto overflow-x-hidden">
						<li className="p-1 pr-0">LINK 1</li>
					</ul>
				</nav>
			</header>
			<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center">
				<p className="text-white text-6xl">{t("home.greeting")}</p>
			</div>
		</div>
	);
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
export const Home = () => {
    const { t } = useTranslation();
    const { data } = useQuery({
        queryKey: ["fruitData"],
        queryFn: () => fetch("/api/fruit/all").then((response) => response.json()),
    });
    console.log("🚀 ~ Home ~ data:", data);
    return (_jsxs("div", { className: "flex h-screen flex-col items-center justify-between", children: [_jsx("header", { className: "w-full bg-muted p-4 py-6", children: _jsxs("nav", { className: "flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8", children: [_jsx("h1", { className: "", children: "[TBD] FRUIT LIST \uD83C\uDF4E " }), _jsx("ul", { className: "flex overflow-y-auto overflow-x-hidden", children: _jsx("li", { className: "p-1 pr-0", children: "LINK 1" }) })] }) }), _jsx("div", { className: "bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center", children: _jsx("p", { className: "text-white text-6xl", children: t("home.greeting") }) })] }));
};

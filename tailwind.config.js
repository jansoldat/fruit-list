import defaultTheme from "tailwindcss/defaultTheme.js";
import { extendedTheme } from "./src/extendedTheme";
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            ...extendedTheme,
            fontFamily: {
                sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};

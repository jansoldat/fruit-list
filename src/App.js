import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
const queryClient = new QueryClient();
const App = () => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(Home, {}) }));
};
export default App;

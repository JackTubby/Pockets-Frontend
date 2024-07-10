import { AppProvider } from "./modules/core/utils/app-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes";
import { ThemeProvider } from "./modules/core/utils/theme-context";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </QueryClientProvider>
    </AppProvider>
  );
}

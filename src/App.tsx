import { AppProvider } from './modules/core/utils/app-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Routes from './routes'

const queryClient = new QueryClient();

export default function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </AppProvider>
  )
}

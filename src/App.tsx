import {AuthProvider} from './modules/auth/states/auth-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Routes from './routes'

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </AuthProvider>
  )
}

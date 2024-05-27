import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from './app-provider'

export const ProtectedRoute = () => {
  const { token } = useAppContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default ProtectedRoute
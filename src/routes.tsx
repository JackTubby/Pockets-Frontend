import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './modules/core/utils/protected-route'
import authRoutes from './modules/auth/auth.routes'
import homeRoutes from './modules/home/home.routes'

const Routes = () => {
  const routes = [...authRoutes, ...homeRoutes]

  const publicRoutes = routes.filter((route) => route.isPublic)
  const privateRoutes = routes.filter((route) => !route.isPublic)

  const router = createBrowserRouter([
    ...publicRoutes,
    {
      path: '/',
      element: <ProtectedRoute />,
      children: privateRoutes,
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes

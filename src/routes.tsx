import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./modules/core/utils/protected-route";
import authRoutes from "./modules/auth/auth.routes";
import homeRoutes from "./modules/home/home.routes";
import accountsRoutes from "./modules/accounts/utils/accounts.routes";

const Routes = () => {
  const routes = [...authRoutes, ...homeRoutes, ...accountsRoutes];

  const publicRoutes = routes.filter((route) => route.isPublic);
  const privateRoutes = routes.filter((route) => !route.isPublic);

  let routesPaths = [];
  if (import.meta.env.MODE === "development") {
    routesPaths = [...publicRoutes, ...privateRoutes];
  } else {
    routesPaths = [
      ...publicRoutes,
      {
        path: "/",
        element: <ProtectedRoute />,
        children: privateRoutes,
      },
    ];
  }

  const router = createBrowserRouter(routesPaths);

  return <RouterProvider router={router} />;
};

export default Routes;

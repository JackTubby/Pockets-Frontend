import Login from "./components/login";
import Logout from "./components/logout";

const routes = [
  {
    path: "/login",
    isPublic: true,
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
];

export default routes;

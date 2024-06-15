import Login from "./components/login";
import Logout from "./components/logout";
import Signup from "./components/signup";

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
  {
    path:"/signup",
    isPublic: true,
    element: <Signup />,
  }
];

export default routes;

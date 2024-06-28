import Index from "../components/index";
import CreateAccount from "../components/create-account";

const routes = [
  {
    path: "/accounts",
    isPublic: false,
    element: <Index />,
  },
  {
    path: "/createaccount",
    isPublic: false,
    element: <CreateAccount />,
  },
];

export default routes;

import Index from "../index";
import CreateAccount from "../components/create-account";
// import AccountDetails from "../components/account-details";

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
  // {
  //   path: "/accounts/:id",
  //   isPublic: false,
  //   element: <AccountDetails />,
  // }
];

export default routes;

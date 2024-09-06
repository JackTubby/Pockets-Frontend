import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router";
import ThemeSwitcher from "./theme-switcher";

const Navbar = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Accounts",
      icon: "pi pi-user",
      command: () => navigate("/accounts"),
    }
  ];

  const end = (
    <div className="flex gap-x-6">
      <ThemeSwitcher />
      <button className="p-button p-component p-button-icon-only" onClick={() => navigate("/logout")}>
        <span className="p-button-icon p-c pi pi-sign-out"></span>
      </button>
    </div>
  );

  return <Menubar model={items} end={end} />;
};

export default Navbar;

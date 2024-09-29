import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router";
import { useTheme } from "../utils/theme-context";
import { ToggleButton } from "primereact/togglebutton";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
    },
    {
      label: "Pockets",
      icon: "pi pi-user",
      command: () => navigate("/pockets")
    }
  ];

  const handleThemeChange = () => {
    toggleTheme();
  };

  const end = (
    <div className="flex gap-x-6">
      <button className="p-button p-component p-button-icon-only" onClick={() => navigate("/logout")}>
        <span className="p-button-icon p-c pi pi-sign-out"></span>
      </button>
      <ToggleButton
        onLabel=""
        offLabel=""
        onIcon="pi pi-sun"
        offIcon="pi pi-moon"
        checked={theme === "light" ? true : false}
        onChange={handleThemeChange}
        style={{ fontSize: "10px" }}
      />
    </div>
  );

  return <Menubar model={items} end={end} />;
};

export default Navbar;

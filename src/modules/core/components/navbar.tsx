import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
  ];

  const end = (
    <button
      className="p-button p-component p-button-icon-only"
      onClick={() => navigate("/logout")}
    >
      <span className="p-button-icon p-c pi pi-sign-out"></span>
    </button>
  );

  return <Menubar model={items} end={end} />;
};

export default Navbar;

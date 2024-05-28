import { Menubar } from "primereact/menubar";

const Navbar = () => {
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
  ];

  return <Menubar model={items} />;
};

export default Navbar;

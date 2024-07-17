import { useEffect } from "react";
import useFetchAccounts from "./hooks/useFetchAccounts";
import Navbar from "../core/components/navbar";
import { Card } from "primereact/card";
import AccountCard from "./components/account-card-two";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import { MenuItem } from "primereact/menuitem";

const Index = () => {
  const { fetchAccounts, data: accounts, isLoading, isError, error } = useFetchAccounts();

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const menuItems: MenuItem[] = [
    {
      label: "Create",
      icon: "pi pi-plus",
      command: () => {
        console.log("Create");
      },
    },
    {
      // Make accounts selectable & then confirm deletion
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        console.log("Delete");
      },
    },
  ];

  return (
    <>
      <Navbar />
      <br />
      {/* BANK ACCOUNTS */}
      <div className="overflow-x-auto flex gap-x-6">
        {accounts?.map((account) => (
          <AccountCard key={account.id} data={account} />
        ))}
      </div>
      {/* SUMMARY */}
      <Card title="Summary"></Card>
      <SpeedDial
        model={menuItems}
        radius={60}
        type="quarter-circle"
        direction="up-left"
        className="fixed right-10 bottom-10"
        showIcon="pi pi-bars"
        hideIcon="pi pi-times"
      />
    </>
  );
};

export default Index;

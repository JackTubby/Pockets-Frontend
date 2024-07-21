import { useEffect, useState } from "react";
import useFetchAccounts from "./hooks/useFetchAccounts";
import Navbar from "../core/components/navbar";
import { Card } from "primereact/card";
import AccountCard from "./components/account-card-two";
import { SpeedDial } from "primereact/speeddial";
import { MenuItem } from "primereact/menuitem";
import { Dialog } from "primereact/dialog";
import ReusableForm from "../core/components/form";
import { createInputConfigs, createSchema } from "../core/utils/validation-schema";

const Index = () => {
  const { fetchAccounts, data: accounts, isLoading, isError, error } = useFetchAccounts();
  const [visible, setVisible] = useState(false);

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
        setVisible(true);
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        console.log("Delete");
      },
    },
  ];

  const handleCreate = (data: unknown) => {
    console.log("Form data submitted:", data); // Debug log
  };

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

      {/* CREATE ACCOUNT DIALOG */}
      <Dialog
        header="Create Account"
        style={{ width: "50vw" }}
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <ReusableForm onSubmit={handleCreate} validationSchema={createSchema} inputConfigs={createInputConfigs} />
      </Dialog>
    </>
  );
};

export default Index;

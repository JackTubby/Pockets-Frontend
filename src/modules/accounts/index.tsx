import { useEffect, useState } from "react";
import useFetchAccounts from "./hooks/useFetchAccounts";
import Navbar from "../core/components/navbar";
import AccountCard from "./components/account-card-two";
import { SpeedDial } from "primereact/speeddial";
import { MenuItem } from "primereact/menuitem";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import useCreateAccount from "./hooks/useCreateAccount";
import useAccountTotal from "../core/hooks/useAccountTotal";

const Index = () => {
  const { fetchAccounts, data: accounts, isPending: isAccountsLoading, isError: isAccountsError } = useFetchAccounts();
  const { fetchTotal, data: accountTotal, isPending: isTotalLoading, isError: isTotalError } = useAccountTotal();

  const [visible, setVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [formData, setFormData] = useState({ name: "", balance: "", bankName: "", digits: "", color: "" });
  const { createAccount, isPending } = useCreateAccount();

  useEffect(() => {
    fetchAccounts();
    fetchTotal();
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: "Create",
      icon: "pi pi-plus",
      command: () => setVisible(true),
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => console.log("Delete"),
    },
  ];

  // Update form data as the user types
  const handleInputChange = (e: { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.value);
    setFormData((prevData) => ({
      ...prevData,
      bankName: e.value.code,
    }));
  };

  const handleCreateAccount = () => {
    createAccount(formData);
  };

  // TODO: make this a fetch from the server
  const bankNames = [
    { name: "NatWest", code: "NATWEST" },
    { name: "Nation Wide", code: "NATIONWIDE" },
    { name: "Halifax", code: "HALIFAX" },
    { name: "HSBC", code: "HSBC" },
    { name: "Santander", code: "SANTANDER" },
    { name: "Monzo", code: "MONZO" },
  ];

  return (
    <div className="container my-4 mx-auto">
      <Navbar />
      <br />
      <h1 className="text-3xl">Bank Accounts</h1>
      <br />
      <div className="flex gap-x-2">
        <p className="text-xl font-bold">Total:</p>
        {isTotalLoading ? (
          <p>Loading...</p>
        ) : isTotalError ? (
          <p>Error fetching total balance</p>
        ) : (
          <p className="text-xl font-lg">£{accountTotal?.total || "0"}</p>
        )}
      </div>
      <br />
      {/* BANK ACCOUNTS */}
      <div className="overflow-x-auto flex gap-x-6">
        {isAccountsLoading ? (
          <p>Loading accounts...</p>
        ) : isAccountsError ? (
          <p>Error: {isAccountsError}</p>
        ) : accounts?.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">No accounts found</div>
        ) : (
          accounts?.map((account) => <AccountCard key={account.id} data={account} />)
        )}
      </div>

      {/* MENU */}
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
      <Dialog header="Create Account" style={{ width: "50vw" }} visible={visible} onHide={() => setVisible(false)}>
        <div className="flex flex-col gap-y-4">
          <InputText name="name" value={formData.name} onChange={handleInputChange} placeholder="Account Name" />
          <InputText name="balance" value={formData.balance} onChange={handleInputChange} placeholder="Balance" />
          <Dropdown
            value={selectedBank}
            onChange={handleBankChange}
            options={bankNames}
            optionLabel="name"
            placeholder="Select a Bank"
          />
          <InputText name="digits" value={formData.digits} onChange={handleInputChange} placeholder="Digits" />
          <InputText name="color" value={formData.color} onChange={handleInputChange} placeholder="Color" />
          <Button onClick={handleCreateAccount} label="Create" disabled={isPending} />
        </div>
      </Dialog>
    </div>
  );
};

export default Index;

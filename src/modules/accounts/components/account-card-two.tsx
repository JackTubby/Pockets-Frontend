import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useEditAccount from "../hooks/useEditAccount";

interface Account {
  id: string;
  data: {
    bankName: string;
    name: string;
    balance: string;
    digits: string;
    color: string;
  };
}

const AccountCards = (account: Account) => {
  const { editAccount, isPending } = useEditAccount();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(account.data);

  const handleClick = () => {
    setVisible(true);
  };

  const handleInputChange = (e: { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBankChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      bankName: e.value.code,
    }));
  };

  const handleEditAccount = () => {
    editAccount(formData);
    setVisible(false);
  };

  // TODO: Replace this with a fetch from the server if needed
  const bankNames = [
    { name: "NatWest", code: "NATWEST" },
    { name: "Nation Wide", code: "NATIONWIDE" },
    { name: "Halifax", code: "HALIFAX" },
    { name: "HSBC", code: "HSBC" },
    { name: "Santander", code: "SANTANDER" },
    { name: "Monzo", code: "MONZO" },
  ];

  const selectedBank = bankNames.find((bank) => bank.code === formData.bankName);

  return (
    <>
      {/* EDIT ACCOUNT DIALOG */}
      <Dialog header="Edit Account" style={{ width: "50vw" }} visible={visible} onHide={() => setVisible(false)}>
        <h1>{formData.name}</h1>
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
          <Button onClick={handleEditAccount} label="Update" disabled={isPending} />
        </div>
      </Dialog>
      {/* ACCOUNT INDIVIDUAL CARD */}
      <Card
        onClick={handleClick}
        className="min-w-[420px] md:w-[30rem] flex flex-col my-6 hover:cursor-pointer hover:shadow-lg hover:bg-highlight"
      >
        <div className="flex gap-x-2 h-full">
          <div className="w-[1rem] bg-red-500"></div>
          <div className="flex flex-col justify-between h-full gap-y-2 p-4">
            <div className="flex gap-x-4 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBkW0cqU0FCIoWOvAiuqdnt6WCRkxiBRNUgA&s"
                alt="bank logo"
                width="50px"
                height="50px"
                className="border rounded-xl"
              />
              <h2>{formData.bankName}</h2>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base w-[10rem]">Account Name:</span>
              <span className="text-lg font-bold">{formData.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base w-[10rem]">Current Balance:</span>
              <span className="text-lg font-bold">£{formData.balance}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base w-[10rem]">Last Four Digits:</span>
              <span className="text-lg font-bold">**** **** **** {formData.digits}</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AccountCards;

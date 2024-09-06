import { useState } from "react";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { createInputConfigs, updateInputConfigs, createSchema, updateSchema } from "../../core/utils/validation-schema";

interface Account {
  id: string;
  data: {
    bankName: string;
    name: string;
    balance: number;
    digits: number;
  };
}

const AccountCards = (account: Account) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleUpdate = (data: unknown) => {
    console.log("Update:", data);
  };
  return (
    <>
      {/* CREATE ACCOUNT DIALOG */}
      <Dialog
        header="Edit Account"
        style={{ width: "50vw" }}
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <h1>{account.data.name}</h1>
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
              <h2>{account.data.bankName}</h2>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base w-[10rem]">Account Name:</span>
              <span className="text-lg font-bold">{account.data.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base w-[10rem]">Current Balance:</span>
              <span className="text-lg font-bold">£{account.data.balance}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base w-[10rem]">Last Four Digits:</span>
              <span className="text-lg font-bold">**** **** **** {account.data.digits}</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AccountCards;

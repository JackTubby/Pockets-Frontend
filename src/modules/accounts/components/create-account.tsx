import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import useCreateAccount from "../hooks/useCreateAccount";

const CreateAccount: React.FC = () => {
  const { createAccount } = useCreateAccount();
  const [formData, setFormData] = useState({
    balance: "",
    digits: "",
    name: "",
    color: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createAccount(formData);
  };

  return (
    <div>
      <div>
        <h2>Add Account</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <InputText
            type="text"
            id="name"
            className="w-full"
            value={formData.name}
            autoComplete="off"
            required
            onChange={handleChange}
          />

          <label htmlFor="digits">Digits</label>
          <InputText
            type="text"
            id="digits"
            className="w-full"
            value={formData.digits}
            autoComplete="off"
            required
            onChange={handleChange}
          />

          <label htmlFor="balance">Balance</label>
          <InputText
            type="text"
            id="balance"
            className="w-full"
            value={formData.balance}
            autoComplete="off"
            required
            onChange={handleChange}
          />

          <label htmlFor="color">Color</label>
          <InputText
            type="text"
            id="color"
            className="w-full"
            value={formData.color}
            autoComplete="off"
            required
            onChange={handleChange}
          />
        </div>
      </form>
      <div>
        <Button label="Submit" className="w-full" />
      </div>
    </div>
  );
};

export default CreateAccount;

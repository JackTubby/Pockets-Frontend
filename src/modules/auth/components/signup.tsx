import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import useSignup from "../hooks/useSignup";

const SignUp: React.FC = () => {
  const { signup } = useSignup();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.id, e.target.value);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    signup(formData);
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center">Sign Up</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="username">Username</label>
            <InputText
              type="text"
              id="username"
              className="w-full"
              value={formData.username}
              autoComplete="off"
              required
              onChange={handleChange}
            />

            <label htmlFor="firstName">First Name</label>
            <InputText
              type="text"
              id="firstName"
              className="w-full"
              value={formData.firstName}
              autoComplete="off"
              required
              onChange={handleChange}
            />

            <label htmlFor="lastName">Last Name</label>
            <InputText
              type="text"
              id="lastName"
              className="w-full"
              value={formData.lastName}
              autoComplete="off"
              required
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <InputText
              type="text"
              id="email"
              className="w-full"
              value={formData.email}
              autoComplete="off"
              required
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={formData.password}
              feedback={false}
              autoComplete="off"
              inputClassName="w-full"
              className="w-full"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button label="Submit" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

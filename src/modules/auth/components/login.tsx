import React, { useState, ChangeEvent } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import useSignIn from "../hooks/useSignIn";

const Login: React.FC = () => {
  const { signIn } = useSignIn();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.id, e.target.value);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn(formData);
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <InputText
              type="text"
              id="username"
              className="w-full"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="password"
              className="w-full"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              required
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

export default Login;

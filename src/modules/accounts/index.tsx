import { useEffect } from "react";
import useFetchAccounts from "./hooks/useFetchAccounts";
import Navbar from "../core/components/navbar";
import { Card } from "primereact/card";

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

  return (
    <>
      <Navbar />
      <br />
      {/* BANK ACCOUNTS */}
      <div className="overflow-x-auto flex gap-x-6">
        {accounts?.map((account) => (
          <Card key={account.id} className="min-w-[420px] md:w-[30rem] flex flex-col my-6 hover:cursor-pointer hover:shadow-lg hover:bg-highlight">
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
                  <h2>{account.bankName}</h2>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base w-[10rem]">Account Name:</span>
                  <span className="text-lg font-bold">{account.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base w-[10rem]">Current Balance:</span>
                  <span className="text-lg font-bold">£{account.balance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base w-[10rem]">Last Four Digits:</span>
                  <span className="text-lg font-bold">**** **** **** {account.digits}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* SUMMARY */}
      <Card title="Summary"></Card>
    </>
  );
};

export default Index;

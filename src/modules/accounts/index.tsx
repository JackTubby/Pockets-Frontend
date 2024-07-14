import { useEffect } from "react";
import useFetchAccounts from "./hooks/useFetchAccounts";
import Navbar from "../core/components/navbar";
import { Card } from "primereact/card";
import AccountCard from "./components/account-card-two";

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
          <AccountCard key={account.id} data={account} />
        ))}
      </div>
      {/* SUMMARY */}
      <Card title="Summary"></Card>
    </>
  );
};

export default Index;

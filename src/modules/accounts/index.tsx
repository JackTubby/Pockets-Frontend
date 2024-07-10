import { useEffect } from "react";
import useFetchAccounts from "./hooks/useFetchAccounts";
import Navbar from "../core/components/navbar";
import { DataView } from "primereact/dataview";

const Index = () => {
  const { fetchAccounts, data: accounts, isLoading, isError, error } = useFetchAccounts();

  const listItemTemplate = (account) => {
    return (
      <div className="p-col-12 p-md-3">
        <div>
          <h3>{account.bankName}</h3>
          <p>Account Holder: {account.name}</p>
          <p>Balance: {account.balance}</p>
          <p>Last Updated: {new Date(account.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    );
  };

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
      <DataView value={accounts || []} itemTemplate={listItemTemplate} layout="list" paginator rows={5} />
    </>
  );
};

// IDEAS:
/**
 * 1. We could have an accounts slider (overflow) with cards of all the accounts essentially like we have in the home page.
 * Then a plus button where we could create more sliders below to group accounts if we wanted to.
 * Maybe have more details in the cards than the home page we do not want it to similar as it would seem pointless
 * Below the cards/sliders we could have some details/charts of the account data
 */

export default Index;

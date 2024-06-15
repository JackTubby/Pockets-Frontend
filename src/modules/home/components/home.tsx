import Navbar from "../../core/components/navbar";
import AccountCard from "../../accounts/components/account-card";
import PocketCard from "../../pockets/components/pocket-card";

interface HomeProps {
  // Add any props you need for your component here
}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="flex flex-col gap-y-4">
    <Navbar />
    <div className="flex justify-between gap-x-4">
      <AccountCard />
      <AccountCard />
      <AccountCard />
      <AccountCard />
    </div>
    <div>
      <h1>Pockets</h1>
      <div className="flex justify-between gap-x-4">
        <PocketCard />
        <PocketCard />
      </div>
    </div>
    </section>
  );
};

export default Home;

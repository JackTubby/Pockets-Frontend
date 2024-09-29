import Navbar from "../core/components/navbar";
import PocketCard from "./components/pocket-card";

const Index = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <h1>Welcome to your Pockets!</h1>
        <div className="flex flex-col gap-y-4">
        <PocketCard details={{name: "Pocket name", balance: "500", message: "You are 5% away from your target"}}  />
        <PocketCard details={{name: "Pocket name", balance: "500", message: "You are 5% away from your target"}}  />
        <PocketCard details={{name: "Pocket name", balance: "500", message: "You are 5% away from your target"}}  />
        <PocketCard details={{name: "Pocket name", balance: "500", message: "You are 5% away from your target"}}  />
        </div>
      </div>
    </>
  );
};

export default Index;

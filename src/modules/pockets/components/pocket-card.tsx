import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";

interface details {
  details: {
    name: string;
    balance: string;
    message: string;
  };
}

const PocketCard: React.FC<details> = ({ details }) => {
  const { name, balance, message } = details;
  const icon = "🏦";
  return (
    <Card className="w-[100%] relative pb-4 cursor-pointer hover:shadow-2xl hover:shadow-gray-900">
      <div className="flex justify-between">
        <div>
          <h2>{icon}</h2>
          <h1>{name}</h1>
        </div>
        <img src="https://via.placeholder.com/500" alt="" className="rounded-full" width={120} height={120} />
      </div>
      <p className="font-bold text-xl">{balance}</p>
      <p>{message}</p>
      <ProgressBar value={50}></ProgressBar>
    </Card>
  );
};

export default PocketCard;

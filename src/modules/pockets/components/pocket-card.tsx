import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";

const PocketCard: React.FC = () => {
  const icon = "🏦";
  return (
    <Card className="w-[100%] relative pb-4">
      <div className="flex justify-between">
        <div>
          <h2>{icon}</h2>
          <h1>House Savings 2022</h1>
        </div>
        <img src="https://via.placeholder.com/500" alt="" className="rounded-full" width={120} height={120} />
      </div>
      <p className="font-bold text-xl">£1,000.00</p>
      <p>Achieved 5% of your £300 goal!</p>
      <ProgressBar value={50}></ProgressBar>
    </Card>
  );
};

export default PocketCard;

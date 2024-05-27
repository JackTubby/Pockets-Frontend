import React from "react";
import { Card } from "primereact/card";

const AccountCard: React.FC = () => {
  const icon = "🏦";
  return (
    <Card title={`${icon} NatWest`} className="w-[100%] relative pb-4">
      <p className="text-center font-bold text-xl">£1,000.00</p>
      <p className="absolute">Digital Regular Saver | **** **** **** 1234</p>
    </Card>
  );
};

export default AccountCard;

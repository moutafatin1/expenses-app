import { fn } from "../../utils/fn";

const iconBgColors = {
  pink: "bg-pink-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
};

type StatsCardProps = {
  title: string;
  amount: number;
  icon: React.ReactNode;
  color: keyof typeof iconBgColors;
};

export const StatsCard = ({ amount, title, icon, color }: StatsCardProps) => {
  return (
    <div className="flex  flex-1 flex-col justify-between rounded-lg bg-white p-8 shadow-lg">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-medium text-gray-600">{title}</span>
          <span className="text-2xl font-bold text-gray-900">
            ${amount.toFixed(2)}
          </span>
        </div>
        <div
          className={fn(
            "flex h-20 w-20 items-center justify-center rounded-full  text-4xl text-white",
            iconBgColors[color]
          )}
        >
          {icon}
        </div>
      </div>
      <p className="text-gray-500">Different stats for the future...</p>
    </div>
  );
};

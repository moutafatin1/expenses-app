import { fn } from "@utils/fn";
import { GiExpense, GiTakeMyMoney } from "react-icons/gi";
import { RiBankCardFill } from "react-icons/ri";

const variants = {
  expense: {
    color: "bg-pink-500",
    icon: <GiExpense />,
  },
  income: {
    color: "bg-green-500",
    icon: <GiTakeMyMoney />,
  },
  balance: {
    color: "bg-blue-500",
    icon: <RiBankCardFill />,
  },
};
export type StatsCardType = keyof typeof variants;

type StatsCardProps = {
  title: string;
  amount: number;

  variant: StatsCardType;
};

export const StatsCard = ({
  amount,
  title,

  variant,
}: StatsCardProps) => {
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
            variants[variant].color
          )}
        >
          {variants[variant].icon}
        </div>
      </div>
      <p className="text-gray-500">Different stats for the future...</p>
    </div>
  );
};

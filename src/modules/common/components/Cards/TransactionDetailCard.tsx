import { fn } from "@utils/fn";

type TransactionDetailCardProps = {
  name: string;
  categoryName: string;
  emoji: string;
  amount: number;
  date: string;
  type: string;
};

export const TransactionDetailCard = ({
  amount,
  categoryName,
  type,
  emoji,
  date,
  name,
}: TransactionDetailCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white py-4 px-8">
      <div className="flex items-center gap-10">
        <span className="flex  flex-col items-center">
          <span className="text-3xl">{emoji}</span>
          {/* <span className="text-sm text-gray-600">{categoryName}</span> */}
        </span>
        <div className="flex flex-col">
          <span className="text-xl font-medium capitalize text-gray-700">
            {name}
          </span>
          <span className="text-gray-500">{date}</span>
        </div>
      </div>
      <span
        className={fn(
          "text-2xl font-bold",
          type === "expense" && "text-red-500",
          type === "income" && "text-green-500"
        )}
      >
        {type === "income" ? "+" : "-"}${amount}
      </span>
    </div>
  );
};

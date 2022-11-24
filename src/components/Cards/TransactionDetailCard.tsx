type TransactionDetailCardProps = {
  name: string;
  categoryName: string;
  emoji: string;
  amount: number;
  date: string;
};

export const TransactionDetailCard = ({
  amount,
  categoryName,
  emoji,
  date,
  name,
}: TransactionDetailCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white py-4 px-8">
      <div className="flex items-center gap-10">
        <span className="text-3xl">{emoji}</span>
        <div className="flex flex-col">
          <span className="text-xl font-medium text-gray-700">{name}</span>
          <span className="text-gray-500">{date}</span>
        </div>
      </div>
      <span className="text-2xl font-bold text-red-500">-${amount}</span>
    </div>
  );
};

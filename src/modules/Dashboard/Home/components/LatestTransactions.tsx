import { TransactionDetailCard } from "@modules/common/components/Cards/TransactionDetailCard";
import { Spinner } from "@modules/common/components/Elements";
import { trpc } from "@utils/trpc";

export const LatestTransactions = () => {
  const {
    data: transactions,
    error,
    isLoading,
  } = trpc.transactions.getLatestTransactions.useQuery();

  if (isLoading)
    return <Spinner className="mx-auto text-7xl text-purple-500" />;
  return (
    <div className="mt-8 flex flex-col gap-4">
      <h2 className="pb-4 text-3xl font-bold text-gray-800">
        Latest 5 Transactions
      </h2>

      {transactions?.map((transaction) => (
        <TransactionDetailCard
          key={transaction.id}
          type={transaction.type}
          name={transaction.type}
          amount={transaction.amount}
          categoryName={transaction.category.name}
          emoji={transaction.category.emoji}
          date={transaction.createdAt.toLocaleDateString()}
        />
      ))}
    </div>
  );
};

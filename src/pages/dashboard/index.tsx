import type { ReactElement } from "react";
import { GiExpense, GiTakeMyMoney } from "react-icons/gi";
import { RiBankCardFill } from "react-icons/ri";
import { StatsCard } from "../../components/Cards/StatsCard";
import { TransactionDetailCard } from "../../components/Cards/TransactionDetailCard";
import { LineChart } from "../../components/Charts/LineChart";
import { PieChart } from "../../components/Charts/PieChart";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import { trpc } from "../../utils/trpc";
import type { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  const {
    data: userStats,
    isError: isErrorUserStats,
    isLoading: loadingUserStats,
  } = trpc.user.getStats.useQuery();
  const {
    data: transactions,
    error: transactionsError,
    isLoading: loadingTransactions,
  } = trpc.transactions.getLatestTransactions.useQuery();
  if (loadingUserStats) return <p>loading...</p>;
  if (isErrorUserStats) return <p>error...</p>;
  return (
    <div className=" p-8">
      <div className="flex flex-wrap gap-4">
        <StatsCard
          title="Total Income"
          amount={userStats.totalIncome}
          color="pink"
          icon={<GiTakeMyMoney />}
        />
        <StatsCard
          title="Total Expense"
          amount={userStats.totalExpense}
          color="green"
          icon={<GiExpense />}
        />
        <StatsCard
          title="Balance"
          amount={userStats.balance}
          color="blue"
          icon={<RiBankCardFill />}
        />
      </div>
      <div className="mt-12 flex flex-col items-center gap-4 overflow-x-clip lg:flex-row">
        <div className="h-96 w-full  min-w-0 ">
          <LineChart />
        </div>
        <div className="h-96 w-full min-w-0  lg:w-1/2">
          <PieChart />
        </div>
      </div>
      {/* Latest transactions */}
      <div className="mt-8 flex flex-col gap-4">
        <h2 className="pb-4 text-3xl font-bold text-gray-800">
          Latest 5 Transactions
        </h2>

        {loadingTransactions && <p>Loading Latest transactions...</p>}
        {transactionsError && (
          <p>
            Error Loading Latest transactions... {transactionsError.message}
          </p>
        )}
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
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

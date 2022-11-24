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
  const { data, isError, isLoading } = trpc.user.getStats.useQuery();
  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>error...</p>;
  return (
    <div className=" p-8">
      <div className="flex flex-wrap gap-4">
        <StatsCard
          title="Total Income"
          amount={data.totalIncome}
          color="pink"
          icon={<GiTakeMyMoney />}
        />
        <StatsCard
          title="Total Expense"
          amount={data.totalExpense}
          color="green"
          icon={<GiExpense />}
        />
        <StatsCard
          title="Balance"
          amount={data.balance}
          color="blue"
          icon={<RiBankCardFill />}
        />
      </div>
      <div className="mt-12 flex flex-col items-center gap-4 lg:flex-row">
        <div className="h-96 w-full   lg:w-1/2">
          <PieChart />
        </div>
        <div className="h-96 w-full min-w-0 overflow-x-clip">
          <LineChart />
        </div>
      </div>
      {/* Latest transactions */}
      <div className="mt-8 flex flex-col gap-4">
        <h2 className="pb-4 text-3xl font-bold text-gray-800">
          Latest Transactions
        </h2>
        <TransactionDetailCard
          name="Udemy Course"
          amount={9.99}
          categoryName="Education"
          emoji="📚"
          date={new Date().toLocaleDateString()}
        />
        <TransactionDetailCard
          name="Udemy Course"
          amount={9.99}
          categoryName="Education"
          emoji="📚"
          date={new Date().toLocaleDateString()}
        />
        <TransactionDetailCard
          name="Udemy Course"
          amount={9.99}
          categoryName="Education"
          emoji="📚"
          date={new Date().toLocaleDateString()}
        />
      </div>
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

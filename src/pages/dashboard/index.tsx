import type { ReactElement } from "react";
import { GiExpense, GiTakeMyMoney } from "react-icons/gi";
import { RiBankCardFill } from "react-icons/ri";
import { StatsCard } from "../../components/Cards/StatsCard";
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
    <div className="h-full  p-8">
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
        <div className="h-96 w-full min-w-0">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

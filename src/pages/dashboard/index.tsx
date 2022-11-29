import { StatsCard } from "@modules/common/components/Cards/StatsCard";
import { TransactionDetailCard } from "@modules/common/components/Cards/TransactionDetailCard";
import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { LineChart } from "@modules/Dashboard/Charts/LineChart";
import { PieChart } from "@modules/Dashboard/Charts/PieChart";
import { LatestTransactions } from "@modules/Dashboard/Home/components/LatestTransactions";
import { trpc } from "@utils/trpc";
import type { ReactElement } from "react";
import { GiExpense, GiTakeMyMoney } from "react-icons/gi";
import { RiBankCardFill } from "react-icons/ri";
import type { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  const {
    data: userStats,
    isError: isErrorUserStats,
    isLoading: loadingUserStats,
  } = trpc.user.getStats.useQuery();

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
          isLoading={loadingUserStats}
        />
        <StatsCard
          title="Total Expense"
          amount={userStats.totalExpense}
          color="green"
          icon={<GiExpense />}
          isLoading={loadingUserStats}

        />
        <StatsCard
          title="Balance"
          amount={userStats.balance}
          color="blue"
          icon={<RiBankCardFill />}
          isLoading={loadingUserStats}

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
      <LatestTransactions/>
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

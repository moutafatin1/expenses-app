import type { ReactElement } from "react";
import { GiExpense, GiTakeMyMoney } from "react-icons/gi";
import { RiBankCardFill } from "react-icons/ri";
import { StatsCard } from "../../components/Cards/StatsCard";
import { LineChart } from "../../components/Charts/LineChart";
import { PieChart } from "../../components/Charts/PieChart";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import type { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div className="h-full  p-8">
      <div className="flex flex-wrap gap-4">
        <StatsCard
          title="Income"
          amount={1445.55}
          color="pink"
          icon={<GiTakeMyMoney />}
        />
        <StatsCard
          title="Expense"
          amount={145.15}
          color="green"
          icon={<GiExpense />}
        />
        <StatsCard
          title="Balance"
          amount={5555.55}
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

import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { LineChart } from "@modules/Dashboard/Charts/LineChart";
import { PieChart } from "@modules/Dashboard/Charts/PieChart";
import { LatestTransactions } from "@modules/Dashboard/Home/components/LatestTransactions";
import { UserStats } from "@modules/Dashboard/Home/components/UserStats";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div className=" p-8">
      <UserStats />
      <div className="mt-12 flex flex-col items-center gap-4 overflow-x-clip lg:flex-row">
        <div className="h-96 w-full  min-w-0">
          <LineChart />
        </div>
        <div className="h-96 w-full min-w-0  lg:w-1/2">
          <PieChart />
        </div>
      </div>
      <LatestTransactions />
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

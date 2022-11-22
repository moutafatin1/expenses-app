import type { ReactElement } from "react";
import { LineChart } from "../../components/Charts/LineChart";
import { PieChart } from "../../components/Charts/PieChart";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import type { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div className="h-full  p-8">
      <div className="flex items-center gap-4">
        <div className="h-40 flex-1 rounded-md bg-gray-300"></div>
        <div className="h-40 flex-1 rounded-md bg-gray-300"></div>
        <div className="h-40 flex-1 rounded-md bg-gray-300"></div>
      </div>
      <div className="mt-16 flex items-center gap-4">
        <div className="h-96 w-1/3 border-2">
          <PieChart />
        </div>
        <div className="h-96 w-full">
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

import type { ReactElement } from "react";
import { LineChart } from "../../components/Charts/LineChart";
import { PieChart } from "../../components/Charts/PieChart";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import type { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div className="h-full  p-8">
      <div className="flex flex-wrap  items-center gap-4">
        <div className="h-40  flex-1 rounded-md bg-gray-300"></div>
        <div className="h-40  flex-1 rounded-md bg-gray-300"></div>
        <div className="h-40  flex-1 rounded-md bg-gray-300"></div>
      </div>
      <div className="mt-12 flex flex-col items-center gap-4 lg:flex-row">
        <div className="h-96 w-full  border-2 lg:w-1/2">
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

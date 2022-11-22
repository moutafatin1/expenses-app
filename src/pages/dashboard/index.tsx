import type { ReactElement } from "react";
import { LineChart } from "../../components/Charts/LineChart";
import { PieChart } from "../../components/Charts/PieChart";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import type { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div className="h-full  p-8">
      <div className="grid  grid-cols-6  gap-4">
        <div className="col-span-6 h-40  rounded-md bg-gray-300 md:col-span-3 lg:col-span-2"></div>
        <div className="col-span-6 h-40  rounded-md bg-gray-300 md:col-span-3 lg:col-span-2"></div>
        <div className="col-span-6 h-40  rounded-md bg-gray-300 md:col-span-3 lg:col-span-2"></div>
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

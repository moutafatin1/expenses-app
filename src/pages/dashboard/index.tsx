import type { ReactElement } from "react";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import type { NextPageWithLayout } from "../_app";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Home Dashboard</h1>
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

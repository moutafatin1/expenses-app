import type { ReactElement } from "react";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import type { NextPageWithLayout } from "../_app";

const CategoriesPage: NextPageWithLayout = () => {
  return <div>CategoriesPage</div>;
};

export default CategoriesPage;
CategoriesPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

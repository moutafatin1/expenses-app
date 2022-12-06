import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import type { ReactElement } from "react";

const TransactionsPage = () => {
  return <div>TransactionsPage</div>;
};

export default TransactionsPage;

TransactionsPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

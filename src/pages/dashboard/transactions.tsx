import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { AddNewTransaction } from "@modules/Dashboard/Transactions/components/AddNewTransaction";
import { TransactionsList } from "@modules/Dashboard/Transactions/components/TransactionsList";
import type { ReactElement } from "react";

const TransactionsPage = () => {
  return (
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      <AddNewTransaction />
      <TransactionsList />
    </div>
  );
};

export default TransactionsPage;

TransactionsPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

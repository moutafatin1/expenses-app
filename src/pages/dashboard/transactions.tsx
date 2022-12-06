import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { AddNewTransaction } from "@modules/Dashboard/Transactions/components/AddNewTransaction";
import { TransactionsList } from "@modules/Dashboard/Transactions/components/TransactionsList";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import type { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

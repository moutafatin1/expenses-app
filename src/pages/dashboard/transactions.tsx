import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { useUpdateDialog } from "@modules/Dashboard/Categories/hooks/useUpdateCategory";
import { AddNewTransaction } from "@modules/Dashboard/Transactions/components/AddNewTransaction";
import { TransactionFormData } from "@modules/Dashboard/Transactions/components/TransactionBaseForm";
import { TransactionsList } from "@modules/Dashboard/Transactions/components/TransactionsList";
import { UpdateTransaction } from "@modules/Dashboard/Transactions/components/UpdateTransaction";
import type { Transaction } from "@prisma/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";

const TransactionsPage = () => {
  const {
    closeUpdateDialog,
    dataToUpdate: transaction,
    openUpdateDialog,
    updateDialogIsOpen,
  } = useUpdateDialog<TransactionFormData>();
  return (
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      <AddNewTransaction />
      <UpdateTransaction
        close={closeUpdateDialog}
        isOpen={updateDialogIsOpen}
        transaction={transaction}
      />
      <TransactionsList openUpdateDialog={openUpdateDialog} />
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

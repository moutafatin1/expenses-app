import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { CategoriesList } from "@modules/Dashboard/Categories";
import { AddNewFormDialog } from "@modules/Dashboard/Categories/components/AddNewFormDialog";
import { UpdateFormDialog } from "@modules/Dashboard/Categories/components/UpdateFormDialog";
import { useUpdateCategory } from "@modules/Dashboard/Categories/hooks/useUpdateCategory";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";

const CategoriesPage = () => {
  const {
    categoryToUpdate,
    closeUpdateDialog,
    openUpdateDialog,
    updateDialogIsOpen,
  } = useUpdateCategory();

  return (
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      <AddNewFormDialog />
      <UpdateFormDialog
        category={categoryToUpdate}
        close={closeUpdateDialog}
        isOpen={updateDialogIsOpen}
      />
      <CategoriesList openUpdateDialog={openUpdateDialog} />
    </div>
  );
};

export default CategoriesPage;
CategoriesPage.getLayout = (page: ReactElement) => {
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

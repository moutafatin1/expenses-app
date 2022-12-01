import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { CategoriesList } from "@modules/Dashboard/Categories";
import { AddNewFormDialog } from "@modules/Dashboard/Categories/components/AddNewFormDialog";
import { UpdateFormDialog } from "@modules/Dashboard/Categories/components/UpdateFormDialog";
import type { Category } from "@prisma/client";
import type { ReactElement } from "react";
import { useState } from "react";

const CategoriesPage = () => {
  const [categoryToUpdate, setCategoryToUpdate] = useState<Category>();
  const closeUpdateDialog = () => {
    setCategoryToUpdate(undefined);
  };
  const openUpdateDialog = (category: Category) => {
    setCategoryToUpdate(category);
  };

  const updateDialogIsOpen = categoryToUpdate !== undefined;
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

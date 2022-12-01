import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import {
  CategoriesList,
  UpdateCategoryDialogProvider,
} from "@modules/Dashboard/Categories";
import { AddNewFormDialog } from "@modules/Dashboard/Categories/components/AddNewFormDialog";
import { UpdateFormDialog } from "@modules/Dashboard/Categories/components/UpdateFormDialog";
import type { ReactElement } from "react";

const CategoriesPage = () => {
  return (
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      <AddNewFormDialog />
      <UpdateCategoryDialogProvider>
        <UpdateFormDialog />
        <CategoriesList />
      </UpdateCategoryDialogProvider>
    </div>
  );
};

export default CategoriesPage;
CategoriesPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

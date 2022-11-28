import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { CategoriesList } from "@modules/Dashboard/Categories";
import { AddNewCategoryForm } from "@modules/Dashboard/Categories/AddNewCategoryForm";
import type { ReactElement } from "react";
import { useState } from "react";

export type FormMode = {
  mode?: "add" | "update";
  id?: string;
};

const CategoriesPage = () => {
  const [formMode, setFormMode] = useState<FormMode>();

  const openAddForm = () => {
    setFormMode({ mode: "add" });
  };
  return (
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      <AddNewCategoryForm formMode={formMode} setFormMode={setFormMode} />
      <CategoriesList setFormMode={setFormMode} />
    </div>
  );
};

export default CategoriesPage;
CategoriesPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

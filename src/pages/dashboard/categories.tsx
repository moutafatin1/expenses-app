import type { ReactElement } from "react";
import { useState } from "react";
import { CategoriesList } from "../../components/Dashboard/Categories";
import { AddNewCategoryForm } from "../../components/Dashboard/Categories/AddNewCategoryForm";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";

export type FormMode = {
  mode?: "add" | "update";
  id?: string;
};

const CategoriesPage = () => {
  const [formMode, setFormMode] = useState<FormMode>();
  console.log(
    "🚀 ~ file: categories.tsx ~ line 14 ~ CategoriesPage ~ formMode",
    formMode
  );
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

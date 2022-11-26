import type { ReactElement } from "react";
import { useState } from "react";
import { CategoriesList } from "../../components/Dashboard/Categories";
import { AddNewCategoryForm } from "../../components/Dashboard/Categories/AddNewCategoryForm";
import Button from "../../components/Elements/Button/Button";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";



const CategoriesPage = () => {

  return (
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      
      <AddNewCategoryForm />
      <CategoriesList />
    </div>
  );
};

export default CategoriesPage;
CategoriesPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { CategoriesList } from "@modules/Dashboard/Categories";
import { CategoryForm } from "@modules/Dashboard/Categories/CategoryForm";
import { CategoryFormProvider } from "@modules/Dashboard/Categories/context";
import type { ReactElement } from "react";

const CategoriesPage = () => {
  return (
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      <CategoryFormProvider>
        <CategoryForm />
        <CategoriesList />
      </CategoryFormProvider>
    </div>
  );
};

export default CategoriesPage;
CategoriesPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

import { ConfirmationDialog } from "@modules/common/components/ConfirmationDialog/ConfirmationDialog";
import Button from "@modules/common/components/Elements/Button/Button";
import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import {
  CategoriesList,
  CategoryForm,
  CategoryFormProvider,
} from "@modules/Dashboard/Categories";
import type { ReactElement } from "react";

const CategoriesPage = () => {
  return (
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      <ConfirmationDialog
        icon="info"
        title="Delete Category"
        body="Are you sure to delete ths category?"
        triggerButton={(open: () => void) => (
          <Button onClick={open} variant="danger">
            Delete Category
          </Button>
        )}
        confirmButton={
          <Button
            variant="danger"
            className="flex-1 whitespace-nowrap"
            onClick={() => console.log("deleted")}
          >
            Delete Category
          </Button>
        }
      />
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

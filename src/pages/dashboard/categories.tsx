import type { ReactElement } from "react";
import Button from "../../components/Elements/Button/Button";
import { InputField } from "../../components/Forms";
import { SidebarLayout } from "../../components/Layouts/SidebarLayout";
import type { NextPageWithLayout } from "../_app";

const CategoriesPage: NextPageWithLayout = () => {
  return (
    <div className="max-w-xs p-16">
      <Button >Test</Button>
      <InputField />
    </div>
  );
};

export default CategoriesPage;
CategoriesPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

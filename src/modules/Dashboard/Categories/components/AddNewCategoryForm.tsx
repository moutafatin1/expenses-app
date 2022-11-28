import { Transition } from "@headlessui/react";
import Button from "@modules/common/components/Elements/Button/Button";
import { trpc } from "@utils/trpc";
import type { SubmitHandler } from "react-hook-form";
import type { categoryFormData } from "../categorySchema";
import { useCategoryFormContext } from "../context";
import { CategoryBaseForm } from "./CategoryBaseForm";

export const AddNewCategoryForm = () => {
  const { openAddForm, closeForm, isAddMode } = useCategoryFormContext();

  const utils = trpc.useContext();
  const addNewCategoryMutation = trpc.category.createNewCategory.useMutation();
  const onSubmit: SubmitHandler<categoryFormData> = (data) => {
    addNewCategoryMutation.mutate(data, {
      onSuccess: () => {
        utils.category.getCategories.invalidate();
        closeForm();
      },
    });
  };

  return (
    <>
      <Button onClick={openAddForm} className="my-2 ml-auto">
        Add new Category
      </Button>
      <Transition
        as="div"
        show={isAddMode}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100 h-48"
        leaveTo="opacity-0 h-0"
      >
        {isAddMode && <CategoryBaseForm onSubmit={onSubmit} />}
      </Transition>
    </>
  );
};

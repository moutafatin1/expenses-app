import { Transition } from "@headlessui/react";
import { trpc } from "@utils/trpc";
import type { SubmitHandler } from "react-hook-form";
import type { categoryFormData } from "../categorySchema";
import { useCategoryFormContext } from "../context";
import { CategoryBaseForm } from "./CategoryBaseForm";

export const UpdateCategoryForm = () => {
  const { isUpdateMode, closeForm, categoryId } = useCategoryFormContext();
  const { data: categoryToUpdate } = trpc.category.byId.useQuery(categoryId, {
    enabled: categoryId !== undefined,
  });

  const utils = trpc.useContext();
  const updateCategoryMutation = trpc.category.update.useMutation();
  const onSubmit: SubmitHandler<categoryFormData> = (data) => {
    if (categoryId === undefined) return;
    updateCategoryMutation.mutate(
      { ...data, id: categoryId },
      {
        onSuccess: () => {
          utils.category.getCategories.invalidate();
          closeForm();
        },
      }
    );
  };

  return (
    <>
      <Transition
        as="div"
        show={isUpdateMode}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100 h-48"
        leaveTo="opacity-0 h-0"
      >
        {isUpdateMode && (
          <CategoryBaseForm
            onSubmit={onSubmit}
            defaultValues={{
              categoryName: categoryToUpdate?.name,
              emoji: categoryToUpdate?.emoji,
            }}
          />
        )}
      </Transition>
    </>
  );
};

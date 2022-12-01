import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@modules/common/components/Elements/Dialog/Dialog";
import { trpc } from "@utils/trpc";
import type { SubmitHandler } from "react-hook-form";
import type { categoryFormData } from "../categorySchema";
import { useUpdateCategory } from "../context";
import { CategoryBaseForm } from "./CategoryBaseForm";

// type UpdateCategoryFormProps = {};

export const UpdateFormDialog = () => {
  const { close, isOpen, category } = useUpdateCategory();
  const utils = trpc.useContext();
  // const { data: categoryToUpdate } = trpc.category.byId.useQuery(categoryId);
  const updateCategoryMutation = trpc.category.update.useMutation();
  const onSubmit: SubmitHandler<categoryFormData> = (data) => {
    if (category === undefined) return;
    updateCategoryMutation.mutate(
      { ...data, id: category.id },
      {
        onSuccess: () => {
          utils.category.getCategories.invalidate();
          close();
        },
      }
    );
  };

  return (
    <>
      <Dialog isOpen={isOpen} onClose={close}>
        <DialogPanel className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 text-left">
          <DialogTitle className="text-xl font-medium text-gray-600">
            Update Category
          </DialogTitle>
          <CategoryBaseForm
            mode="update"
            onSubmit={onSubmit}
            closeDialog={close}
            defaultValues={{
              categoryName: category?.name,
              emoji: category?.emoji,
            }}
          />
        </DialogPanel>
      </Dialog>
    </>
  );
};

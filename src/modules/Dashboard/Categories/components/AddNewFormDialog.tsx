import Button from "@modules/common/components/Elements/Button/Button";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@modules/common/components/Elements/Dialog/Dialog";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { categoryFormData } from "../categorySchema";
import { CategoryBaseForm } from "./CategoryBaseForm";

export const AddNewFormDialog = () => {
  // const { openAddForm, closeForm, isAddMode } = useCategoryFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const utils = trpc.useContext();
  const addNewCategoryMutation = trpc.category.createNewCategory.useMutation();
  const onSubmit: SubmitHandler<categoryFormData> = (data) => {
    addNewCategoryMutation.mutate(data, {
      onSuccess: () => {
        utils.category.all.invalidate();
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="my-2 ml-auto">
        Add new Category
      </Button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogPanel className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 text-left">
          <DialogTitle className="text-xl font-medium text-gray-600">
            Create new Category
          </DialogTitle>
          <CategoryBaseForm
            mode="add"
            onSubmit={onSubmit}
            closeDialog={() => {
              setIsOpen(false);
            }}
          />
        </DialogPanel>
      </Dialog>
    </>
  );
};

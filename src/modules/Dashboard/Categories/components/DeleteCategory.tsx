import { ConfirmationDialog } from "@modules/common/components/ConfirmationDialog/ConfirmationDialog";
import Button from "@modules/common/components/Elements/Button/Button";
import { trpc } from "@utils/trpc";
import { HiTrash } from "react-icons/hi";

type DeleteCategoryProps = {
  id: string;
};

export const DeleteCategory = ({ id }: DeleteCategoryProps) => {
  const utils = trpc.useContext();
  const deleteCategoryMutation = trpc.category.deleteById.useMutation();
  const deleteCategory = () => {
    deleteCategoryMutation.mutate(id, {
      onSuccess: () => {
        utils.category.getCategories.invalidate();
      },
    });
  };
  return (
    <ConfirmationDialog
      isDone={deleteCategoryMutation.isSuccess}
      icon="danger"
      title="Are you sure to delete this category?"
      body="Deleting this category will delete all the transactions associated with it."
      triggerButton={(open: () => void) => (
        <button
          onClick={open}
          className="rounded-full bg-red-400 p-2 text-xl text-white transition-opacity hover:opacity-75"
        >
          <HiTrash />
        </button>
      )}
      confirmButton={
        <Button variant="danger" onClick={deleteCategory}>
          Delete
        </Button>
      }
    />
  );
};

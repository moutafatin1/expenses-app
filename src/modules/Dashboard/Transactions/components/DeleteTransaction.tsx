import { ConfirmationDialog } from "@modules/common/components/ConfirmationDialog/ConfirmationDialog";
import Button from "@modules/common/components/Elements/Button/Button";
import { trpc } from "@utils/trpc";
import { HiTrash } from "react-icons/hi";

type DeleteTransactionProps = {
  id: string;
};

export const DeleteTransaction = ({ id }: DeleteTransactionProps) => {
  const utils = trpc.useContext();
  const deleteTransactionMutation = trpc.transactions.deleteById.useMutation();

  const deleteTransaction = () => {
    deleteTransactionMutation.mutate(id, {
      onSuccess: () => {
        utils.transactions.all.invalidate();
      },
    });
  };
  return (
    <ConfirmationDialog
         isDone={deleteTransactionMutation.isSuccess}
      icon="danger"
      title="Are you sure to delete this transaction?"
      triggerButton={(open) => (
        <button
          onClick={open}
          className="rounded-full bg-red-400 p-2 text-xl text-white transition-opacity hover:opacity-75"
        >
          <HiTrash />
        </button>
      )}
      confirmButton={
        <Button variant="danger" onClick={deleteTransaction}>
          Delete
        </Button>
      }
    />
  );
};

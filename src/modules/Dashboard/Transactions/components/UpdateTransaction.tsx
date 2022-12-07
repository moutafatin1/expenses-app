import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@modules/common/components/Elements/Dialog/Dialog";
import { trpc } from "@utils/trpc";
import type { TransactionFormData } from "./TransactionBaseForm";
import { TransactionBaseForm } from "./TransactionBaseForm";

type UpdateTransactionProps = {
  transaction?: TransactionFormData;
  isOpen: boolean;
  close: () => void;
};

export const UpdateTransaction = ({
  close,
  isOpen,
  transaction,
}: UpdateTransactionProps) => {
  const utils = trpc.useContext();
  const updateTransactionMutation = trpc.transactions.update.useMutation();
  const onSubmit = (data: TransactionFormData) => {
    console.log("🚀 ~ file: UpdateTransaction.tsx:24 ~ onSubmit ~ data", data);
    if (!data.id) {
      return;
    }
    updateTransactionMutation.mutate(
      {
        transactionId: data.id,
        type: data.type as "expense" | "income",
        amount: data.amount,
      },
      {
        onSuccess: () => {
          utils.transactions.all.invalidate();
        },
      }
    );
    close();
  };
  return (
    <Dialog isOpen={isOpen} onClose={close}>
      <DialogPanel className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 text-left">
        <DialogTitle className="text-xl font-medium text-gray-600">
          Update Transaction
        </DialogTitle>
        <TransactionBaseForm
          mode="update"
          onSubmit={onSubmit}
          closeDialog={close}
          defaultValues={transaction}
        />
      </DialogPanel>
    </Dialog>
  );
};

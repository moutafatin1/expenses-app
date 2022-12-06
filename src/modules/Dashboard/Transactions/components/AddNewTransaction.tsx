import Button from "@modules/common/components/Elements/Button/Button";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@modules/common/components/Elements/Dialog/Dialog";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import type { TransactionFormData } from "./TransactionBaseForm";
import { TransactionBaseForm } from "./TransactionBaseForm";

export const AddNewTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const utils = trpc.useContext();

  const addNewTransactionMutation = trpc.transactions.new.useMutation();

  const onSubmit = (data: TransactionFormData) => {
    addNewTransactionMutation.mutate(
      {
        amount: data.amount,
        type: data.type as "expense" | "income",
        categoryId: data.category.id,
      },
      {
        onSuccess: () => {
          utils.transactions.all.invalidate();
        },
      }
    );

    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="my-2 ml-auto">
        Add new Transaction
      </Button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogPanel className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 text-left">
          <DialogTitle className="text-xl font-medium text-gray-600">
            Add new Transaction
          </DialogTitle>
          <TransactionBaseForm
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

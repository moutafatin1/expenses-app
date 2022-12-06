import Button from "@modules/common/components/Elements/Button/Button";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@modules/common/components/Elements/Dialog/Dialog";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { TransactionFormData } from "../transactionSchema";
import { TransactionBaseForm } from "./TransactionBaseForm";

export const AddNewTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<TransactionFormData> = (data) => {
    console.log(data);
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

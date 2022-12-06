import Button from "@modules/common/components/Elements/Button/Button";
import { InputField } from "@modules/common/components/Forms";
import type { Category } from "@prisma/client";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { CategoriesListBox } from "./CategoriesListBox";

type TransactionBaseFormProps = {
  onSubmit: (data: TransactionFormData) => void;
  defaultValues?: Partial<TransactionFormData>;
  mode: "add" | "update";
  closeDialog: () => void;
};

export type TransactionFormData = {
  category: Partial<Category>;
  type: string;
  amount: string;
};

export const TransactionBaseForm = ({
  onSubmit,
  mode,
  closeDialog,
}: TransactionBaseFormProps) => {
  const [transactionForm, setTransactionForm] = useState({
    category: {} as Partial<Category>,
    type: "expense",
    amount: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransactionForm((old) => ({ ...old, [e.target.name]: e.target.value }));
    console.log("target name", e.target.name);
  };

  const setCategory = (category?: Category) => {
    if (!category) return;
    setTransactionForm((old) => ({ ...old, category }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(transactionForm);
  };
  return (
    <form onSubmit={handleSubmit} className=" flex  flex-col gap-4">
      <CategoriesListBox
        category={transactionForm.category}
        setCategory={setCategory}
      />
      <div className="space-y-2">
        <label className="font-medium capitalize text-gray-700">Type</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="expense"
            onChange={handleInputChange}
            className="h-5 w-5 text-violet-500 focus:ring-violet-500"
            checked={transactionForm.type === "expense"}
          />
          <span className="font-medium capitalize text-gray-700">expense</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            onChange={handleInputChange}
            value="income"
            className="h-5 w-5 text-violet-500 focus:ring-violet-500"
            checked={transactionForm.type === "income"}
          />
          <span className="font-medium capitalize text-gray-700">Income</span>
        </label>
      </div>
      <InputField
        label="Amount"
        name="amount"
        type="number"
        //   errorMessage={errors?.emoji?.message}
        placeholder="Transaction amount"
        onChange={handleInputChange}
        value={transactionForm.amount}
        required
      />
      <div className="flex items-center gap-4">
        <Button type="submit" className="ml-auto w-28">
          {mode === "add" ? "Add" : "Update"}
        </Button>

        <Button
          onClick={closeDialog}
          type="button"
          variant="outline"
          className="w-28 "
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

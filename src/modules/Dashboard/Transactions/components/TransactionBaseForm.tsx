import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@modules/common/components/Elements/Button/Button";
import { InputField } from "@modules/common/components/Forms";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { TransactionFormData } from "../transactionSchema";
import { transactionFormSchema } from "../transactionSchema";
import { CategoriesListBox } from "./CategoriesListBox";

type TransactionBaseFormProps = {
  onSubmit: SubmitHandler<TransactionFormData>;
  defaultValues?: Partial<TransactionFormData>;
  mode: "add" | "update";
  closeDialog: () => void;
};

export const TransactionBaseForm = ({
  onSubmit,
  defaultValues,
  mode,
  closeDialog,
}: TransactionBaseFormProps) => {
  // const { isAddMode, closeForm } = useCategoryFormContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
  });
  useEffect(() => {
    if (!defaultValues) return;

    reset(defaultValues);
  }, [reset, defaultValues]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex  flex-col gap-4">
      {/* <InputField
        label="Type"
        //   errorMessage={errors?.categoryName?.message}
        placeholder="Transaction type ex: income"
        {...register("type")}
      /> */}

      <CategoriesListBox />
      <div className="space-y-2">
        <label className="font-medium capitalize text-gray-700">Type</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="expense"
            className="h-5 w-5 text-violet-500 focus:ring-violet-500"
            defaultChecked
          />
          <span className="font-medium capitalize text-gray-700">expense</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="income"
            className="h-5 w-5 text-violet-500 focus:ring-violet-500"
          />
          <span className="font-medium capitalize text-gray-700">Income</span>
        </label>
      </div>
      <InputField
        label="Amount"
        //   errorMessage={errors?.emoji?.message}
        placeholder="Transaction amount"
        {...register("amount")}
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

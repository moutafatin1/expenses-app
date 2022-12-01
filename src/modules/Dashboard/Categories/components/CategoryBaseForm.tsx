import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@modules/common/components/Elements/Button/Button";
import { InputField } from "@modules/common/components/Forms";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { categoryFormData } from "../categorySchema";
import { categoryFormSchema } from "../categorySchema";

type CategoryBaseFormProps = {
  onSubmit: SubmitHandler<categoryFormData>;
  defaultValues?: Partial<categoryFormData>;
  mode: "add" | "update";
  closeDialog: () => void;
};

export const CategoryBaseForm = ({
  onSubmit,
  defaultValues,
  mode,
  closeDialog,
}: CategoryBaseFormProps) => {
  // const { isAddMode, closeForm } = useCategoryFormContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<categoryFormData>({
    resolver: zodResolver(categoryFormSchema),
  });
  useEffect(() => {
    if (!defaultValues) return;

    reset(defaultValues);
  }, [reset, defaultValues]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex  flex-col gap-4">
      <InputField
        label="Category Name"
        errorMessage={errors?.categoryName?.message}
        placeholder="Travel..."
        {...register("categoryName")}
      />
      <InputField
        label="Emoji"
        errorMessage={errors?.emoji?.message}
        placeholder="Pick an emoji"
        {...register("emoji")}
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

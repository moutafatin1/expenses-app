import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@modules/common/components/Elements/Button/Button";
import { InputField } from "@modules/common/components/Forms";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { categoryFormData } from "../categorySchema";
import { categoryFormSchema } from "../categorySchema";
import { useCategoryFormContext } from "../context";

type CategoryBaseFormProps = {
  onSubmit: SubmitHandler<categoryFormData>;
  defaultValues?: Partial<categoryFormData>;
};

export const CategoryBaseForm = ({
  onSubmit,
  defaultValues,
}: CategoryBaseFormProps) => {
  const { isAddMode, closeForm } = useCategoryFormContext();
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full  max-w-md flex-col gap-4 rounded-lg bg-gray-200 p-4"
    >
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
          {isAddMode ? "Add" : "Update"}
        </Button>

        <Button
          onClick={closeForm}
          type="button"
          variant="outline"
          className="w-28 border-red-400 text-red-400"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

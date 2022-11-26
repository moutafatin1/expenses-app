import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import Button from "../../Elements/Button/Button";
import { InputField } from "../../Forms";

export const newCategorySchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
  emoji: z.string().min(1, "Emoji is required"),
});

type FormData = z.infer<typeof newCategorySchema>;

export const AddNewCategoryForm = () => {
  const [addFormIsOpen, setAddFormIsOpen] = useState(false);
  const queryUtils = trpc.useContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newCategorySchema),
  });
  const addNewCategoryMutation = trpc.category.createNewCategory.useMutation();
  const onSubmit = handleSubmit((data) => {
    addNewCategoryMutation.mutate(data, {
      onSuccess: () => {
        queryUtils.category.getCategories.invalidate();
        setAddFormIsOpen(false);
        reset({ categoryName: "", emoji: "" });
      },
    });
  });
  const closeForm = () => {
    setAddFormIsOpen(false);
  };
  const openForm = () => {
    setAddFormIsOpen(true);
  };

  return (
    <>
      <Button onClick={openForm} className="my-2 ml-auto">
        Add new Category
      </Button>
      {addFormIsOpen && (
        <form
          onSubmit={onSubmit}
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
              Add
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
      )}
    </>
  );
};

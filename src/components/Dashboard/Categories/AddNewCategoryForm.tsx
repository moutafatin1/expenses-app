import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { FormMode } from "../../../pages/dashboard/categories";
import { trpc } from "../../../utils/trpc";
import Button from "../../Elements/Button/Button";
import { InputField } from "../../Forms";

export const newCategorySchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
  emoji: z.string().min(1, "Emoji is required"),
});

type FormData = z.infer<typeof newCategorySchema>;

type AddNewCategoryFormProps = {
  formMode?: FormMode;
  setFormMode: Dispatch<SetStateAction<FormMode | undefined>>;
};

export const AddNewCategoryForm = ({
  formMode,
  setFormMode,
}: AddNewCategoryFormProps) => {
  const queryUtils = trpc.useContext();
  const { data: categoryToUpdate } = trpc.category.byId.useQuery(formMode?.id, {
    enabled: formMode?.id !== undefined,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      categoryName: "",
      emoji: "",
    },
  });
  const addNewCategoryMutation = trpc.category.createNewCategory.useMutation();
  const updateCategoryMutation = trpc.category.update.useMutation();
  const onSubmit = handleSubmit((data) => {
    if (formMode?.mode === "add") {
      addNewCategoryMutation.mutate(data, {
        onSuccess: () => {
          queryUtils.category.getCategories.invalidate();
          setFormMode(undefined);
          reset({ categoryName: "", emoji: "" });
        },
      });
    } else if (formMode?.mode === "update" && formMode.id) {
      updateCategoryMutation.mutate(
        { ...data, id: formMode.id },
        {
          onSuccess: () => {
            queryUtils.category.getCategories.invalidate();
            setFormMode(undefined);
            reset({ categoryName: "", emoji: "" });
          },
        }
      );
    }
  });
  useEffect(() => {
    if (categoryToUpdate) {
      reset({
        categoryName: categoryToUpdate?.name,
        emoji: categoryToUpdate?.emoji,
      });
      return;
    }
    reset({ categoryName: "", emoji: "" });
  }, [categoryToUpdate, reset]);
  const closeForm = () => {
    setFormMode(undefined);
  };
  const openForm = () => {
    setFormMode({ mode: "add" });
  };

  const addFormMode = formMode?.mode === "add";

  return (
    <>
      <Button onClick={openForm} className="my-2 ml-auto">
        Add new Category
      </Button>
      <Transition
        as="div"
        show={formMode !== undefined}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100 h-64"
        leaveTo="opacity-0 h-0"
      >
        {formMode && (
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
                {addFormMode ? "Add" : "Update"}
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
      </Transition>
    </>
  );
};

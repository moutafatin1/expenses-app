import type { Category } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import type { FormMode } from "src/pages/dashboard/categories";
import { trpc } from "src/utils/trpc";

type CategoryRowProps = {
  category: Category;
  formMode?: FormMode;
  setFormMode: Dispatch<SetStateAction<FormMode | undefined>>;
};

export const CategoryRow = ({ category, setFormMode }: CategoryRowProps) => {
  const utils = trpc.useContext();
  const categoryDeleteMutation = trpc.category.deleteById.useMutation();
  const deleteCategory = () => {
    categoryDeleteMutation.mutate(category.id, {
      onSuccess: () => {
        utils.category.getCategories.invalidate();
      },
    });
  };
  return (
    <tr key={category.id}>
      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-3xl font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6 sm:text-4xl">
        {category.emoji}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
        {category.name}
      </td>

      <td className="flex  items-center justify-end gap-2 py-4 pl-3  pr-4 sm:pr-6">
        <button
          onClick={() => setFormMode({ mode: "update", id: category.id })}
          className="rounded-full bg-sky-400 p-2 text-xl text-white transition-opacity hover:opacity-75"
        >
          <HiPencil />
        </button>
        <button
          onClick={deleteCategory}
          className="rounded-full bg-red-400 p-2 text-xl text-white transition-opacity hover:opacity-75"
        >
          <HiTrash />
        </button>
      </td>
    </tr>
  );
};

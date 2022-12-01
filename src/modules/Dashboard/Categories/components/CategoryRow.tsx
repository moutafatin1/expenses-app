import type { Category } from "@prisma/client";
import { HiPencil } from "react-icons/hi";
import { DeleteCategory } from "./DeleteCategory";

type CategoryRowProps = {
  category: Category;
  openUpdateDialog: (category: Category) => void;
};

export const CategoryRow = ({
  category,
  openUpdateDialog,
}: CategoryRowProps) => {
  // const { openUpdateDialog } = useUpdateCategory();

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
          onClick={() => openUpdateDialog(category)}
          className="rounded-full bg-sky-400 p-2 text-xl text-white transition-opacity hover:opacity-75"
        >
          <HiPencil />
        </button>
        <DeleteCategory id={category.id} />
      </td>
    </tr>
  );
};

import { HiPencil, HiTrash } from "react-icons/hi";
import { trpc } from "../../../utils/trpc";

export const CategoriesList = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = trpc.category.getCategories.useQuery();
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>loading...</p>;
  return (
    <div className="-mx-4 mt-8 overflow-hidden rounded-xl  shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 ">
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-8"
            >
              Emoji
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Name
            </th>

            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-3xl font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6 sm:text-4xl">
                {category.emoji}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {category.name}
              </td>

              <td className="flex  items-center justify-end gap-2 py-4 pl-3  pr-4 sm:pr-6">
                <button className="rounded-full bg-sky-400 p-2 text-xl text-white">
                  <HiPencil />
                </button>
                <button className="rounded-full bg-red-400 p-2 text-xl text-white">
                  <HiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

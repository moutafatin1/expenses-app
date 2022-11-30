import { Spinner } from "@modules/common/components/Elements";
import { trpc } from "src/utils/trpc";
import { CategoryRow } from "./CategoryRow";

export const CategoriesList = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = trpc.category.getCategories.useQuery();
  if (isLoading)
    return (
      <Spinner
        show={isLoading}
        delay={400}
        className="mx-auto text-7xl text-purple-500"
      />
    );
  if (error) return <p>{error.message}</p>;
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
            <CategoryRow key={category.id} category={category} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

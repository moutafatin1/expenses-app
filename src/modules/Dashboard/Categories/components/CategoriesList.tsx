import { Spinner } from "@modules/common/components/Elements";
import type { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "src/utils/trpc";
import { CategoryRow } from "./CategoryRow";

type CategoriesListProps = {
  openUpdateDialog: (category: Category) => void;
};

export const CategoriesList = ({ openUpdateDialog }: CategoriesListProps) => {
  const [page, setPage] = useState(1);
  const utils = trpc.useContext();
  const {
    data: categories,
    error,
    isLoading,
    isPreviousData,
  } = trpc.category.all.useQuery(
    { page: page },
    { keepPreviousData: true, staleTime: 5000 }
  );

  useEffect(() => {
    if (!isPreviousData) {
      utils.category.all.prefetch({ page: page + 1 });
    }
  }, [page, isPreviousData, utils]);
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
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
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
            <CategoryRow
              openUpdateDialog={openUpdateDialog}
              key={category.id}
              category={category}
            />
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing
            <span className="mx-1 font-medium">1</span>
            to
            <span className="mx-1 font-medium">10</span>
            of
            <span className="mx-1 font-medium">20</span>
            results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((old) => old + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
};

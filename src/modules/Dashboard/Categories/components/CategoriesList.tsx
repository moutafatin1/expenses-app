import { Spinner } from "@modules/common/components/Elements";
import { Pagination } from "@modules/common/components/Pagination/Pagination";
import type { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "src/utils/trpc";
import { CategoryRow } from "./CategoryRow";

type CategoriesListProps = {
  openUpdateDialog: (category: Category) => void;
};

export const getPaginationMetadata = ({
  limit,
  total,
  page,
}: {
  limit: number;
  total: number;
  page: number;
}) => {
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, total);
  return { startIndex, endIndex };
};

export const CategoriesList = ({ openUpdateDialog }: CategoriesListProps) => {
  const [page, setPage] = useState(1);
  const utils = trpc.useContext();
  const { data, error, isLoading, isPreviousData } = trpc.category.all.useQuery(
    { page: page },
    { keepPreviousData: true, staleTime: 5000 }
  );
  // prefetch next page
  useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      utils.category.all.prefetch({ page: page + 1 });
    }
  }, [page, isPreviousData, utils, data?.hasMore]);
  if (isLoading)
    return (
      <Spinner
        show={isLoading}
        delay={400}
        className="mx-auto text-7xl text-purple-500"
      />
    );
  if (error) return <p>{error.message}</p>;

  const { endIndex, startIndex } = getPaginationMetadata({
    page,
    limit: data.size,
    total: data.totalRowCount,
  });
  const setNextPage = () => {
    setPage((old) => (data.hasMore ? old + 1 : old));
  };
  const setPreviousPage = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

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
          {data.categories.map((category) => (
            <CategoryRow
              openUpdateDialog={openUpdateDialog}
              key={category.id}
              category={category}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        isPrevious={page !== 1}
        isNext={data.hasMore}
        metaData={{
          endIndex,
          startIndex,
          total: data.totalRowCount,
        }}
        nextPage={setNextPage}
        previousPage={setPreviousPage}
      />
    </div>
  );
};

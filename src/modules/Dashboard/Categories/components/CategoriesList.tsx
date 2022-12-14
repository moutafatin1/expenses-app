import { Spinner } from "@modules/common/components/Elements";
import { Menu } from "@modules/common/components/Elements/Menu/Menu";
import { InputField } from "@modules/common/components/Forms";
import { Pagination } from "@modules/common/components/Pagination/Pagination";
import { useDebounce } from "@modules/common/hooks";
import { getPaginationMetadata } from "@modules/common/utils";
import type { Category } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CategoryRow } from "./CategoryRow";

type CategoriesListProps = {
  openUpdateDialog: (category: Category) => void;
};

export const CategoriesList = ({ openUpdateDialog }: CategoriesListProps) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const utils = trpc.useContext();
  const { data, error, isLoading, isPreviousData } = trpc.category.all.useQuery(
    {
      size: 5,
      page: page,
      searchTerm: debouncedSearchTerm,
      sort: (router.query["sort"] as "usage" | "new" | undefined) ?? undefined,
    },
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
    <>
      <div className="flex items-center justify-between">
        <InputField
          className="w-24 sm:w-36 lg:w-64"
          placeholder="Search..."
          label="Search"
          value={search}
          startIcon={<AiOutlineSearch />}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Menu />
      </div>
      <div className="-mx-4 mt-4 overflow-hidden rounded-xl  shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 ">
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
    </>
  );
};

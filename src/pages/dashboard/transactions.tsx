import { Spinner } from "@modules/common/components/Elements";
import { SidebarLayout } from "@modules/common/Layouts/SidebarLayout";
import { TransactionRow } from "@modules/Dashboard/Transactions/components/TransactionRow";
import { trpc } from "@utils/trpc";
import type { ReactElement } from "react";

const TransactionsPage = () => {
  const { data, error, isLoading } = trpc.transactions.all.useQuery();

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
    <div className="mt-24 flex flex-col justify-end px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-4 overflow-hidden rounded-xl  shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 ">
        <table className="min-w-full divide-y divide-gray-300 ">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-8"
              >
                Category
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
              >
                Amount
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
        {/* <Pagination
    isPrevious={page !== 1}
    isNext={data.hasMore}
    metaData={{
      endIndex,
      startIndex,
      total: data.totalRowCount,
    }}
    nextPage={setNextPage}
    previousPage={setPreviousPage}
  /> */}
      </div>
    </div>
  );
};

export default TransactionsPage;

TransactionsPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

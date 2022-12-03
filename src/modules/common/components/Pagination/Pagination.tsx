type PaginationProps = {
  metaData: {
    startIndex: number;
    endIndex: number;
    total: number;
  };
  isPrevious: boolean;
  isNext: boolean;
  nextPage: () => void;
  previousPage: () => void;
};

export const Pagination = ({
  isNext,
  isPrevious,
  nextPage,
  previousPage,
  metaData: { endIndex, startIndex, total },
}: PaginationProps) => {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing
          <span className="mx-1 font-medium">{startIndex}</span>
          to
          <span className="mx-1 font-medium">{endIndex}</span>
          of
          <span className="mx-1 font-medium">{total}</span>
          results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          disabled={!isPrevious}
          onClick={previousPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:hover:bg-inherit"
        >
          Previous
        </button>
        <button
          disabled={!isNext}
          onClick={nextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:hover:bg-inherit"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

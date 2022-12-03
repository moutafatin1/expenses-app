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
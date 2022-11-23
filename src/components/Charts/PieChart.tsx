import { ResponsivePie } from "@nivo/pie";
import { trpc } from "../../utils/trpc";

export const PieChart = () => {
  const { data, isError, isLoading } =
    trpc.transactions.getExpensesByCategory.useQuery();

  if (isError) return <p>Error...</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
      innerRadius={0.7}
      padAngle={1}
      cornerRadius={20}
      isInteractive={true}
      activeOuterRadiusOffset={5}
    />
  );
};

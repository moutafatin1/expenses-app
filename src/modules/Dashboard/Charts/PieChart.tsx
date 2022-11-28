import { ResponsivePie } from "@nivo/pie";
import { trpc } from "@utils/trpc";

export const PieChart = () => {
  const { data, isError, isLoading } =
    trpc.transactions.getExpensesByCategory.useQuery();

  if (isError) return <p>Error...</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      arcLinkLabel="label"
      innerRadius={0.7}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 40,
          itemWidth: 100,
          itemHeight: 20,
          itemsSpacing: 0,
          symbolSize: 20,
          itemDirection: "left-to-right",
        },
      ]}
      arcLabelsSkipAngle={45}
      arcLinkLabelsDiagonalLength={10}
      arcLinkLabelsStraightLength={1}
      padAngle={1}
      cornerRadius={20}
      isInteractive={true}
      activeOuterRadiusOffset={5}
    />
  );
};

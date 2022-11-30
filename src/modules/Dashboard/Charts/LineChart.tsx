import { Spinner } from "@modules/common/components/Elements";
import { ResponsiveLine } from "@nivo/line";
import { trpc } from "@utils/trpc";

export const LineChart = () => {
  const { data, isError, isLoading } =
    trpc.transactions.getIncomeAndExpensesChartLineData.useQuery();

  if (isError) return <p>Error...</p>;
  if (isLoading)
    return (
      <Spinner
        show={isLoading}
        delay={400}
        className="mx-auto text-7xl text-purple-500"
      />
    );
  return (
    <ResponsiveLine
      data={data}
      curve="natural"
      lineWidth={3}
      isInteractive={true}
      useMesh={true}
      margin={{ top: 10, right: 60, bottom: 30, left: 60 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day",
      }}
      xFormat="time:%Y-%m-%d"
      axisLeft={{
        tickSize: 18,
        tickPadding: 7,
        tickRotation: 0,
        legend: "count",
        legendOffset: -56,
        legendPosition: "middle",
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: "every day",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      legends={[
        {
          anchor: "top",
          direction: "row",
          itemHeight: 20,
          itemWidth: 80,
          translateY: -10,
        },
      ]}
    />
  );
};

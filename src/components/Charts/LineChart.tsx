import { ResponsiveLine } from "@nivo/line";
import { trpc } from "../../utils/trpc";

// const data = [
//   {
//     id: "expense",
//     color: "hsl(43, 70%, 50%)",
//     data: [
//       { x: "2018-01-04", y: 14 },
//       { x: "2018-01-05", y: 14 },
//       { x: "2018-01-06", y: 15 },
//       { x: "2018-01-07", y: 11 },
//       { x: "2018-01-08", y: 10 },
//       { x: "2018-01-09", y: 12 },
//       { x: "2018-01-22", y: 9 },
//     ],
//   },
//   {
//     id: "income",
//     color: "hsl(46, 70%, 50%)",
//     data: [
//       { x: "2018-01-01", y: 7 },
//       { x: "2018-01-02", y: 5 },
//       { x: "2018-01-03", y: 11 },
//       { x: "2018-01-04", y: 9 },
//       { x: "2018-01-05", y: 12 },
//       { x: "2018-01-06", y: 16 },
//       { x: "2018-01-07", y: 13 },
//     ],
//   },
// ];
export const LineChart = () => {
  const { data, isError, isLoading } =
    trpc.transactions.getIncomeAndExpensesChartLineData.useQuery();

  if (isError) return <p>Error...</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <ResponsiveLine
      data={data}
      curve="natural"
      lineWidth={3}
      isInteractive={true}
      useMesh={true}
      margin={{ top: 10, right: 30, bottom: 30, left: 60 }}
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

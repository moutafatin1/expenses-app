import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "japan",
    color: "hsl(43, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 96,
      },
      {
        x: "helicopter",
        y: 48,
      },
      {
        x: "boat",
        y: 175,
      },
      {
        x: "train",
        y: 244,
      },
      {
        x: "subway",
        y: 111,
      },
      {
        x: "bus",
        y: 54,
      },
      {
        x: "car",
        y: 84,
      },
      {
        x: "moto",
        y: 233,
      },
      {
        x: "bicycle",
        y: 222,
      },
      {
        x: "horse",
        y: 247,
      },
      {
        x: "skateboard",
        y: 3,
      },
      {
        x: "others",
        y: 152,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(46, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 109,
      },
      {
        x: "helicopter",
        y: 140,
      },
      {
        x: "boat",
        y: 65,
      },
      {
        x: "train",
        y: 161,
      },
      {
        x: "subway",
        y: 160,
      },
      {
        x: "bus",
        y: 31,
      },
      {
        x: "car",
        y: 126,
      },
      {
        x: "moto",
        y: 212,
      },
      {
        x: "bicycle",
        y: 179,
      },
      {
        x: "horse",
        y: 112,
      },
      {
        x: "skateboard",
        y: 93,
      },
      {
        x: "others",
        y: 104,
      },
    ],
  },
];
export const LineChart = () => {
  return (
    <ResponsiveLine
      data={data}
      curve="natural"
      lineWidth={3}
      isInteractive={true}
      useMesh={true}
      margin={{ top: 10, right: 10, bottom: 30, left: 60 }}
      axisLeft={{
        tickSize: 18,
        tickPadding: 7,
        tickRotation: 0,
        legend: "count",
        legendOffset: -56,
        legendPosition: "middle",
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
    />
  );
};

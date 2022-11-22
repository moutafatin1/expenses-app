import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "Travel",
    label: "Travel",
    value: 291,
    color: "hsl(190, 70%, 50%)",
  },
  {
    id: "Education",
    label: "Education",
    value: 291,
    color: "hsl(150, 70%, 50%)",
  },
  {
    id: "Family",
    label: "Family",
    value: 291,
    color: "hsl(40, 70%, 50%)",
  },
];
export const PieChart = () => {
  return (
    <ResponsivePie
      data={data}
      colors={{ datum: "data.color" }}
      margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
      innerRadius={0.7}
      padAngle={1}
      cornerRadius={20}
      isInteractive={true}
      activeOuterRadiusOffset={5}
    />
  );
};

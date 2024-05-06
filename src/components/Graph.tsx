import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { fetchRestaurantData } from "../utils/fetch";

interface Props {
  activeRestaurant: number | null;
  activeProperty: string;
}

// Custom styles and settings for the graph
const style = () => ({
  [`.${axisClasses.root}`]: {
    [`.${axisClasses.tick}, .${axisClasses.line}`]: {
      stroke: "#2897ec !important",
      strokeWidth: 2
    },
    [`.${axisClasses.tickLabel}`]: {
      fill: "#FFFFFA !important"
    }
  },
  [`.${axisClasses.label}`]: {
    transform: "translate(-10px, 0)",
    fill: "#FFFFFA !important"
  }
});

const chartSetting = {
  width: 600,
  height: 500,
  slotProps: {
    bar: {
      // This setting rounds the top of the graph bars
      clipPath: `inset(0px round 8px 8px 0px 0px)`
    }
  }
};

const Graph: React.FC<Props> = ({ activeRestaurant, activeProperty }) => {
  const [dataset, setDataset] = useState([]);

  const columnName = "average_" + activeProperty.toLowerCase() + "_time";

  useEffect(() => {
    if (activeRestaurant) {
      fetchRestaurantData(activeRestaurant)
        .then((data) => {
          setDataset(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [activeRestaurant]);

  return (
    <>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "hour", label: "Arrival Time (hour of day)" }]}
        yAxis={[{ label: "Time (seconds)" }]}
        series={[{ dataKey: columnName, color: "#2897ec" }]}
        {...chartSetting}
        sx={style}
        tooltip={{ trigger: "none" }} // this disables the tooltip on the graph
      />
    </>
  );
};

export default Graph;

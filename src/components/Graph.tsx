import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";

interface Props {
  activeRestaurant: number | null;
  activeProperty: string;
}

const Graph: React.FC<Props> = ({ activeRestaurant, activeProperty }) => {
  const chartSetting = {
    width: 500,
    height: 400
  };

  const [dataset, setDataset] = useState([]);

  const columnName = "average_" + activeProperty.toLowerCase() + "_time";

  useEffect(() => {
    fetch(`v1/restaurants/${activeRestaurant}/data`)
      .then((res) => res.json())
      .then((data) => {
        setDataset(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const valueFormatter = (value: number | null) => `${value}mm`;

  return (
    <>
      <div>Test</div>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "hour" }]}
        series={[{ dataKey: columnName, label: activeProperty, valueFormatter }]}
        {...chartSetting}
      />
    </>
  );
};

// The dta keys can be different columns of the data (order, tota, etc.)

export default Graph;

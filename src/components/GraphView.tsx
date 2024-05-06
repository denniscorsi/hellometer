import React, { useState } from "react";
import Buttons from "./Buttons";
import Graph from "./Graph";

interface Props {
  activeRestaurant: number | null;
}

const GraphView: React.FC<Props> = ({ activeRestaurant }) => {
  const [activeProperty, setActiveProperty] = useState<string>("Total");

  // Select the text to be used in the graph title
  const activity: string =
    activeProperty === "Order"
      ? "Ordering"
      : activeProperty === "Wait"
      ? "Waiting"
      : activeProperty === "Payment"
      ? "Paying"
      : "Total";

  return (
    <div>
      <h2>Average Time a Customer Spent {activity} </h2>
      <div id="graph-container">
        <Graph activeRestaurant={activeRestaurant} activeProperty={activeProperty} />
        <Buttons setActiveProperty={setActiveProperty} />
      </div>
    </div>
  );
};

export default GraphView;

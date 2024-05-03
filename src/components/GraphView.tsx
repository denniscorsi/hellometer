import React, { useState } from "react";
import Buttons from "./Buttons";
import Graph from "./Graph";

interface Props {
  activeRestaurant: number | null;
}

const GraphView: React.FC<Props> = ({ activeRestaurant }) => {
  const [activeProperty, setActiveProperty] = useState<string>("Order");

  return (
    <div>
      <h3>graph for {activeRestaurant} </h3>
      <div>graph goes here</div>
      <div>
        <Graph activeRestaurant={activeRestaurant} activeProperty={activeProperty} />
        <Buttons setActiveProperty={setActiveProperty} />
      </div>
    </div>
  );
};

export default GraphView;

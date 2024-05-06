import react, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Selector from "./components/Selector";
import GraphView from "./components/GraphView";

function App() {
  const [activeRestaurant, setActiveRestaurant] = useState<number | null>(null);

  return (
    <>
      <Header />
      <Selector activeRestaurant={activeRestaurant} setActiveRestaurant={setActiveRestaurant} />
      {activeRestaurant && <GraphView activeRestaurant={activeRestaurant} />}
    </>
  );
}

export default App;

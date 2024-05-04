import react, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
      <GraphView activeRestaurant={activeRestaurant} />
    </>
  );
}

export default App;

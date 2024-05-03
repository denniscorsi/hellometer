import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Header";
import Selector from "./Selector";

function App() {
  const handleRestaurantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("change");
  };

  return (
    <>
      <Header />
      <Selector handleChange={handleRestaurantChange} />
    </>
  );
}

export default App;

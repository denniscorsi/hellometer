import React, { useState, useEffect } from "react";

interface SelectorProps {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Selector: React.FC<SelectorProps> = ({ handleChange }) => {
  const [restaurantIds, setRestaurantIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("v1/restaurants/ids")
      .then((res) => res.json())
      .then((data) => setRestaurantIds(data));
  }, []);

  return (
    <div>
      <form>
        <label htmlFor="selector">Select a restaurant:</label>
        <select name="selector" id="selector" onChange={handleChange}>
          {restaurantIds.map((id) => (
            <option value={id}>{id}</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Selector;

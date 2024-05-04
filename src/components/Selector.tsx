import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectorProps {
  activeRestaurant: number | null;
  setActiveRestaurant: (restaurantId: number) => void;
}

const Selector: React.FC<SelectorProps> = ({ activeRestaurant, setActiveRestaurant }) => {
  const [restaurantIds, setRestaurantIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("v1/restaurants/ids")
      .then((res) => res.json())
      .then((data) => setRestaurantIds(data));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setActiveRestaurant(Number(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="restaurant-select-label">Restaurant Id</InputLabel>
        <Select
          labelId="restaurant-select-label"
          id="restaurant-select"
          value={activeRestaurant?.toString()}
          label="Restaurant Id"
          onChange={handleChange}
        >
          {restaurantIds.map((id) => (
            <MenuItem value={id}>{id}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selector;

{
  /* <div>
<form>
  <label htmlFor="selector">Select a restaurant:</label>
  <select name="selector" id="selector" onChange={handleChange}>
    {restaurantIds.map((id) => (
      <option value={id}>{id}</option>
    ))}
  </select>
</form>
</div> */
}

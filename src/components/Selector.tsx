import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

interface SelectorProps {
  activeRestaurant: number | null;
  setActiveRestaurant: (restaurantId: number) => void;
}

// Custom styling for the select component
const CustomSelect = styled(Select)({
  "& .MuiSelect-filled": {
    backgroundColor: "#2897EC",
    color: "white",
    fontSize: "1.4rem"
  }
});

const Selector: React.FC<SelectorProps> = ({ activeRestaurant, setActiveRestaurant }) => {
  const [restaurantIds, setRestaurantIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("v1/restaurants/ids")
      .then((res) => res.json())
      .then((data) => setRestaurantIds(data));
  }, []);

  const handleChange = (event: SelectChangeEvent): void => {
    setActiveRestaurant(Number(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <h3>Select a restaurant ID</h3>
      <FormControl fullWidth variant="filled">
        <InputLabel id="restaurant-select-label">Restaurant Id</InputLabel>
        <CustomSelect
          labelId="restaurant-select-label"
          id="restaurant-select"
          value={activeRestaurant?.toString()}
          label="Restaurant Id"
          onChange={handleChange}
        >
          {restaurantIds.map((id) => (
            <MenuItem value={id} key={id}>
              {id}
            </MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
    </Box>
  );
};

export default Selector;

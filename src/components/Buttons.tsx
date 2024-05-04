import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

interface Props {
  setActiveProperty: (property: string) => void;
}

const Buttons: React.FC<Props> = ({ setActiveProperty }) => {
  const buttonOptions = ["Order", "Wait", "Payment", "Total"];

  const buttons = buttonOptions.map((option) => (
    <Button key={option} onClick={() => setActiveProperty(option)}>
      {option}
    </Button>
  ));

  return (
    <Box>
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        {buttons}
      </ButtonGroup>
    </Box>
  );
};

export default Buttons;

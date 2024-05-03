import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

interface Props {
  setActiveProperty: (property: string) => void;
}

const Buttons: React.FC<Props> = ({ setActiveProperty }) => {
  const buttons = [
    <Button key="order" onClick={() => setActiveProperty("Order")}>
      Order
    </Button>,
    <Button key="wait" onClick={() => setActiveProperty("Wait")}>
      Wait
    </Button>,
    <Button key="payment" onClick={() => setActiveProperty("Payment")}>
      Payment
    </Button>,
    <Button key="total" onClick={() => setActiveProperty("Total")}>
      Total
    </Button>
  ];

  return (
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1
        }
      }}
    >
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        {buttons}
      </ButtonGroup>
    </Box>
  );
};

export default Buttons;

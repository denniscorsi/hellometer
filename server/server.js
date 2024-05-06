import express from "express";
import restaurantsController from "./restaurantsController.js";

const app = express();
const port = process.env.PORT || 3000;

// This endpoint returns an array of all restaurant IDs that are present in the data.
app.get("/v1/restaurants/ids", restaurantsController.getRestaurantIds, (req, res) => {
  res.status(200).json(res.locals.restaurantIds);
});

// This endpoint retrieves the data for a specific restaurant.
app.get(
  "/v1/restaurants/:id/data",
  restaurantsController.getRestaurantData,
  restaurantsController.formatRestaurantData,
  (req, res) => {
    res.status(200).json(res.locals.restaurantData);
  }
);

// Catch-all route handler for any requests to an unknown route
app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express error handler caught an unknown middleware error",
    status: 500,
    message: "Internal Server Error"
  };
  const error = Object.assign({}, defaultError, err);
  res.status(error.status).json(error.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

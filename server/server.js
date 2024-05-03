import express from "express";
import restaurantsController from "./restaurantsController.js";

const app = express();
const port = 3000;

app.get("/v1/restaurants/ids", restaurantsController.getRestaurantIds, (req, res) => {
  res.status(200).json(res.locals.restaurantIds);
});

app.get(
  "/v1/restaurants/:id/data",
  restaurantsController.getRestaurantData,
  restaurantsController.formatRestaurantData,
  (req, res) => {
    res.status(200).json(res.locals.restaurantData);
  }
);

app.use("/*", (req, res) => {
  console.log("404 error");
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  // Handle the error
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

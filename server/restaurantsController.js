import dotenv from "dotenv";
import pkg from "pg";
import { getRestaurantIdsQuery, getAveragesQuery } from "../database/queries.js";

dotenv.config();

// Create a new pool instance
const DB_URL = process.env.DB_URL;
const pool = new pkg.Pool({
  connectionString: DB_URL,
  max: 5
});

const restaurantsController = {};

// Returns a list of the restaurant ids that exist in the database
restaurantsController.getRestaurantIds = (req, res, next) => {
  pool.query(getRestaurantIdsQuery, (err, result) => {
    if (err) {
      return next({
        log: "Error in restaurantsController.getRestaurantIds",
        message: {
          err: "An error occurred"
        }
      });
    }

    // This pulls out the restaurant ids from the query result
    res.locals.restaurantIds = result.rows.map((row) => row.restaurant_id);
    return next();
  });
};

// For a particular restaurant, query the database for the average times, grouped by hour
restaurantsController.getRestaurantData = (req, res, next) => {
  const id = req.params.id;

  pool.query(getAveragesQuery, [id], (err, result) => {
    if (err) {
      return next({
        log: "Error in restaurantsController.getRestaurantData",
        message: {
          err: "An error occurred"
        }
      });
    }
    res.locals.restaurantData = result.rows;
    return next();
  });
};

// Format the data to round the average times and extract the hour from the timestamp
restaurantsController.formatRestaurantData = (req, res, next) => {
  let formatedData = res.locals.restaurantData.map((data) => {
    const timestamp = new Date(data.hour);
    const hour = timestamp.getHours();
    const roundedValues = {
      average_order_time: Math.round(data["average_order_time"]),
      average_wait_time: Math.round(data["average_wait_time"]),
      average_payment_time: Math.round(data["average_payment_time"]),
      average_total_time: Math.round(data["average_total_time"])
    };
    return { hour, ...roundedValues };
  });

  formatedData.sort((a, b) => a.hour - b.hour);

  res.locals.restaurantData = formatedData;
  return next();
};

export default restaurantsController;

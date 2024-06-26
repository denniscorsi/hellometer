import dotenv from "dotenv";
import NodeCache from "node-cache";
import pkg from "pg";

import { getRestaurantIdsQuery, getAveragesQuery } from "../database/queries.js";

dotenv.config();

// Create a new pool instance
const DB_URL = process.env.DB_URL;
const pool = new pkg.Pool({
  connectionString: DB_URL,
  max: 5
});

// Configure cache
const cache = new NodeCache({ stdTTL: 60 });

const restaurantsController = {};

// Returns a list of the restaurant ids that exist in the database
restaurantsController.getRestaurantIds = (req, res, next) => {
  // Check if the restaurant ids are in the cache
  const cachedIds = cache.get("restaurantIds");

  if (cachedIds) {
    // If they are in the cache, use that data
    res.locals.restaurantIds = cachedIds;
    return next();
  } else {
    // If they are not in the cache, query the database
    pool.query(getRestaurantIdsQuery, (err, result) => {
      if (err) {
        return next({
          log: "Error querying the database for restaurant ids"
        });
      }

      // This pulls out the restaurant ids from the query result
      const restaurantIds = result.rows.map((row) => row.restaurant_id);
      restaurantIds.sort((a, b) => a - b);

      // Add the restaurant ids to the cache
      cache.set("restaurantIds", restaurantIds);

      res.locals.restaurantIds = restaurantIds;
      return next();
    });
  }
};

// For a particular restaurant, queries the database for the average times, grouped by arrival hour
restaurantsController.getRestaurantData = (req, res, next) => {
  const id = req.params.id;

  // Check if the restaurant data is in the cache
  const cachedData = cache.get(id);

  if (cachedData) {
    // If it is in the cache, use that data
    res.locals.restaurantData = cachedData;
    return next();
  } else {
    // If it is not in the cache, query the database
    pool.query(getAveragesQuery, [id], (err, result) => {
      if (err) {
        return next({
          log: `Error querying the database for restaurant data with id ${id}`
        });
      }

      const restaurantData = result.rows;

      // Add the restaurant data to the cache
      cache.set(id, restaurantData);

      res.locals.restaurantData = restaurantData;
      return next();
    });
  }
};

// Formats the data by rounding the average times and extracting the hour from the timestamp
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

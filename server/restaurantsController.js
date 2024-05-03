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

restaurantsController.getRestaurantData = (req, res, next) => {
  const id = req.params.id;
};

export default restaurantsController;

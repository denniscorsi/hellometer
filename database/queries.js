// Create the visits table
export const createTableQuery = `
CREATE TABLE IF NOT EXISTS visits (
  id SERIAL PRIMARY KEY,
  restaurant_id INT,
  arrival TIMESTAMP,
  order_time DECIMAL(5, 1),
  wait_time DECIMAL(5, 1),
  payment_time DECIMAL(5, 1),
  total_time DECIMAL(5, 1)
);`;
// DECIMAL(5, 1) means there can be a total of five digits with one digit to the right of the decimal point.
// The largest number this can accomodate is 9999.9, which is more than enough for our purposes.

// Insert a row into the visits table
export const insertVisitQuery = `
INSERT INTO visits (restaurant_id, arrival, order_time, wait_time, payment_time, total_time) 
VALUES ($1, $2, $3, $4, $5, $6)`;

// Get the average times for each column, grouped by hour
export const getAveragesQuery = `
SELECT DATE_TRUNC('hour', arrival) AS hour,
  AVG(order_time) AS average_order_time,
  AVG(wait_time) AS average_wait_time,
  AVG(payment_time) AS average_payment_time,
  AVG(total_time) AS average_total_time,
FROM visits
GROUP BY hour;
`;

// Get the restaurant ids from the visits table
export const getRestaurantIdsQuery = `
SELECT DISTINCT restaurant_id
FROM visits;
`;

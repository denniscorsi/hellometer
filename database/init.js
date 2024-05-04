import dotenv from "dotenv";
import fs from "fs";
import fastcsv from "fast-csv";
import pkg from "pg";

import { createTableQuery, insertVisitQuery } from "./queries.js";

dotenv.config();

// Create a new pool instance
const DB_URL = process.env.DB_URL;
const pool = new pkg.Pool({
  connectionString: DB_URL,
  max: 5
});

// Scans the data directory and returns an array of filenames, which correspond to the restaurant ids
const getFilenames = () => {
  const directory = "database/data";
  const filenames = [];

  fs.readdirSync(directory).forEach((file) => {
    if (file.endsWith(".csv")) {
      const filename = file.replace(".csv", "");
      filenames.push(filename);
    }
  });

  return filenames;
};

// Creates the visits table
const createTable = async () => {
  try {
    await pool.query(createTableQuery);
    console.log("Visits table created successfully");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

// Loads the data from the CSV files into the visits table
const loadData = async () => {
  // The filenames correspond to the restaurant ids
  const restaurant_ids = getFilenames();

  // For each restaurant we have data on, read the CSV file and insert the data into the table
  restaurant_ids.forEach(async (restaurant_id) => {
    let stream = fs.createReadStream(`database/data/${restaurant_id}.csv`);

    let isHeader = true;
    let csvStream = fastcsv
      .parse()
      .on("data", function (data) {
        if (isHeader)
          // This prevents the header row from being inserted into the table
          isHeader = false;
        else {
          pool.connect((err, client, done) => {
            if (err) {
              done();
            } else {
              client.query(insertVisitQuery, [restaurant_id, ...data], (err, res) => {
                done();
              });
            }
          });
        }
      })
      .on("end", async function () {
        console.log("Data file read for restaurant", restaurant_id);
      });

    // Stream the data from the CSV file one row at a time
    stream.pipe(csvStream);
  });
};

// Call the functions
await createTable();
loadData();
console.log(
  "Please wait for the process to fully exit. Data is still loading into the database even after the file has been read..."
);

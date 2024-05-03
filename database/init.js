import dotenv from "dotenv";
import pkg from "pg";
import fs from "fs";
import fastcsv from "fast-csv";

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

// Create the visits table
const createTable = async () => {
  try {
    await pool.query(createTableQuery);
    console.log("Visits table created successfully");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

// Load the data from the CSV files into the visits table
const loadData = () => {
  // The filenames correspond to the restaurant ids
  const restaurant_ids = getFilenames();

  // For each restaurant we have data on, read the CSV file and insert the data into the table
  restaurant_ids.forEach((restaurant_id) => {
    let stream = fs.createReadStream(`database/data/${restaurant_id}.csv`);
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", function (data) {
        csvData.push(data);
      })
      .on("end", function () {
        // remove the header line
        csvData.shift();

        pool.connect((err, client) => {
          if (err) throw err;

          try {
            csvData.forEach((row) => {
              client.query(insertVisitQuery, [restaurant_id, ...row], (err, res) => {
                if (err) {
                  console.log(`Error with restaurant ${restaurant_id}, row ${row}`);
                  console.log("That row is ommitted.");
                }
              });
            });
          } catch (error) {
            console.log("Error loading data:", error);
          }
        });
      });
    stream.pipe(csvStream);
  });
};

// Call the functions
await createTable();
loadData();
console.log("Database initialized successfully");



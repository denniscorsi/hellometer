## What I Built

#### The Goal

The purpose of this app is to give a high-level visual overview of how long a customer spends in each phase of their visit at different times of day. This will allow a restaurant manager to easily see which times of day customers move through the process quickly and which times they experience significant wait times.

#### Server

The server is built using express in node.js. There are two endpoints, as detailed below in the "API Documentation." The business logic is within middleware functions in the restaurantsController. The controller connects to the database via the "pg" library. A node-cache is implemented at this layer to cache query results for 60 seconds.

#### Database

A remote PostgreSQL database is being used. All queries are within the queries.js module and imported within server modules.
The init.js module initializes the database by creating a table and loading all of the data into it. The data will automatically be read from any CSV files placed in the data directory.

#### Client

The front end is built using React and TypeScript. The component library Material UI is used, particularly for the bar graph component. The restaurant ID options in the selector are dynamically populated from the database data.

## Run Instructions

- Install dependencies: execute `npm install`
- Provide environmental variable: create a .env file in the root and paste the db_url provided via email.
- Load data: place any data you want to process into the database/data directory. I have already placed the five files provided. Then execute `npm run db-init`. Once the process exits, you can move on to starting the app.
- Start app: execute `npm run dev`
- Open app: in a browser, naviagte to the link provided in the terminal. It will likely be http://localhost:5173/

## Next Steps

There is a lot more that can be done to improve this app. Given more time, here are the next tasks I would complete:

- Add testing. Server tests can be built using supertest and frontend tests with react testing library.
- Make the app responsive to small screen sizes.
- Allow the user to select the timeframe by which they want to group the data. (Currently, it is by the hour.)
- Create a better progress indicator for db-init. It currently indicates when each file has been read locally but not when each file has completed loading into the remote database.
- If a row in the CSV contains missing or incompatible data (like restaurant 98, row 88), that entire row will not be inserted into the database. It would be useful to write more functionality around this, like alerting the user and allowing them to fix the data.

## API Documentation

**Endpoint:** `GET /v1/restaurants/ids`

**Description:** This endpoint returns an array of all restaurant IDs that are present in the data.

**Success Response:**

- **Code:** 200
- **Content:** Array of integers

**Error Response:**

- **Code:** 500
- **Content:** "Internal Server Error"

---

**Endpoint:** `GET /v1/restaurants/:id/data`

**Description:** This endpoint retrieves the data for a specific restaurant.

**Parameters:**

- `id` (required): The ID of the restaurant.

**Success Response:**

- **Code:** 200
- **Content:** JSON object containing the formatted restaurant data with the following properties: `{hour, average_order_time, average_wait_time, average_payment_time, average_total_time}`

**Error Response:**

- **Code:** 500
- **Content:** "Internal Server Error"

import { pool } from "../db/index.js";

export async function getTravels() {
  // Define the SQL query to fetch all data from the travel table
  const queryText = "SELECT * FROM travel";
  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);
  // The rows property of the result object contains the retrieved records
  console.log(result);
  return result.rows;
}

export async function getTravelById(id) {
  try {
    // Define the SQL query to fetch data from the travel table by id
    const queryText = "SELECT * FROM travel WHERE id = $1";
    //await the pool query back from the db
    const result = await pool.query(queryText, [id]);
    //return the item if found
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    // Handle errors, log or throw as needed
    throw error;
  }
}

//POST function to add new value in the travelgettravel table
export async function createTravel(travel) {
  // Query the database to create an travelgettravel and return the newly created travelgettravel
  const queryText =
    "INSERT INTO travel (city, country, best_time_to_visit, fun_fact, imglink, not_to_miss) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  //define elements of the request and placeholder values
  const result = await pool.query(queryText, [
    travel.city,
    travel.country,
    travel.best_time_to_visit,
    travel.fun_fact,
    travel.imglink,
    travel.not_to_miss,
  ]);
  //return result
  return result.rows[0] || null;
}

export async function deleteTravelById(id) {
  // Delete item by id
  const deleteTravelQuery = "DELETE FROM travel WHERE id = $1 RETURNING *";
  const result = await pool.query(deleteTravelQuery, [id]);
  // Return the deleted item or null
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0];
}

export async function updateTravelById(id, update) {
  //store new data in deconstructed obj
  const { city, country, best_time_to_visit, fun_fact, imglink, not_to_miss } =
    update;
  const queryText =
    "UPDATE travel SET city = $1, country = $2, best_time_to_visit = $3, fun_fact = $4, imglink = $5, not_to_miss = $6";
  const result = await pool.query(queryText, [
    city,
    country,
    best_time_to_visit,
    fun_fact,
    imglink,
    not_to_miss,
    id,
  ]);
  //return result
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0];
}

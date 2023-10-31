//import from vitest
import { test, expect, expectTypeOf } from "vitest";
//import supertest
import request from "supertest";
//import app
import app from "../app.js";

import { getTravels, createTravel } from "../models/travelModel.js";

//write a barebone test
test("this is a test", function () {});

test("GET travels from the database", async function () {
  // Perform setup, e.g., insert some test data into the database
  // This will depend on how your database setup is handled

  // Call the getTravels function to retrieve data from the database
  const travels = await getTravels();

  // Assertions
  expect(Array.isArray(travels)).toBe(true);
  // You can add more specific assertions based on your database setup and expected results
});

test("Create a new travel record in the database", async function () {
  // Define a sample travel object
  const newTravel = {
    city: "New City",
    country: "New Country",
    best_time_to_visit: "Spring",
    fun_fact: "Fun fact about the place",
    imglink: "image-url.jpg",
    not_to_miss: "Must-visit spots",
  };
  // Call the createTravel function to insert the new record
  const createdTravel = await createTravel(newTravel);

  // Assertions
  expectTypeOf(createdTravel).toEqual(newTravel);
  // You can add more specific assertions based on your database setup and expected results
});

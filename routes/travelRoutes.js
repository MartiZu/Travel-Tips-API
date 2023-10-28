import express from "express";
//import all controller functions
import * as travelController from "../controllers/travelControllers.js";

export const travelRoutes = express.Router();

//user router and express method using controller functions
travelRoutes.get("/", travelController.getTravels);

travelRoutes.get("/:id", travelController.getTravelById);

travelRoutes.post("/", travelController.createTravel);

travelRoutes.patch("/:id", travelController.updateTravelByID);

travelRoutes.delete("/:id", travelController.deleteTravelByID);

import express from "express";

import * as travelController from "../controllers/travelControllers.js";

export const travelRoutes = express.Router();

travelRoutes.get("/", travelController.getTravels);

travelRoutes.get("/:id", travelController.getTravelById);

travelRoutes.post("/", travelController.createTravel);

travelRoutes.patch("/:id", travelController.updateTravelByID);

travelRoutes.delete("/:id", travelController.deleteTravelByID);

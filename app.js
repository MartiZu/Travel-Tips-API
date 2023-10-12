import express from "express";
import morgan from "morgan";

import { travelRoutes } from "./routes/travelRoutes.js";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/travel", travelRoutes);

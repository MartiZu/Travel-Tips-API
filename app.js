//import files
import express from "express";
import morgan from "morgan";
import cors from "cors";

//import all routes from their files
import { travelRoutes } from "./routes/travelRoutes.js";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.use("/travel", travelRoutes);
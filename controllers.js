//file for the handlers

import express from "express";
import morgan from "morgan";
import {
  createTravel,
  getTravelById,
  getTravels,
  updateTravelByID,
  deleteTravelByID,
} from "./travel.js";

const app = express();


app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "success", data: "This route works!" });
});

app.get("/travel", async function (req, res) {
  //specify the path
  const responseData = await getTravels();
  //return response 200 and data
  res.status(200).send({ status: "success", data: responseData });
});

app.get("/travel/:id", async function (req, res) {
  //await promise from userbyid function and store it in a variable
  const userByIdObj = await getTravelById(req.params.id);
  if (userByIdObj === null) {
    let returnObj = {
      status: "success",
      data: "Not matching id found.",
    };
    return res.status(200).send(returnObj);
  } else if (userByIdObj !== null) {
    let returnObj = {
      status: "success",
      data: userByIdObj,
    };
    return res.status(200).send(returnObj);
  } else {
    let returnObj = {
      status: "fail",
      data: "There is a problem with the server/the server could not access the data",
    };
    return res.status(500).send(returnObj);
  }
});

app.post("/travel", async function (req, res) {
  const { name, bestTimeToVisit, funFact } = req.body;
  if (
    typeof name === "string" &&
    name !== "" &&
    // typeof last_name === "string" &&
    // last_name !== "" &&
    typeof bestTimeToVisit === "string" &&
    bestTimeToVisit !== "" &&
    typeof funFact === "string" &&
    funFact !== ""
  ) {
    const addUser = await createTravel(name, bestTimeToVisit, funFact);
    const methodObj = {
      status: "successful",
      data: addUser,
    };
    //return status
    return res.status(201).send(methodObj);
  } else {
    const failedObj = {
      status: "fail",
      data: "Mandatory values are required",
    };
    //return error
    return res.status(400).send(failedObj);
  }
});

app.delete("/travel/:id", async function (req, res) {
  //store return value in a variable
  if (req.params.id === "") {
    let returnObj = {
      status: "error",
      data: "Please provide an id.",
    };
    return res.status(400).send(returnObj);
  }
  const deletedData = await deleteTravelByID(req.params.id);
  if (deletedData === false) {
    let returnObj = {
      status: "success",
      data: "Not matching id found.",
    };
    return res.status(200).send(returnObj);
  } else if (deletedData === true) {
    let returnObj = {
      status: "success",
      data: "The user has been deleted",
    };
    return res.status(200).send(returnObj);
  } else {
    let returnObj = {
      status: "fail",
      data: "There is a problem with the server/the server could not access the data",
    };
    return res.status(500).send(returnObj);
  }
});

app.patch("/travel/:id", async function (req, res) {
  if (req.params.id === "") {
    let returnObj = {
      status: "error",
      data: "Please provide an id.",
    };
    return res.status(400).send(returnObj);
  }
  const { name, bestTimeToVisit, funFact } = req.body;
  const updatedUser = await updateTravelByID(
    req.params.id,
    name,
    bestTimeToVisit,
    funFact
  );
  if (updatedUser === null) {
    let returnObj = {
      status: "success",
      data: "Not matching id found.",
    };
    res.status(200).send(returnObj);
  } else if (updatedUser !== null) {
    let returnObj = {
      status: "success",
      data: updatedUser,
    };
    res.status(200).send(returnObj);
  } else {
    let returnObj = {
      status: "fail",
      data: "There is a problem with the server/the server could not access the data",
    };
    return res.status(500).send(returnObj);
  }
});


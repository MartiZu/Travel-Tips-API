import * as travelModel from "../models/travelModel.js";

export async function getTravels(req, res) {
  //specify the path
  const responseData = await travelModel.getTravels();
  //return response 200 and data
  res.status(200).send({ status: "success", data: responseData });
}

export async function getTravelById(req, res) {
  //await promise from userbyid function and store it in a variable
  const userByIdObj = await travelModel.getTravelById(req.params.id);
  if (!userByIdObj) {
    let returnObj = {
      status: "fail",
      data: "Not matching id found.",
    };
    return res.status(404).send(returnObj);
  }
  let returnObj = {
    status: "success",
    data: userByIdObj,
  };
  return res.status(200).send(returnObj);
}

export async function createTravel(req, res) {
  const { name, bestTimeToVisit, funFact } = req.body;
  const addTravel = await travelModel.createTravel(
    name,
    bestTimeToVisit,
    funFact
  );
  if (!addTravel) {
    const failedObj = {
      status: "fail",
      data: "Mandatory values are required",
    };
    res.status(400).send(failedObj);
  }
  const newObj = {
    status: "successful",
    data: addTravel,
  };
  //return status
  return res.status(201).send(newObj);
}

export async function deleteTravelByID(req, res) {
  const deletedData = await travelModel.deleteTravelByID(req.params.id);
  //store return value in a variable
  if (!deletedData) {
    let returnObj = {
      status: "fail",
      data: "Please provide a valid id.",
    };
    return res.status(404).send(returnObj);
  }
  let returnObj = {
    status: "success",
    data: "Not matching id found.",
  };
  return res.status(200).send(returnObj);
}

export async function updateTravelByID(req, res) {
  const { name, bestTimeToVisit, funFact } = req.body;
  const updatedUser = await travelModel.updateTravelByID(
    req.params.id,
    name,
    bestTimeToVisit,
    funFact
  );
  if (!updatedUser) {
    let returnObj = {
      status: "fail",
      data: "Please provide a valid id.",
    };
    return res.status(40).send(returnObj);
  }
  let returnObj = {
    status: "success",
    data: updatedUser,
  };
  res.status(200).send(returnObj);
}

import * as travelModel from "../models/travelModel.js";

export async function getTravels(req, res) {
  //specify the path
  try {
    const responseData = await travelModel.getTravels();
    res.status(200).json({ status: "success", data: responseData });
    console.log(responseData);
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getTravelById(req, res) {
  try {
    //await promise from userbyid function and store it in a variable
    const travelObj = await travelModel.getTravelById(req.params.id);
    //handle errors if no id
    if (!travelObj) {
      return res.status(404).json({
        status: "fail",
        data: { message: "Not matching id found." },
      });
    }
    //return object
    return res.status(200).json({
      status: "success",
      data: travelObj,
    });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createTravel(req, res) {
  try {
    const {
      city,
      country,
      best_time_to_visit,
      fun_fact,
      imglink,
      not_to_miss,
    } = req.body;
    const addTravel = await travelModel.createTravel(
      city,
      country,
      best_time_to_visit,
      (fun_fact = "Unknown"),
      (imglink = "Unavailable"),
      not_to_miss
    );
    if (!addTravel) {
      res.status(400).json({
        status: "fail",
        data: { message: "Mandatory values are required" },
      });
    }
    //return status
    return res.status(201).json({
      status: "successful",
      data: addTravel,
    });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function deleteTravelById(req, res) {
  try {
    const deletedData = await travelModel.deleteTravelById(req.params.id);
    //store return value in a variable
    if (!deletedData) {
      return res.status(404).json({
        status: "fail",
        data: { message: "Travel not found" },
      });
    }
    return res.status(200).json({
      status: "success",
      data: deletedData,
    });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function updateTravelById(req, res) {
  try {
    const data = req.body;
    const id = req.params.id;
    const updateTravel = await travelModel.updateTravelById(
      id,
      city,
      country,
      best_time_to_visit,
      (fun_fact = "Unknown"),
      (imglink = "Unavailable"),
      not_to_miss
    );
    if (!updateTravel) {
      return res
        .status(404)
        .json({ status: "fail", data: { message: "Travel not found" } });
    }
    res.status(200).json({ status: "success", data: updateTravel });
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ status: "error", message: error.message });
  }
}

//file to perform CRUD operations

import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "travel.json";

export async function getTravels() {
  //specify file reading
  const JSONdata = await fs.readFile(fileName);
  //parse data
  const travelList = JSON.parse(JSONdata);
  //debug
  console.log(travelList);
  //return parsed data
  return travelList;
}

export async function getTravelById(id) {
  //read JSON file in JSON language
  const JSONdata = await fs.readFile(fileName);
  //parse JSON in JS
  const listObj = JSON.parse(JSONdata);
  for (let i = 0; i < listObj.length; i++) {
    //if the URL id = the id key in the array
    if (listObj[i].id === id) {
      //return the id element
      console.log(listObj[i]);
      return listObj[i];
    }
  }
  //else return the ID does not exist
  return null;
}

export async function createTravel(name, bestTimeToVisit, funFact) {
  //get promise JSON data
  const JSONdata = await fs.readFile(fileName);
  // parse data
  const fileList = JSON.parse(JSONdata);
  //create new object
  const newObjCreated = {
    id: uuidv4(),
    name,
    bestTimeToVisit,
    funFact,
  };
  //push new data in the List
  fileList.push(newObjCreated);
  //write list back in JSON
  const newJSONData = JSON.stringify(fileList);
  //return added file back in the JSON file
  console.log(newJSONData);
  await fs.writeFile(fileName, newJSONData);
  return newObjCreated;
}

export async function updateTravelByID(
  id,
  newname,
  newbestTimeToVisit,
  newfunFact
) {
  const JSONdata = await fs.readFile(fileName);
  const parsedData = JSON.parse(JSONdata);
  for (let i = 0; i < parsedData.length; i++) {
    if (parsedData[i].id === id) {
      //remove [i]
      parsedData[i].name = newname;
      parsedData[i].bestTimeToVisit = newbestTimeToVisit;
      parsedData[i].funFact = newfunFact;
      //write data back in JSON
      const newDataInJSON = JSON.stringify(parsedData);
      //send back to JSON file
      await fs.writeFile(fileName, newDataInJSON);
      return parsedData[i];
    }
  }
  return null;
}

export async function deleteTravelByID(id) {
  //get data from JSON
  const JSONdata = await fs.readFile(fileName);
  //parse data
  const parsedData = JSON.parse(JSONdata);
  for (let i = 0; i < parsedData.length; i++) {
    if (parsedData[i].id === id) {
      //remove [i]
      parsedData.splice([i], 1);
      //write data back in JSON
      const newDataInJSON = JSON.stringify(parsedData);
      //send back to JSON file
      await fs.writeFile(fileName, newDataInJSON);
      return true;
    }
  }
  return false;
}

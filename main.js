//define my base URL with endpoint /travel
const URL = "http://localhost:5501/travel";

//make a request to the end point
async function getJSONData() {
  const response = await fetch(URL);
  console.log(response); //debugging
  if (!response.ok) {
    //handle errors if request is not succesfull
    console.error(`Status: ${response.status}`);
    console.error(`Text: ${await response.text()}`);
    return;
  }
  //await promise
  const data = await response.json();
  console.log.apply(data); //print promise
  return data; //return data from your request
}

async function getAndDisplayTravelData() {
  const dataResponse = await getJSONData();
  console.log(dataResponse); //print the object
  return displayData(dataResponse);
}

//display travel info on HTML
function displayData(displayTravelData) {
  const randomIndex = Math.floor(Math.random() * displayTravelData.data.length);
  const randomElement = displayTravelData.data[randomIndex];
  displayName.innerText = randomElement.name;
  displayTime.innerText = randomElement.bestTimeToVisit;
  displayFunFact.innerText = randomElement.funFact;
}

//write function to display specific city
async function getAndDisplayTravelDataPicked() {
  let userAnswer = prompt("Pick a city");
  console.log(userAnswer);
  const dataResponse = await getJSONData();
  console.log(dataResponse); //print the object
  // for (let i = 0; i < dataResponse.data.length; i++){
  //   if (userAnswer == dataResponse.data[i].name){
  //   return displayDataPicked(dataResponse);
  // }
  // }
  // return alert("Location not found!")
  return displayDataPicked(userAnswer, dataResponse);
}
//function to display the picked data when event click
function displayDataPicked(userAnswer, dataResponse) {
  //find() takes a callback function as an argument. This callback function is executed for each element in the array until a condition is met.
  const pickedCity = dataResponse.data.find((city) => city.name === userAnswer); // condition

  if (pickedCity) {
    displayName.innerText = pickedCity.name;
    displayTime.innerText = pickedCity.bestTimeToVisit;
    displayFunFact.innerText = pickedCity.funFact;
  } else {
    alert("Location not found!");
  }
  // displayName.innerText = dataResponse.data.name;
  // displayTime.innerText = dataResponse.data.bestTimeToVisit;
  // displayFunFact.innerText = dataResponse.data.funFact;
}

// Get a reference to the random button
const randomButton = document.querySelector("#random-button");
//get reference to the pick button
const pickButton = document.querySelector("#pick-button");
//listen for the event and call function when event happens
randomButton.addEventListener("click", getAndDisplayTravelData);
//listen for the event and call function when event happens
pickButton.addEventListener("click", getAndDisplayTravelDataPicked);

// Manipulate the DOM
const displayName = document.getElementById("name");
const displayLastName = document.getElementById("lastName");
const displayTime = document.getElementById("time");
const displayFunFact = document.getElementById("fun");

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port , listeningFunc);


/**
 * @description Callback function that will invoke when server starts.
*/
function listeningFunc() {
    console.log(`The weather app server is running on localhost:${port}`);
}

// Save weather data endpoint
app.post("/saveWeatherData" , (request , response) => {
    console.log(request);
    projectData = request.body;
    response.send({"msg":"Weather data is saved successfully"}); 
});

// Get weather data 
app.get("/getWeatherData" , (request , response) => {
    response.send(projectData);
})
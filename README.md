# Weather-Journal App Project
Weather Journal App which use the open weather map API (https://openweathermap.org/api) to get weather information for specific city by zip code.
## Author
Ahmed Gomaa (a.gomaaabdelrahman@gmail.com)

## Description
We get the weather data from the open weather map API according to the zip code which user must enter it correctly to get the correct weather information, then we use a POST route to save this information in the backend and at the last step we update the user interface with some of this information like 
date, temperature and your feelings which comes from the "How are you feeling today?" felid.

## Installation
This project requires Node and npm(node package manager) to be installed.

Then run this commands to install the helping packages:
    - npm install

To run this project:
    - Run this command "node server.js" in the terminal.
    - Open your browser and go to "http://localhost:8080"

## Packages, APIs are used
    - Open weather map API (https://openweathermap.org/api) to get the weather information.
    - Express is a Node js framework.
    - Body Parser package to work as a middle ware layer to handle the requests.
    - Cors for cross origin allowance.


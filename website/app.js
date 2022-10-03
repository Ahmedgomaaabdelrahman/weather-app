/* Global Variables */

// Store weather map API information.
const API_CONFIGURATION = {
    apiKey : "82ab94ce549c690807fd8d140b678e6b&units=imperial",
    weatherApiBaseUrl: "https://api.openweathermap.org/data/2.5/weather?zip=",
};

// Store everything related to html elements
const WeatherApplicationElements = {
    zipCodeElement : document.getElementById("zip"),
    feelingsElement : document.getElementById("feelings"),
    generateButton: document.getElementById("generate"),
    dateElement : document.getElementById('date'),
    tempElement : document.getElementById('temp'),
    contentElement : document.getElementById('content'),

    // Check if the required felids are populated or not.
    validRequiredElements: function(){
        let errorExist = false;
        if(WeatherApplicationElements.zipCodeElement.value.trim() === "" || WeatherApplicationElements.feelingsElement.value.trim() === "") {
            alert("Zip code and feelings are required")
            errorExist = true;
        }

        return errorExist;
    }
}


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Click on generate button.
WeatherApplicationElements.generateButton.addEventListener('click' , generateWeatherData);

/**
 * @description callback function which will be invoked if click on generate button.
*/
function generateWeatherData() {
    if(!WeatherApplicationElements.validRequiredElements()){
        getCurrentWeatherData(API_CONFIGURATION.weatherApiBaseUrl , WeatherApplicationElements.zipCodeElement , API_CONFIGURATION.apiKey).then((data) => {
            if(data["cod"] == "200") {
                const currentWeatherData = {
                    date:newDate,
                    temp: data.main ? data.main.temp : '',
                    feelings:WeatherApplicationElements.feelingsElement.value,
                };
                saveDataInServer(currentWeatherData).then(() => getAndShowWeatherData());
            }
            else {
                alert("city is not found, please enter correct zip code");
                return;
            }
        });
    };
}
/**
 * @description this function is used to get the weather information from weather map api according to zip code.
 * @param apiBaseUrl - the base url of open weather map api.
 * @param zipCode - zip code of the city that will get its weather information.
 * @param apiKey - api key that I get when registering on api website.
 * @return the weather object data that will come as a response from the api
*/
async function getCurrentWeatherData(apiBaseUrl, zipCode, apiKey){
    const weatherData = await fetch(`${apiBaseUrl}${zipCode.value}&units=metric&appid=${apiKey}`)
    try{
        const responseData = await weatherData.json();
        return responseData;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

/**
 * @description this function is used to save the weather data which coming from weather api in the backend object.
 * @param data - the weather data object that we need to save.
 * @return message that object is saved successfully or throw error.
*/
async function saveDataInServer(data = {}) {
    let requestHeader = {
        method:'POST',
        credential:'same-origin',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    };

    const sendingData = await fetch("/saveWeatherData" , requestHeader);
    try{
        const response = await sendingData.json();
        return response;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

/**
 * @description this function is used to get the weather data which exist in the backend object and update the user interface felids.
*/
async function getAndShowWeatherData() {
    const comingData = await fetch('/getWeatherData');
    try {
        const mostRecentData = await comingData.json();
        WeatherApplicationElements.dateElement.innerHTML = `Date:  ${mostRecentData.date}`;
        WeatherApplicationElements.tempElement.innerHTML = `Temperature: ${Math.round(mostRecentData.temp)} degrees`;
        WeatherApplicationElements.contentElement.innerHTML = `Your feelings: ${mostRecentData.feelings} `;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}


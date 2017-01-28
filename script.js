//I know code isn't great, but this is my first real project using JS, JSON and JQuery together. It was fun. The project is one of the "Freecodecamp" challenges// 


console.log("Main JS works!");

$(document).ready(function(){
   console.log("The JQuery ready function works too!"); 
    
    if(navigator.geolocation){
        
       navigator.geolocation.getCurrentPosition(
        function (position) {
            
            // Log that this is the initial position.
            console.log( "Initial Position Found" );
            // Assign coordinates to global variables
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            //Go on
            mainJson(myLat, myLng);
            
        }
        
    ); 
        
    }
    
    else{
        console.log("There was an error with geo-location data");
    }
     
    
 
    function mainJson(lat, lng)
    {
        var ourRequest = new XMLHttpRequest();
        
        //diffrent JSON based on user geo location
        ourRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=c1b77262ffa7f5e4ad709e332c64bbfa');
        
        ourRequest.send();

        ourRequest.onload = function(){
          if(ourRequest.status >= 200 && ourRequest.status < 400){
              var ourData = JSON.parse(ourRequest.responseText);
              //renderHTML
              renderHTML(ourData);
          } 
        else{
            console.log("We connected to the server, but it returned and error!");
        }  
}
        ourRequest.onerror = function(){
            console.log("Connection lost");
        }
    }
    
    
   
      
});


function renderHTML(data){ //main function that renders HTML ;)
    console.log("Render function works");
    
    //Just for info
    var htmlString = "";
    
    htmlString += "Temperature [K] : " + data.main.temp +  " Lon: " + data.coord.lon + " Lat: " + data.coord.lat +" Name: " + data.name + " Country: " + data.sys.country + " Wind Speed: " + data.wind.speed + " Main " + data.weather[0].main;
        
    console.log("From JSON " + htmlString);
    
    //CITY AND TEMP CONFIG//
    
    var temp = data.main.temp;
    var city_name = data.name;
    
    
    $(".temperature").html(convertKelvinToCelsius(temp));
    $(".info-f").html(city_name);
    $(".info-main").html(data.weather[0].main);
    
    var clc = temp - 273.15; //it's the celsius temperature (JSON temp is Kelvin)
    toButton(clc);
    
    
    
        //SWITCH ICON CONFIG//
    
        switch(data.weather[0].main) {
        case "Thunderstorm":
            $(".icon").addClass( "wi-thunderstorm" );  
            break;
        case "Clear":
            $(".icon").addClass("wi-day-sunny"); 
            break;
        case "Drizzle":
            $(".icon").addClass("wi-sleet"); 
            break;
        case "Rain":
            $(".icon").addClass("wi-showers"); 
            break;
        case "Snow":
            $(".icon").addClass("wi-snow");
            break;
        case "Clouds":
            $(".icon").addClass("wi-cloudy");
            break;
        case "Extreme":
            $(".icon").addClass("wi-meteor");
        case "Mist":
            $(".icon").addClass("wi-fog");
        case "Haze":
            $(".icon").addClass("wi-day-haze");
        default:
            console.log("Deafault");
    }
    
}

//CONVERT FUNCTIONS

function convertKelvinToCelsius(kelvin) {
		return (Math.round(kelvin-273.15)) + "°C";
}

function convertCelsiusToFahrenheit(celsius) {
    return (Math.round(9/5*celsius + 32)) + "°F";
}



function toButton(temp_celsius){
    
    var celsius_bool = true;
    
     $("button").on("click", function(){

        if(celsius_bool){ //celsius === true;
             //change to Fahrenheit
             $(".temperature").html(convertCelsiusToFahrenheit(temp_celsius));
             celsius_bool = false;
         }

         else if (celsius_bool===false){
             $(".temperature").html((Math.round(temp_celsius)) + "°C");
             celsius_bool = true;
         }      
});  
    
}

//https://openweathermap.org/weather-conditions
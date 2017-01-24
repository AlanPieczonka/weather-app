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


function renderHTML(data){
    console.log("Render function works");
    
    //$(".ikona").addClass( "wi-thunderstorm" );//thunderstorm
    //(".ikona").addClass("wi-day-sunny"); //clear sky
    //$(".ikona").addClass("wi-sleet"); //drizzle
    //$(".ikona").addClass( "wi-showers" );//shower rain
    //$(".ikona").addClass( "wi-snow" );//snow
    //$(".ikona").addClass( "wi-cloudy" );//few clouds
    
    var htmlString = "";
    
    htmlString += "Temperature [K] : " + data.main.temp +  " Lon: " + data.coord.lon + " Lat: " + data.coord.lat +" Name: " + data.name + " Country: " + data.sys.country + " Wind Speed: " + data.wind.speed + " Main " + data.weather[0].main;
        
    console.log("From JSON " + htmlString);
    
    //CITY AND TEMP CONFIG//
    
    var temp = data.main.temp;
    var city_name = data.name;
    
    $(".temperatura").html(convertKelvinToCelsius(temp));
    $(".info-f").html(city_name);
    $(".info-main").html(data.weather[0].main);
    
    //CITY AND TEMP CONFIG//
    
    //SWITCH ICON CONFIG//
    
    switch(data.weather[0].main) {
    case "Thunderstorm":
        $(".ikona").addClass( "wi-thunderstorm" );  
        break;
    case "Clear":
        $(".ikona").addClass("wi-day-sunny"); 
        break;
    case "Drizzle":
        $(".ikona").addClass("wi-sleet"); 
        break;
    case "Rain":
        $(".ikona").addClass("wi-showers"); 
        break;
    case "Snow":
        $(".ikona").addClass("wi-snow");
        break;
    case "Clouds":
        $(".ikona").addClass("wi-cloudy");
        break;
    case "Extreme":
        $(".ikona").addClass("wi-meteor");
    default:
        console.log("Deafault");
}
    
    //SWITCH ICON CONFIG//

   

}


function convertKelvinToCelsius(kelvin) {
	if (kelvin < (0)) {
		return 'below absolute zero (0 K)';
	} else {
		return (Math.round(kelvin-273.15)) + "°C";
	}
}



function convertCelsiusToFahrenheit(celcius) {
	
    return (celcius+273.15) + "&#8451";

}

function convertFahrenheitToCelsius(fahrenheit){
    return "celcius";
}





//https://openweathermap.org/weather-conditions
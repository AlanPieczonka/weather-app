console.log("This shit works!");

$(document).ready(function(){
   console.log("This other one works too!"); 
    
    
    
    
    
    
    
    
    
    
    
    
    var ourRequest = new XMLHttpRequest();
    
    ourRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=49.7249238&lon=19.1004921&appid=c1b77262ffa7f5e4ad709e332c64bbfa');
    
    ourRequest.send();
    
    ourRequest.onload = function(){
      if(ourRequest.status >= 200 && ourRequest.status < 400){
         var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    }
        
        
        
    else{
        console.log("we connected to the server, but it returned and error!");
    }  
}
    
    ourRequest.onerror = function(){
        console.log("Connection lost. Please visit our FAQ to get more info.");
    }
    
    
    
    
});


function renderHTML(data){
    console.log("render działa");
    var htmlString = "";
    
    htmlString += data.coord.lon + " " + data.name + " " + data.sys.country;
        
    console.log(htmlString);
}

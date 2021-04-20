
// Data, Time and Year
let now = new Date()
let tellData = document.querySelector("#dateView")

 let date = now.getDate();
 let hours = now.getHours();
 if (hours < 10) {
   hours = `0${hours}`
 }

 let min = now.getMinutes();
if (min < 10){
  min = `0${min}`
}

 let year = now.getFullYear()

let days = ["Sun",'Mon','Tue','Wed','Thu','Fri','Sat']

let day = days[now.getDay()]

let months = ["Jan","Feb","March","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
];
let month = months[now.getMonth()];

 dateView.innerHTML = `${day} ${hours}:${min} `
 console.log(dateView)


// weather description changes
  function displayWeather(response) {
    console.log(response.data)
    document.querySelector("#weather").innerHTML = response.data.name;
    document.querySelector("#Temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#descriptionWE").innerHTML = response.data.weather[0].description;
    document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed)
    
    celsiusTemp = response.data.main.temp

    let iconEle = document.querySelector("#icon")
    iconEle.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }


 function search(city) {
   let key = "977e7cf2f6ebb86ab22f897eca8c19de";
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
  
}
 search("saint louis")

 function searchCity(event) {
   event.preventDefault()
  let city = document.querySelector("#search-input").value;
  search(city)
 }
 
 
 let form = document.querySelector("#search");
 form.addEventListener("submit", searchCity);

function showPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c57da7dd69e31992e1e87848bd2d43df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}


function getCurrentPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#location")
button.addEventListener ("click", getCurrentPosition)


  function displayfaratemp (event){
    event.preventDefault();
    let tempratureElement = document.querySelector("#Temp")
    // remove the active class the celsius link
    celsiusLink.classList.remove("active")
    fahrenheitLink.classList.add("active")
 
    let faraTemp = ( celsiusTemp * 9) / 5 + 32;
    tempratureElement.innerHTML = Math.round(faraTemp);
 
 }

 function displaycelstemp (event) {
  event.preventDefault()
  let tempratureElement = document.querySelector("#Temp")
   // remove the active class the celsius link
   celsiusLink.classList.add("active")
   fahrenheitLink.classList.remove("active")

  tempratureElement.innerHTML = Math.round(celsiusTemp);
}



let celsiusTemp = null;






let fahrenheitLink = document.querySelector("#Flink")
fahrenheitLink.addEventListener("click", displayfaratemp)

let celsiusLink = document.querySelector("#Clink")
celsiusLink.addEventListener("click", displaycelstemp)






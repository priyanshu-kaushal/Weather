const api = {
    key: "ffed521ecef0e8781fb6e21adc9e7646",
    base: "https://api.openweathermap.org/data/2.5/"
}
const search = document.querySelector(".search-btn")
const searchBox = document.querySelector(".city-search");
search.addEventListener('click', setQuery);

function setQuery(){
    getResults(searchBox.value);
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResults)
}

function displayResults(weather){
    let cityName = document.querySelector('.location .city');
    cityName.innerText = `Weather in ${weather.name}, ${weather.sys.country} `

    let now = new Date();
    let date = document.querySelector('.current .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML =`${Math.round(weather.main.temp)}<span>°c</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
const api = {
    key: 'da4110ab504ba581c9588bc495781767',
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

let bglist = [
    "backgrounds/506838.jpg",
    "backgrounds/1267208.png",
    "backgrounds/1267221.jpg",
    "backgrounds/1267244.jpg",
    "backgrounds/2279188.jpg",
    "backgrounds/2279193.jpg",
    "backgrounds/506838.jpg",
    "backgrounds/854164.jpg",
    "backgrounds/wallpaperflare.com_wallpaper.jpg"
]


let bgimg = bglist[Math.floor(Math.random() * bglist.length)]

document.body.style.backgroundImage = "url(" + bgimg + ")";


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query) {

    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResults);
}


function displayResults(weather) {

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name},${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');

    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
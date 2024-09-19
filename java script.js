const apiKey = '4b5d7e4964bf5ed1388db4fad78a85a8'; 
function getWeatherByCity() {
    const city = document.getElementById('cityInput').value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found.");
                return;
            }

            document.getElementById('city').innerText = data.name;
            document.getElementById('temperature').innerText = `${data.main.temp} °C`;
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

          
            changeBackground(data.weather[0].main);
        })
        .catch(() => {
            alert("Unable to fetch weather data.");
        });
}

function changeBackground(weatherCondition) {
    const body = document.body;

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            body.style.background = "linear-gradient(to right, #fbc2eb, #a6c1ee)";
            break;
        case 'clouds':
            body.style.background = "linear-gradient(to right, #d7d2cc, #304352)";
            break;
        case 'rain':
            body.style.background = "linear-gradient(to right, #74ebd5, #acb6e5)";
            break;
        case 'snow':
            body.style.background = "linear-gradient(to right, #f0f2f0, #000c40)";
            break;
        case 'thunderstorm':
            body.style.background = "linear-gradient(to right, #414345, #232526)";
            break;
        default:
            body.style.background = "linear-gradient(to right, #74ebd5, #acb6e5)";
            break;
    }
}


window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
};

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('city').innerText = data.name;
            document.getElementById('temperature').innerText = `${data.main.temp} °C`;
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

          
            changeBackground(data.weather[0].main);
        });
}

function error() {
    alert("Unable to retrieve your location.");
}

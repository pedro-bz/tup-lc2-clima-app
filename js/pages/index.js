document.onload(addOptions())

function addOptions() {
    // Añade las ciudades almacenadas en el localStorage a las opciones disponibles.
    let cities = getCitiesFromLocalStorage()
    cities.forEach(city => {
        let citiesSelect = document.getElementById('added-cities');
        let newOption = document.createElement('option');
        let optionText = document.createTextNode(`${city}`);
        newOption.appendChild(optionText);
        newOption.setAttribute('value', `${city}`)
        citiesSelect.appendChild(newOption);
    });
}

let queryWeatherButton = document.getElementById('query-weather');
queryWeatherButton.addEventListener("click", function() {
    // Segun la ciudad seleccionada en el 'select', despliega el clima actual
    //   de la misma consultando a la API mediante el objeto 'weather'.
    let selectCity = document.getElementById('added-cities');
    let city = selectCity.value;
    if (city == 0) {
        alert("Seleccione una ciudad para consultar el clima. O agregue una nueva desde la pestaña 'Agregar Ciudad'.")
    } else {
        weather.fetchWeather(city);
    }
})

let weather = {
    // Objeto que realiza la consulta a la API. 
    // Despliega los datos del clima segun la ciudad seleccionada.

    "apiKey": "b3b87bb7357872ea9019cd072dbeea17",

    fetchWeather: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + this.apiKey + '&units=metric&lang=es')
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, pressure, humidity } = data.main;
        const { speed } = data.wind;
        
        document.querySelector(".card").style.display = "flex"
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText = "Estado actual: " + capitalize(description);
        document.querySelector(".temp").innerText = "Temperatura: " + temp + "°";
        document.querySelector(".feels-like").innerText = "Sensación Térmica: " + feels_like + "°";
        document.querySelector(".humidity").innerText = "Humedad: " + humidity + "%";
        document.querySelector(".wind").innerText = "Velocidad del viento: " + speed + "m/s";
        document.querySelector(".pressure").innerText = "Presión: " + pressure + " P";
    }
}

function getCitiesFromLocalStorage() {
    // Devuelve un array conteniendo las ciudades existentes en el localStorage.
    let cities = localStorage.getItem("CITIES");
    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

function capitalize(_string) {
    // Pone el primer caracter de cada palabra en el string en mayúsculas.
    const arr = _string.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const _string2 = arr.join(" ");
    return _string2
}
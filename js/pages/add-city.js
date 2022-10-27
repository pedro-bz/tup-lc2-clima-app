let addCityButton = document.getElementById("add-button");
addCityButton.addEventListener("click", async function () {
    // Toma la ciudad ingresada, y mediante las validaciones necesarias
    // determina si se agrega o no la ciudad al localStorage.

    let city = document.getElementById("new-city").value
    if (city == "" || city == " "){
        alert("Ingrese una ciudad para agregar")
    } else {
        cityToValidate.fetchCity(city)
    }
})

let cityToValidate = {
    // Objeto con la funcion de consultar a la API y, dependiendo de la respuesta,
    //  añade la ciudad al localStorage y/o despliega el mensaje correspondiente.
    
    "apiKey": "b3b87bb7357872ea9019cd072dbeea17",

    fetchCity: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + this.apiKey + '&units=metric&lang=es')
            .then((response) => response.json())
            .then((data) => this.cityAdding(data));
    },

    cityAdding: function (data) {
        const { name } = data;
        if (name == undefined || stringContainsNumber(name)) {
            showMessage("error")
        } else {
            console.log(name)
            let cities = getCitiesFromLocalStorage()
            if (cities.includes(name)) {
                showMessage("warning")
            } else if (!cities.includes(name)) {
                addNewCityToLocalStorage(name)
                showMessage("success")
            }
        }
    }
}

function addNewCityToLocalStorage(newCity) {
    // Añade la ciudad enviada como parametro al localStorage.
    let cities = getCitiesFromLocalStorage();
    cities.push(newCity);
    localStorage.setItem("CITIES", JSON.stringify(cities));
}

function showMessage(messageType) {
    // Determina, segun el parametro, qué mensaje mostrar.
    switch (messageType) {
        case "error":
            document.getElementById("error-msg").style.display = "block"
            document.getElementById("success-msg").style.display = "none"
            document.getElementById("warning-msg").style.display = "none"
            break;
        case "success":
            document.getElementById("error-msg").style.display = "none"
            document.getElementById("success-msg").style.display = "block"
            document.getElementById("warning-msg").style.display = "none"
            break;
        case "warning":
            document.getElementById("error-msg").style.display = "none"
            document.getElementById("success-msg").style.display = "none"
            document.getElementById("warning-msg").style.display = "block"
            break;
        default:
            break;
    }
}

document.onload = () => {
    loadLocalStorage();
};

function loadLocalStorage() {
    // La primera vez que se ingrese a la pagina ermite crear previamente 
    // la clave 'CITIES' en el localStorage para ser utilizada posteriormente.
    let cities = getCitiesFromLocalStorage()
    if (cities == []) {
        localStorage.setItem("CITIES", JSON.stringify(cities))
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
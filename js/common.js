document.onload = () => {
    firstLoadLocalStorage();
};

function firstLoadLocalStorage() {
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

function capitalize(_string) {
    // Pone el primer caracter de cada palabra en el string en mayúsculas.
    const arr = _string.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const _string2 = arr.join(" ");
    return _string2
}

function stringContainsNumber(_input) {
    // Verifica si un string contiene numeros o no.
    let string1 = String(_input);
    for (let i = 0; i < string1.length; i++) {
        if (!isNaN(string1.charAt(i)) && !(string1.charAt(i) == " ")) {
            return true;
        }
    }
    return false;
}
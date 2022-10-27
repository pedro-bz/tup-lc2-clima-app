let submitButton = document.getElementById('submit-button');
submitButton.addEventListener("click", function () {
    // Al hacer click en el boton 'Enviar', se validaran los datos y si todo
    //   sale bien, se limpiaran los campos. Simulando un submit.

    validateFields()
    cleanFields()
})

function validateFields() {
    // Valida que ningun campo este vacio y, a su vez, muestra el mensaje
    //      correspondiente dependiendo del error que exista.
    // Si todos los datos son correctos, muestra un mensaje satisfactorio.
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('sent-message');

    if (name.value == "" || name.value == " " || email.value == "" || email.value == " " || message.value == "" || message.value == " ") {
        alert("Debe completar todos los campos!")
    } else {
        if (stringContainsNumber(name.value)) {
            showMessage("error-2");
        } else if (validateEmail(email) == false) {
            showMessage("error-1");
        } else {
            showMessage("success");
        }
    }
}

function showMessage(messageType) {
    // Determina, segun el parametro, qué mensaje mostrar.
    switch (messageType) {
        case "error-1":
            document.getElementById("error-msg-1").style.display = "block"
            document.getElementById("error-msg-2").style.display = "none"
            document.getElementById("success-msg").style.display = "none"
            break;
        case "error-2":
            document.getElementById("error-msg-1").style.display = "none"
            document.getElementById("error-msg-2").style.display = "block"
            document.getElementById("success-msg").style.display = "none"
            break;
        case "success":
            document.getElementById("error-msg-1").style.display = "none"
            document.getElementById("error-msg-2").style.display = "none"
            document.getElementById("success-msg").style.display = "block"
            break;
        default:
            break;
    }
}

function cleanMessage() {
    // Limpia los mensajes de la pagina.
    document.getElementById("error-msg-1").style.display = "none"
    document.getElementById("error-msg-2").style.display = "none"
    document.getElementById("success-msg").style.display = "none"
}

function cleanFields() {
    // Limpia los campos una vez enviados.
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('sent-message').value = "";
}

function validateEmail(input) {
    // Verifica que el email ingresado tenga un formato correcto.
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}
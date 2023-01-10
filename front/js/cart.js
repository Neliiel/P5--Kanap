// On récupère le formulaire HTML
let form = document.getElementsByClassName("cart__order__form");

//************FIRST NAME************

//On écoute la modification du firstName
form.firstName.addEventListener("change", function() {
    validFirstName(this);

//Création de la RegExp pour le firstName
const validFirstName = function(inputfirstName) {
    let firstNameRegExp = new RegExp (
        '^[a-zA-Z-]+$', 'g'
    );
}

//Test du RegExp firstName
let testFirstName = firstNameRegExp.test(inputfirstName.value);
let textFirstName = inputfirstName.getElementsById("firstNameErrorMsg");

if(testFirstName) {
    textFirstName.innerHTML = 'Prénom valide';
} else {
    textFirstName.innerHTML = 'Prénom invalide';
}
});

//************LAST NAME************

//On écoute la modification du lastName
form.lastName.addEventListener("change", function() {
    validLastName(this);

//Création de la RegExp pour le lastName
const validLastName = function(inputlastName) {
    let lastNameRegExp = new RegExp (
        '^[a-zA-Z-]+$', 'g'
    );
}

//Test du RegExp firstName
let testLastName = lastNameRegExp.test(inputlastName.value);
let textLastName = inputlastName.getElementsById("lastNameErrorMsg");

if(testLastName) {
    textLastName.innerHTML = 'Prénom valide';
} else {
    textLastName.innerHTML = 'Prénom invalide';
}
});
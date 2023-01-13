//Récupération des produits du localStorage

let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));


//Récupération de l'API


//Création du tableau HTML récapitulatif des produits

if (productsInLocalStorage) {
    
fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then((data) => {
  console.log(data);

    for(i = 0; i < productsInLocalStorage.length; i++) {
        let productLinea = document.getElementById("cart__items").innerHTML +=
            `<article class="cart__item" data-id="${data[i]._id}" data-color="${data[i].colors}">
            <div class="cart__item__img">
              <img src="${data[i].imageUrl}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data[i].name}</h2>
                <p>${productsInLocalStorage[i].color}</p>
                <p>${data[i].price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsInLocalStorage[i].qty}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`
    }
    
})} else {
    
};































/*// On récupère le formulaire HTML
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
});*/
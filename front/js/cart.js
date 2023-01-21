//Récupération des produits du localStorage
 
let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));


//Création du tableau HTML récapitulatif des produits

if (productsInLocalStorage) {

      fetch("http://localhost:3000/api/products")
      .then(response => response.json())
      .then((data) => {
        console.log(data);

    for(i = 0; i < productsInLocalStorage.length; i++) {

        let productLinea = document.getElementById("cart__items").innerHTML +=
            `<article class="cart__item" data-id="${productsInLocalStorage[i].id}" data-color="${productsInLocalStorage[i].color}">
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
    };
  })} else {
};

//SUPPRESSION D'UN ARTICLE


function removeProduct() {

  // On récupère le bouton à écouter
  const removeButton = document.querySelectorAll(".deleteItem");

  //on écoute le bouton supprimer

for (let i = 0; i < productsInLocalStorage.length; i++) {
  removeButton[i].addEventListener('click', (e) => {
    // On empèche l'action par défaut
    e.preventDefault();

    //On filtre les produits

    productsInLocalStorage = productsInLocalStorage.filter(el => el.id != productsInLocalStorage[i].id || el.color != productsInLocalStorage[i].color)

    //Modification dans le localStorage
    localStorage.setItem("products", JSON.stringify(productsInLocalStorage));

    //On indique que le produit à bien été supprimé
    alert("Le produit a été supprimer avec succès");
  })
}
};

//Appel de la fonction Supprimer Article
removeProduct();
























/*
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
});*/
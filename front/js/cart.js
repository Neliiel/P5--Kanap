import productTmpl from "./templates/productTmpl.js"

//Récupération des produits du localStorage
 

const response = await fetch("http://localhost:3000/api/products")
const data = await response.json()




//Création du tableau HTML récapitulatif des produits

if (JSON.parse(localStorage.getItem("products"))) {

  const response = await fetch("http://localhost:3000/api/products")
  const data = await response.json()
  console.log(data);
  
  JSON.parse(localStorage.getItem("products")).forEach(productInLocalStorage => {
    const product = data.find(item => item._id === productInLocalStorage.id)
    const productArticle = document.createElement("article")
    productArticle.setAttribute("data-id", productInLocalStorage.id)
    productArticle.setAttribute("data-color", productInLocalStorage.color)
    productArticle.classList.add("cart__item")
    productArticle.innerHTML = productTmpl
    productArticle.querySelector(".cart__item__img--img").setAttribute("src", product.imageUrl)
    productArticle.querySelector(".cart__item--name").innerText = product.name
    productArticle.querySelector(".cart__item--color").innerText = productInLocalStorage.color
    productArticle.querySelector(".cart__item--price").innerText = `${product.price}€`
    productArticle.querySelector(".itemQuantity").setAttribute("value", productInLocalStorage.qty)
    productArticle.querySelector(".itemQuantity").addEventListener('change', updateQuantity)
    document.getElementById("cart__items").appendChild(productArticle)
     
  })
} else {
};

// Montant total des articles

  // Calcul de la quantité totale

function totalProductQuantity() {
  const {quantity, price} = JSON.parse(localStorage.getItem("products")).reduce ((acc, cur) => {
    const product = data.find(item => item._id === cur.id)
    acc.quantity += +cur.qty
    acc.price += +product.price * +cur.qty
    return acc
  }, {quantity : 0, price : 0})
  
  console.log('TotalQuantity: ', quantity)
  console.log('Total Price: ', price)
}

totalProductQuantity();


// Changer la quantité d'un article

function updateQuantity(event) {
  
      event.preventDefault();
      const cartItem = event.target.closest('.cart__item')
      const productId = cartItem.getAttribute("data-id");
      const productColor = cartItem.getAttribute("data-color");
      const inputValue = event.target.value;


  localStorage.setItem("products", JSON.stringify(JSON.parse(localStorage.getItem("products")).map((product) => {
    if(product.id === productId && product.color === productColor) {
      product.qty = +inputValue;
    }
    return product
  })));

  totalProductQuantity();
}




//SUPPRESSION D'UN ARTICLE


/*function removeProduct() {

  // On récupère le bouton à écouter
  let removeButton = document.querySelectorAll(".deleteItem");

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
  };
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
});
*/
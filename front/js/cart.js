// Importation du template

import productTmpl from "./templates/productTmpl.js"

let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

// Récupération des produits du localStorage
 
const response = await fetch("http://localhost:3000/api/products")
const data = await response.json()

// Création du tableau HTML récapitulatif des produits

const displayProductInCart = async() => {
  document.getElementById("cart__items").innerHTML = ''
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
    productArticle.querySelector(".deleteItem").addEventListener('click', removeProduct)
    document.getElementById("cart__items").appendChild(productArticle)
  })
}
if (JSON.parse(localStorage.getItem("products"))) {

displayProductInCart();

} else {
};

// Montant total des articles

  // Calcul de la quantité totale et du prix total

function totalProductQuantity() {
  const {quantity, price} = JSON.parse(localStorage.getItem("products")).reduce ((acc, cur) => {
    const product = data.find(item => item._id === cur.id)
    acc.quantity += +cur.qty
    acc.price += +product.price * +cur.qty
    return acc
  }, {quantity : 0, price : 0})
  
  console.log('TotalQuantity: ', quantity)
  console.log('Total Price: ', price)

  document.getElementById("totalQuantity").innerText = quantity;
  document.getElementById("totalPrice").innerText = price;
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

function removeProduct(event) {
  
  const cartItem = event.target.closest('.cart__item')
  const productId = cartItem.getAttribute("data-id");
  const productColor = cartItem.getAttribute("data-color");
  
  localStorage.setItem("products", JSON.stringify(JSON.parse(localStorage.getItem("products")).filter((product) => {
  return product.id != productId && product.color != productColor
  })));

totalProductQuantity();
displayProductInCart();
} 

// VALIDATION FORMULAIRE AVEC REGEX

// Création des expressions régulières

// /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+$/ 

const textRegex = /^[a-zA-Z-\s]+$/
const addressRegex = /^[a-zA-Z0-9\s]+$/
const cityRegex = /^[a-zA-Z-\s]+$/
const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]+$/

// Récupération des éléments à écouter

let inputFirstName = document.getElementById("firstName")
let inputLastName = document.getElementById("lastName")
let inputAddress = document.getElementById("address")
let inputCity = document.getElementById("city")
let inputEmail= document.getElementById("email")

//Récupération pour les messages d'erreurs

let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
let addressErrorMsg = document.getElementById("addressErrorMsg")
let cityErrorMsg = document.getElementById("cityErrorMsg")
let emailErrorMsg = document.getElementById("emailErrorMsg")

// Ecoute du contenu Prénom

const validFirstName = inputFirstName.addEventListener('change', function() {
  let checkFirstName = textRegex.test(inputFirstName.value);

  if (checkFirstName) {
    firstNameErrorMsg.innerText = '';
    return true
  } else {
    firstNameErrorMsg.innerText = 'Veuillez indiquer un prénom valide'
    return false
  }
});

// Ecoute du contenu Nom

const validLastName = inputLastName.addEventListener('change', function() {
  let checkLastName = textRegex.test(inputLastName.value);

  if (checkLastName) {
    lastNameErrorMsg.innerText = '';
    return true
  } else {
    lastNameErrorMsg.innerText = 'Veuillez indiquer un nom valide'
    return false
  }
});

//Ecoute du contenu de l'adresse

const validAdress = inputAddress.addEventListener('change', function() {
  let checkaddress = addressRegex.test(inputAddress.value);

  if (checkaddress) {
    addressErrorMsg.innerText = '';
    return true
  } else {
    addressErrorMsg.innerText = 'Veuillez indiquer une adresse valide'
    return false
  }
});

// Ecoute du contenu de la ville

const validCity = inputCity.addEventListener('change', function() {
  let checkCity = cityRegex.test(inputCity.value);

  if (checkCity) {
    cityErrorMsg.innerText = '';
    return true
  } else {
    cityErrorMsg.innerText = 'Veuillez indiquer une ville valide'
    return false
  }
});

// Ecoute du contenu de l'email

const validEmail = inputEmail.addEventListener('change', function() {
  let checkEmail = emailRegex.test(inputEmail.value);

  if (checkEmail) {
    emailErrorMsg.innerText = '';
    return true
  } else {
    emailErrorMsg.innerText = 'Veuillez indiquer une adresse mail valide'
    return false
  }
});

// COMMANDER

// Récupération du bouton commander

let submitButton = document.getElementById("order");

// On écoute le bouton commander

submitButton.addEventListener('submit', (event) => {
  event.preventDefault();
  if(productsInLocalStorage === null || productsInLocalStorage === []) {
    alert("Votre panier est vide!");
  // On vérifie que les champs sont correctement rempli avec Regex
  } else if(validFirstName && validLastName && validAdress && validCity && validEmail) {
    // on récupère l'id des produits du local storage
    productsInLocalStorage.forEach(productInLocalStorage => {
      const productId = data.find(item => item._id === productInLocalStorage.id)
    });
    // on crée une constante pour mettre les infos produits et contacts
    const order = {
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: {
        'product-ID': productId,
      },
    }
    // On envoie les données à l'API
    const submitOrder = async() => {
    let response = await fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    });
    
    let result = await response.json();
    alert(result.message);
  }
  } else {
    alert ("Veuillez remplir correctement le formulaire");
  }});
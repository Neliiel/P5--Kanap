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
    productArticle.querySelector(".deleteItem").addEventListener('click', removeProduct)
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


function removeProduct(event) {
  
  const cartItem = event.target.closest('.cart__item')
  const productId = cartItem.getAttribute("data-id");
  const productColor = cartItem.getAttribute("data-color");
  


localStorage.setItem("products", JSON.stringify(JSON.parse(localStorage.getItem("products")).filter((product) => {
if(product.id != productId && product.color != productColor) {

}
return product
})));

totalProductQuantity();
} 



// VALIDATION FORMULAIRE AVEC REGEX

// Création des expressions régulières

const textRegex = /^[a-zA-Z-]+$/
const addressRegex = /^[0-9]+[a-zA-Z-]+$/
const cityRegex = /^[a-zA-Z-]+$/
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

inputFirstName.addEventListener('change', function() {
  let checkFirstName = textRegex.test(inputFirstName.value);

  if (checkFirstName) {
    firstNameErrorMsg.innerText = '';
  } else {
    firstNameErrorMsg.innerText = 'Veuillez indiquer un prénom valide'
  }
});

// Ecoute du contenu Nom

inputLastName.addEventListener('change', function() {
  let checkLastName = textRegex.test(inputLastName.value);

  if (checkLastName) {
    lastNameErrorMsg.innerText = '';
  } else {
    lastNameErrorMsg.innerText = 'Veuillez indiquer un nom valide'
  }
});

//Ecoute du contenu de l'adresse

inputAddress.addEventListener('change', function() {
  let checkaddress = addressRegex.test(inputAddress.value);

  if (checkaddress) {
    addressErrorMsg.innerText = '';
  } else {
    addressErrorMsg.innerText = 'Veuillez indiquer une adresse valide'
  }
});

// Ecoute du contenu de la ville

inputCity.addEventListener('change', function() {
  let checkCity = cityRegex.test(inputCity.value);

  if (checkCity) {
    cityErrorMsg.innerText = '';
  } else {
    cityErrorMsg.innerText = 'Veuillez indiquer une ville valide'
  }
});

inputEmail.addEventListener('change', function() {
  let checkEmail = emailRegex.test(inputEmail.value);

  if (checkEmail) {
    emailErrorMsg.innerText = '';
  } else {
    emailErrorMsg.innerText = 'Veuillez indiquer une adresse mail valide'
  }
});
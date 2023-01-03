/* Création des functions utiles à la gestion du panier via le localStorage */

/* Sauvegarder le panier dans le localStorage */

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

/* Récupérer le panier via le localStorage */

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}

/* Ajouter des produits au panier */

function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find (p => p.id == product.id);

    if(foundProduct != undefined) {
        foundProduct.quantity ++;
    } else {
        product.quantity = 1;
        basket.push(product);
    }

    saveBasket(basket);
}

/* Retirer des produits du panier */

function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter (p => p.id != product.id)
    saveBasket(basket);
}

/* Changer la quantité d'un produit */

function changeQty (product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find (p => p.id == product.id);

    if(foundProduct != undefined) {
        foundProduct.quantity += quantity;

        if(foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
        } else {
            saveBasket(basket);
        }
    }
}

/* Calcul de la quantité */

function getNumberProduct() {
    let basket = getBasket();
    let number = 0;

    for(let product of basket) {
        number += product.quantity;
    }
    return number;
    }
}
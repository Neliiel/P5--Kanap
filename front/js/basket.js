/* Sauvegarder le panier dans le localStorage*/

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

/*Récupérer le panier*/

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}

/* Ajout de produits dans le panier */

function addBasket (product) {
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

/* Retirer produit du panier */

function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter (p => p.id != product.id);
    saveBasket(basket);
}

/* Changer la quantité */

function changeQuantity (product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find (p => p.id == product.id);
        if(foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if(foundProduct.quantity <= 0) {
                removeFromBasket (foundProduct);
            }
        } else {
            saveBasket(basket);
        }
}

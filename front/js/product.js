// ****** AFFICHAGE DU BON PRODUIT VIA L'ID ******

let str = window.location.href;
let url = new URL(str)
let id = url.searchParams.get("id");
console.log(id);
let idUrl = "http://localhost:3000/api/products/" + id;

// Création de la carte produit

function productCard() {
    fetch(idUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            let img = document.querySelector(".item__img").innerHTML +=
                `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
            let name = document.querySelector("#title").innerHTML +=
                `${data.name}`;
            let price = document.querySelector("#price").innerHTML +=
                `${data.price}`;
            let descritpion = document.querySelector("#description").innerHTML +=
                `${data.description}`;
            printColor(data.colors);
        });
};

// On met en place le choix de la couleur

function printColor(colors) {
    let colorDom = document.getElementById("colors");
    colors.forEach(color => { 
        let opt = document.createElement("option");
        opt.textContent = color;
        opt.value = color;
        colorDom.appendChild(opt);
    });
}

// On appel le produit

productCard();

// ****** AJOUTER AU PANIER ******

// Récupération du bouton "Ajouter au panier" 
const button = document.getElementById("addToCart");

// On écoute le bouton "Ajouter au panier" 
button.addEventListener("click", (e) => {
    const color = document.getElementById("colors").value;
    const qty = document.getElementById("quantity").value;

// Création de l'objet produit 
let product = {
    id : id,
    color : color,
    qty : qty
}

// Récupération des éléments du localStorage 
let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

// Récupération des données utilisateurs 
    // On vérifie que la quantité et la couleur sont bien indiqué
    if (qty < 1 || qty > 100 || qty === undefined || color === "" || color === undefined) {
        alert("Veuillez selectionner une couleur et une quantité (comprise entre 1 et 100)")
    } else {
        // Si le Local Storage est vide on crée un tableau vide
        if (productsInLocalStorage === null) {
            productsInLocalStorage = [];
            productsInLocalStorage.push(product);
            localStorage.setItem("products", JSON.stringify(productsInLocalStorage));
            alert("Produit(s) ajouté(s) au panier avec succès!");
        // Sinon on cherche le produit
        } else {
            let foundProduct = productsInLocalStorage.find(element => element.id == product.id && element.color == product.color);

                if (foundProduct == undefined) {
                    productsInLocalStorage.push(product);
                    localStorage.setItem("products", JSON.stringify(productsInLocalStorage));
                    alert("Produit(s) ajouté(s) au panier avec succès!");

                } else {
                    let newProductsInLocalStorage = [];
                    newProductsInLocalStorage = productsInLocalStorage.filter(element => element.id != product.id && element.color != product.color);
                
                    let newQuantity = parseInt(foundProduct.qty) + parseInt(product.qty);

                        if (newQuantity > 100) {
                            alert("Erreur : total de la quantité supérieur à 100");

                        } else {
                        foundProduct.qty = newQuantity;
                        newProductsInLocalStorage.push(foundProduct);
                        localStorage.setItem("products", JSON.stringify(newProductsInLocalStorage));
                        alert("Produit(s) ajouté(s) au panier avec succès!")
                        } 
                }
            }
            
        }
    }
);
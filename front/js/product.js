/*Recupération du produit via l'id*/

let str = window.location.href;
let url = new URL(str)
let id = url.searchParams.get("id");
console.log(id);
let idUrl = "http://localhost:3000/api/products/" + id;

/*Création de la carte produit*/

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

/* Option couleurs*/

function printColor(colors) {
    let colorDom = document.getElementById("colors");
    colors.forEach(color => { 
        let opt = document.createElement("option");
        opt.textContent = color;
        opt.value = color;
        colorDom.appendChild(opt);
    });
}

/*Appel du produit*/

productCard();


/* Récupération du bouton "Ajouter au panier" */

const button = document.getElementById("addToCart");

/* Ecoute du bouton "Ajouter au panier" */

button.addEventListener("click", (e) => {
    const color = document.getElementById("colors").value;
    const qty = document.getElementById("quantity").value;

/* Récupération des données utilisateurs */

let product = {
    idProduct : id,
    colorProduct : color,
    qtyProduct : qty,
}

if(qty < 1 || qty > 100 || qty === undefined || color === "" || color === undefined) {
    alert("Veillez selectionner une couleur et une quantité (comprise entre 1 et 100)")

}else{
/* Ajout du produit dans le localStorage */

let productLinea = JSON.stringify(product);
localStorage.setItem("product",productLinea);}

});


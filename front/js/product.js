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

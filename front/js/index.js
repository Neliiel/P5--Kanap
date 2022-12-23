/*Envoie d'une requête au site web pour récupérer les produits*/

let articleUrl = function () {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then((data) => { console.log(data);

        let articlesSection = document.querySelector("#items");

        for (i = 0; i < data.length; i++) {
            let articlesCard = articlesSection.innerHTML += 
                                                    `<a href="./product.html?id=${data[i]._id}">
                                                    <article>
                                                      <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
                                                      <h3 class="productName">${data[i].name}</h3>
                                                      <p class="productDescription">${data[i].description}</p>
                                                    </article>
                                                  </a>`;
         }
    });
};

articleUrl();

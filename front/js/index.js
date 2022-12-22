/*Envoie d'une requête au site web pour récupérer les produits*/

fetch("http://localhost:3000/api/products")
    .then(function(file) {
        if (file.ok) {
            return file.json();
        }
    })
    .then(function(jsonlistArticle) {
        console.log(jsonlistArticle); {
            for(let jsonArticle of jsonlistArticle){
                let article = new Article(jsonArticle);
                document.querySelector(".items").innerHTML += `<a href="./product.html?id=42">
                                                                    <article>
                                                                        <img src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, ${article.name}">
                                                                        <h3 class="productName">${article.name}</h3>
                                                                        <p class="productDescription">${article.description}</p>
                                                                    </article>
                                                                </a>`;
            }
        }
    })
    .catch(function(err){
        //Une erreur est survenue
    });
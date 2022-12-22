/*Représentation du format d'un article*/

class Article{
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle);
    }
}
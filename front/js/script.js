/*
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    // manipuler les données pour les afficher dans le DOM
    const catalogueElement = document.getElementById('catalogue');
    data.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.textContent = item.nom;
      catalogueElement.appendChild(itemElement);
    });
  })
  .catch(error => console.error(error));

   // Créer l'élément "a"
   const linkElement = document.createElement('a');
   linkElement.href = './product.html?id=42';
   
   // Créer l'élément "article"
   const articleElement = document.createElement('article');
   
   // Créer l'élément "img"
   const imgElement = document.createElement('img');
   imgElement.src = '.../product01.jpg';
   imgElement.alt = 'Lorem ipsum dolor sit amet, Kanap name1';
   articleElement.appendChild(imgElement);
   
   // Créer l'élément "h3" pour le nom du produit
   const nameElement = document.createElement('h3');
   nameElement.classList.add('productName');
   nameElement.textContent = 'Kanap name1';
   articleElement.appendChild(nameElement);
   
   // Créer l'élément "p" pour la description du produit
   const descriptionElement = document.createElement('p');
   descriptionElement.classList.add('productDescription');
   descriptionElement.textContent = 'Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.';
   articleElement.appendChild(descriptionElement);
   
   // Ajouter l'élément "article" à l'élément "a"
   linkElement.appendChild(articleElement);
   
   // Ajouter l'élément "a" à la page
   document.body.appendChild(linkElement);
*/


// récupération des données de l'API
function getDatasFromApi(url) {


    fetch(url)
    .then(response => response.json())
    .then(products => {
      // manipuler les données pour les afficher dans le DOM
      showProducts( products);


    })
    .catch(error => {
        console.error("Le produit est introuvable", error);
        // TODO message à l'utilisateur
        showAlertError("Une erreur est survenue, merci de revenir plus tard");
    });

}

function showProducts( products) {
    // définition des variables

    // initialisation des variabes
//ou logique ||
//et logique &&
    //contrôle
    if ( products==null || products.length==0) {
        console.log('showProducts : la variable products est vide ');
        return;
    }

    // action
     console.log(products);
    products.forEach(item => {
        showProduct(item);
      });

    //paramètre de retour


}

function showProduct(product) {
    const catalogue=document.getElementById('items');
    const linkElement = document.createElement('a');
    const articleElement = document.createElement('article');
    const imgElement = document.createElement('img');
    const h3Element = document.createElement('h3');
    const pElement = document.createElement('p');



   //<h3 class="productName">Kanap name1</h3>
   //<p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    linkElement.href = './product.html?id=' + product._id;

    imgElement.src = product.imageUrl;
    imgElement.alt = product.altTxt;

    h3Element.textContent=product.name;
    h3Element.className="productName";

    pElement.textContent=product.description;
    pElement.className="productDescription";

    articleElement.appendChild(imgElement);
    articleElement.appendChild(h3Element);
    articleElement.appendChild(pElement);
    linkElement.appendChild(articleElement);
    catalogue.appendChild(linkElement);



    /*
    const catalogueElement = document.getElementById('catalogue');
    const itemElement = document.createElement('div');
        itemElement.textContent = item.nom;
        catalogueElement.appendChild(itemElement);
        */
}
/* ancienne version pour afficher l'url du produit
function getProductUrl(productId) {
  var baseUrl = "http://localhost:3000/api/products";
  var url = productname + productId;
  return url;
}*/

function main() {
    
    let url='http://localhost:3000/api/products';
    getDatasFromApi(url);
}
// Fonction permettant de prévenir l'utilisateur d'un message d'alerte
function showAlert(message, bgColor, color) {

  const balises = document.getElementsByTagName('body');
  let divMsg = document.getElementById("message");
  if (divMsg === null) {
      divMsg = document.createElement('div');
      divMsg.id = "message";
  }
  divMsg.style.display="block";
  divMsg.style.color = color;
  divMsg.style.background = bgColor;
  divMsg.style.padding="20px";
  divMsg.style.position="fixed";
  divMsg.style.top="50px";
  divMsg.style.left="50px";
  divMsg.style.zIndex="9999";
  divMsg.style.borderRadius="20px";

  divMsg.textContent = message;
  balises[0].appendChild(divMsg);
  // Fonction permettant d'afficher l'alerte au bout d'une seconde
  setTimeout(() => {
      divMsg.style.display="none";
  }, 2000)
}

// Prévient l'utilisateur d'une alerte avec un message d'erreur indiquant une couleur rouge
function showAlertError(message) {
  showAlert(message, '#f44336', 'white');
  
}
// Prévient l'utilisateur d'une alerte avec un message de succés indiquant une couleur verte
function showAlertSucces(message) {
  showAlert(message, '#5cb811', 'white');
}

 main();



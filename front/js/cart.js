
let CART_DATAS;
let CATALOGUE;

function getCartFromLocalStorage() {
    CART_DATAS= JSON.parse(localStorage.getItem('cart'));
}

function hideForm() {
    const formCmd= document.getElementsByTagName('form');
    formCmd[0].style.display="none";
}

// récupération des données de l'API
function getDatasFromApi(url) {


    fetch(url)
    .then(response => response.json())
    .then(products => {
      // manipuler les données pour les afficher dans le DOM
        CATALOGUE=products;

        showCart(CART_DATAS, CATALOGUE);
    })
    .catch(error => {
        console.error("Le produit est introuvable", error);
        // TODO message à l'utilisateur
        showAlertError("Une erreur est survenue, merci de revenir plus tard");
    });

}

function showCart(cart, catalogue) {
    
    const cart__items=document.getElementById('cart__items');

    cart.forEach(item => {
        let itemCatalogue= getItemFromCatalogue(catalogue, item.id);
        
        cart__items.appendChild( getOneProductOfCart(item,itemCatalogue));
      });

      showQuantityGlobal(cart);
      showPriceGlobal(cart,catalogue);

}

function showQuantityGlobal(cart) {
    let qty=0;
    cart.forEach( item => { qty = qty + Number(item.qty) });
    document.getElementById('totalQuantity').innerHTML=qty;
}

function showPriceGlobal(cart,catalogue) {
    let price=0;
    cart.forEach( item => { 
        let itemCatalogue=getItemFromCatalogue(catalogue, item.id)
        price = price + (Number(item.qty) * itemCatalogue.price);
    });
    document.getElementById('totalPrice').innerHTML=price;
}

function getItemFromCatalogue(catalogue, id) {
    return catalogue.find(item => item._id==id);
}

function getOneProductOfCart(dataInLocalStorage, dataInCatalogue) {
  const article= document.createElement('article') ;
  article.classList.add('cart__item');
  article.dataset.id=dataInLocalStorage.id;
  article.dataset.color=dataInLocalStorage.color;

  const divimg= document.createElement('div');
  divimg.classList.add('cart__item__img');
  article.appendChild(divimg);

  const img= document.createElement('img');
  img.src=dataInCatalogue.imageUrl;
  img.alt=dataInCatalogue.altText;
  divimg.appendChild(img);

  const divcontent= document.createElement('div');
  divcontent.classList.add('cart__item__img');
  article.appendChild(divcontent);

  const divcontentDescription= document.createElement('div');
  divcontentDescription.classList.add('cart__item__content__description');
  divcontent.appendChild(divcontentDescription);

  
  const h2= document.createElement('h2');
  h2.textContent=dataInCatalogue.name;
  divcontentDescription.appendChild(h2);

  let p1= document.createElement('p');
  p1.textContent=dataInLocalStorage.color;
  divcontentDescription.appendChild(p1);

  const p2= document.createElement('p');
  p2.textContent=dataInCatalogue.price + " €";
  divcontentDescription.appendChild(p2);

  
  const divcontentSettings= document.createElement('div');
  divcontentSettings.classList.add('cart__item__content__settings');
  divcontent.appendChild(divcontentSettings);

    
  const divcontentSettingsQty= document.createElement('div');
  divcontentSettingsQty.classList.add('cart__item__content__settings__quantity');
  divcontentSettings.appendChild(divcontentSettingsQty);

  
  p1= document.createElement('p');
  p1.textContent=" Qté :";
  divcontentSettingsQty.appendChild(p1);

  let input= document.createElement('input');
  input.type="number";
  input.classList.add('itemQuantity');
  input.min="1";
  input.max="100";
  input.value=dataInLocalStorage.qty;
  input.name="itemQuantity";
  input.addEventListener('input',()=> changeQty(dataInLocalStorage, input) );
  divcontentSettingsQty.appendChild(input);

  const divcontentSettingsDelete= document.createElement('div');
  divcontentSettingsDelete.classList.add('cart__item__content__settings__delete');
  divcontentSettings.appendChild(divcontentSettingsDelete);

  let pDelete= document.createElement('p');
  pDelete.textContent="Supprimer";
  pDelete.classList.add('deleteItem');
  pDelete.addEventListener('click',()=> deleteItem(dataInLocalStorage) );
  divcontentSettingsDelete.appendChild(pDelete);

  return article;
  
}

function deleteItem(item) {

  //suppression au niveau de l'affichage
  const article=document.querySelector("article[data-id='"+ item.id +"'][data-color='"+ item.color +"']");
  article.remove();

  let index= CART_DATAS.findIndex((i) => i.id == item.id && i.color==item.color);
  CART_DATAS.splice(index,1);

  localStorage.setItem('cart', JSON.stringify(CART_DATAS));

  showQuantityGlobal(CART_DATAS);
  showPriceGlobal(CART_DATAS,CATALOGUE); 
  showAlertSucces('Le produit a bien été supprimé du panier');
  if(CART_DATAS==null || CART_DATAS.length==0) {
    showAlertError('Attention le panier est vide');
    hideForm();
  }
}


function changeQty(item, input){

  let sameProduct= CART_DATAS.find((i) => i.id == item.id && i.color==item.color);
  sameProduct.qty= Number(input.value);
  if (sameProduct.qty > 100) {
    showAlertSucces('La quantité est limitée à 100');
    sameProduct.qty= 100;
  }
  input.value=sameProduct.qty;
  
  localStorage.setItem('cart', JSON.stringify(CART_DATAS));

  
  showQuantityGlobal(CART_DATAS);
  showPriceGlobal(CART_DATAS,CATALOGUE);
}

function main() {
    getCartFromLocalStorage();
    console.log(CART_DATAS);
    if(CART_DATAS==null || CART_DATAS.length==0) {
        showAlertError('Attention le panier est vide');
        hideForm();
        return;
    }
    let url='http://localhost:3000/api/products';
    getDatasFromApi(url);
}

main();




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
  
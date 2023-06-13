










function getIdFromUrl(){
    let params= new URLSearchParams(window.location.search);
    return params.get('id');
}
// récupération des données de l'API
function getProductFromApi(url, id) {


    fetch(url + "/" + id)
    .then(response => response.json())
    .then(product => {
      // manipuler les données pour les afficher dans le DOM
        showProduct( product);
        


    })
    .catch(error => {
        console.error("Le produit est introuvable", error);
        // TODO message à l'utilisateur
        showAlertError("Une erreur est survenue, merci de revenir plus tard");
    });

}

function showProduct(product) {

    //image
    let img= document.createElement('img');
    let item_img= document.getElementsByClassName('item__img');
    img.src= product.imageUrl;
    img.alt = product.altTxt;
    item_img[0].appendChild(img);

    //titre
    document.getElementById('title').textContent = product.name;

    //prix
    document.getElementById('price').textContent = product.price;

    //description
    document.getElementById('description').textContent = product.description;

    //colors
    let html_colors=document.getElementById('colors');
    let colors=product.colors;
    colors.forEach((color) => {
        let option = document.createElement('option');
        option.value=color;
        option.textContent=color;
        html_colors.appendChild(option);
    })

}


function main() {
    let url='http://localhost:3000/api/products';
    let id=getIdFromUrl();
    
    if (id=="" || id==null) {
        showAlertError('Il n\'y a pas d\' id dans l\'URL');
        return;
    }

    getProductFromApi(url, id);

    addEventToBtn();


}

function addEventToBtn(){
    const button= document.getElementById('addToCart');
    button.addEventListener('click',addToBasket);
}

function addToBasket() {
    console.log('ajout au panier');

    const product= getProductFromForm();
    
    if(! checkForm(product)) {
        return;
    }

    const cart = getCartFromLocalStorage();
    console.log(cart);

    if (cart.length ==0 ) {
        cart.push(product);

    } else {
        let sameProduct= cart.find((i) => i.id == product.id && i.color==product.color);
        if (sameProduct==undefined) {
            cart.push(product);
        } else {
            sameProduct.qty= Number(sameProduct.qty) + Number(product.qty);
            sameProduct.qty= sameProduct.qty > 100 ? 100 : sameProduct.qty;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showAlertSucces('Le produit a été ajouté au panier');
}

function getCartFromLocalStorage() {
    let cart= localStorage.getItem('cart');
    return cart==null ? [] : JSON.parse(cart);
/*
    // version 1
    if (cart==null) {
        return []
    } else {
        return JSON.parse(cart);
    }

    // version 2
    if (cart==null) {
        return []
    }
    return JSON.parse(cart);
    */
}



function getProductFromForm() {
    const qty= document.getElementById('quantity').value;
    const color= document.getElementById('colors').value;
    return {
        'id': getIdFromUrl(),
        'qty': qty,
        'color':color
    }
}

function checkForm(product){
    
    if (product.color==null || product.color=="" ) {
        showAlertError('Merci de choisir une couleur');
        return false;
    }
    if (product.qty<=0 || product.qty > 100 || product.qty==null) {
        showAlertError('Merci de saisir une quantité comprise entre 1 et 100');
        return false;
    }
    return true;
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
  
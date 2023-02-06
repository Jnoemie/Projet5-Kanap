//recuperation de local storage 
var ProductLocalStorage = JSON.parse(localStorage.getItem("Basketitems"));

//titre de la page html

document.title = "Panier"

// creation d'un tableau pour recuperer les informations pour la confirmation 

let products = [];

// creation d'une fonction pour recuperer les information dans l'api 
function getDataFromAPI(productId) {
    let response = fetch('http://localhost:3000/api/products/' + productId)
        .then(data => {
            return data.json();
        })
        .catch(error => {
            error = `Une erreur s'est produite au chargement de la page, veuillez réessayer.`;
            alert(error);
        })
    //console.log(response)
    return response;
}

// creation de la fonction pour recuperer et placer les données

async function displayBasket() {

    if (ProductLocalStorage === null || ProductLocalStorage.length === 0) {
        document.querySelector('h1').textContent = 'Votre panier est vide';
    } else {
        document.querySelector('h1').textContent = ' Voici votre panier ';

        for (let i = 0; i < ProductLocalStorage.length; i++) {
            let item = ProductLocalStorage[i];
            //console.log(item)

            let data = await getDataFromAPI(item.id);
            //console.log (data)

            document.getElementById('cart__items').innerHTML +=
                `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
            <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${item.color}</p>
                <p>${data.price}€</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
        </article>`;


            products.push(item.id);

            deleteItem();
            additem();
            TotalPriceQuantity();

        }
    }
}

// creation de la fonction du calcul de prix et de quantité
displayBasket();

async function TotalPriceQuantity() {

    var quantityTotalCalcul = 0;
    var priceTotalCalcul = 0;

    for (let i = 0; i < ProductLocalStorage.length; i++) {

        let dataItem = await getDataFromAPI(ProductLocalStorage[i].id);
        //console.log(dataItem)

        let quantitybasket = ProductLocalStorage[i].quantity;
        quantityTotalCalcul += parseInt(quantitybasket);


        //console.log(dataItem.price)
        //console.log(ProductLocalStorage[i].quantity)

        let pricebasket = dataItem.price * ProductLocalStorage[i].quantity;
        //console.log(pricebasket)
        priceTotalCalcul += parseFloat(pricebasket);
    }
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">${quantityTotalCalcul}</span> articles) : <span id="totalPrice">${priceTotalCalcul}</span> €</p>`;
}




function additem() {
    let newQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity input"));
    let quantityValue = Array.from(document.querySelectorAll('.itemQuantity'));

let addQty=[];
//Boucle for en vas chercher tout les input dans lequelle on effectue un addEventListener pour changer la value des articles :
    for (let i = 0; i < newQuantity.length; i++) {

        newQuantity[i].addEventListener("change", () => {
        
        // Copie du tableau localStorageProducts dans le tableau tabUpdate :
        addQty = ProductLocalStorage;
            
        //Création d'une boucle for pour supprimer dans le local storage les valeur altxt, imageUrl, name et price : 
        for (let i = 0; i < addQty.length; i++) { 
        
                delete addQty[i].altTxt;
                delete addQty[i].imageUrl;
                delete addQty[i].name;
                delete addQty[i].price; 
        }
            
        //On modifie la quantité d'un élément à chaque index [i] du tableau écouté :
            addQty[i].quantity = quantityValue[i].value;

        //Mise à jour du local storage :
            localStorage.setItem("Basketitems", JSON.stringify(addQty));

        //Rafraîchissement de la page :
            window.location.reload();

            TotalPriceQuantity();
        });
    }
    
    }
   
// creation de la fonction pour le bouton supprimer 

function deleteItem() {

    let deleteBouton = Array.from(document.querySelectorAll('.deleteItem'))
    //console.log(deleteBouton)

    let basketDelete = [];
    //console.log(basketDelete)

    for (let i = 0; i < deleteBouton.length; i++) {

        deleteBouton[i].addEventListener("click", () => {


            basketDelete = ProductLocalStorage;

            for (let i = 0; i < basketDelete.length; i++) {

                delete basketDelete[i].altTxt;
                delete basketDelete[i].imageUrl;
                delete basketDelete[i].name;
                delete basketDelete[i].price;

            }

            basketDelete.splice([i], 1);

            ProductLocalStorage = localStorage.setItem("Basketitems", JSON.stringify(basketDelete));

            //console.log(deleteItem)
            window.location.href = "cart.html";
        });

    }
}


//bouton commander 
const boutonOrder = document.getElementById('order');
//console.log (boutonOrder)




/*

// variable pour le formulaire
let firstNameForm = document.getElementById('firstName').value;

let lastNameForm = document.getElementById('lastName').value;

let addressForm = document.getElementById('address').value;

let cityForm = document.getElementById('city').value;

let emailForm = document.getElementById('email').value;

// fonction verification

function userFirstNameControl() {
    const firstName = firstNameForm;
    
    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(firstName)) {
        
        document.querySelector("#firstNameErrorMsg").textContent = "";
        return true;
    }

    else {

        document.querySelector("#firstNameErrorMsg").textContent = "prénom non valide";
        return false;
    }

}
console.log(userFirstNameControl)


function userLastNameControl() {

    const lastName = lastNameForm;
    
    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
        
        document.querySelector("#lastNameErrorMsg").textContent = "";
        return true;
    }

    else {
        
        document.querySelector("#lastNameErrorMsg").textContent = " Nom non valide";
        return false;
    }

}
console.log(userLastNameControl)


function userAddressControl() {

    const adresse = contact.address;

    if (/^[A-Za-z0-9\s]{5,100}$/.test(adresse)) {
        
        document.querySelector("#addressErrorMsg").textContent = "";
        return true;
    }

    else {
        
        document.querySelector("#addressErrorMsg").textContent = "Adresse non valide";
        return false;
    }

}

console.log(userAddressControl)


function userCityControl() {

    const city = cityForm;

    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(city)) {
        
        document.querySelector("#cityErrorMsg").textContent = "";
        return true;
    }

    else {
        
        document.querySelector("#cityErrorMsg").textContent = "ville non valide";
        return false;
    }

}

console.log(userCityControl)


function userEmailControle() {

    const email = emailForm;
    
    if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
        
        document.querySelector("#emailErrorMsg").textContent = "";
        return true;
    }

    else {
        
        document.querySelector("#emailErrorMsg").textContent = "Email non valide";
        return false;
    }

}
console.log(userEmailControle)

//if (userLastNameControl() && userLastNameControl() && userAddressControl() && userCityControl && userEmailControle) {

  //  localStorage.setItem("formulaire", JSON.stringify(contact));

//}

//else {
  //alert("Veuillez bien remplir le formulaire")
//}

// mise en palce de l'ecoute du bouton pour l'envoyer au back-end 
//boutonOrder.addEventListener('click', (e) => {
   // e.preventDefault();

//})*/
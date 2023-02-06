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


            products.push(data);

            deleteItem();

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


// creation de la fonction pour le bouton supprimer 

function deleteItem() {

    let deleteBouton = Array.from(document.querySelectorAll('.deleteItem'))
    //console.log(deleteBouton)

    let basketDelete = [];
    //console.log(basketDelete)

    for (let i = 0; i < deleteBouton.length; i++) {
    
    deleteBouton[i].addEventListener("click", () => {
    
        deleteBouton[i].style.display = "none"; 

        
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
const boutonOrder =document.getElementById('order');
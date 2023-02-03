var ProductLocalStorage = JSON.parse(localStorage.getItem("Basketitems"));

document.title = "Panier"

let products = [];

function getDataFromAPI(productId) {
    let response = fetch('http://localhost:3000/api/products/' + productId)
        .then(data => {
            return data.json();
        })
        .catch(error => {
            error = `Une erreur s'est produite au chargement de la page, veuillez réessayer.`;
            alert(error);
        })

    return response;
}


async function displayBasket() {

    if (ProductLocalStorage === null || ProductLocalStorage.length === 0) {
        document.querySelector('h1').textContent = 'Votre panier est vide';
    } else {
        document.querySelector('h1').textContent = ' Voici votre panier ';

        for (let i = 0; i < ProductLocalStorage.length; i++) {
            let items = ProductLocalStorage[i];

            let data = await getDataFromAPI(items.id);


            document.getElementById('cart__items').innerHTML +=
                `<article class="cart__item" data-id="${items.id}" data-color="${items.color}">
            <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${items.color}</p>
                <p>${data.price}€</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${items.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
        </article>`;


            products.push(data);
            TotalPriceQuantity();

        }
    }
}


displayBasket();

 async function TotalPriceQuantity() {

   var quantityTotalCalcul = 0;
    var priceTotalCalcul = 0;

    for (let i = 0; i < ProductLocalStorage.length; i++) {
               
        
    
        let quantitybasket = ProductLocalStorage[i].quantity;
        quantityTotalCalcul += parseInt(quantitybasket);


        let pricebasket = ProductLocalStorage[i].price * ProductLocalStorage[i].quantity;
        priceTotalCalcul += parseFloat(pricebasket);
    }

    //Affichage des résultat grâce à innerHtml : 
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">${quantityTotalCalcul}</span> articles) : <span id="totalPrice">${priceTotalCalcul}</span> €</p>`;
 }

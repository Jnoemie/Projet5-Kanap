

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

            let articleProduit = document.createElement("article");
            articleProduit.className = "cart__item"
            document.querySelector("#cart__items").appendChild(articleProduit);
            articleProduit.setAttribute("data-id", item.id);
            articleProduit.setAttribute("data-color", item.color);

            let productDivImg = document.createElement("div");
            articleProduit.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = data.imageUrl;
            productImg.alt = data.alttxt;

            let productItemContent = document.createElement("div");
            articleProduit.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__description";

            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = data.name;

            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = item.color;


            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = data.price;

            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";

            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            let productQty = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQty);
            productQty.innerHTML = "Qté : ";

            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = item.quantity;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";



            products.push(item.id);

            deleteItem();
            additem();
            TotalPriceQuantity();

        }
    }
}

// creation de la fonction du calcul de prix et de quantité

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
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = quantityTotalCalcul;
    console.log(quantityTotalCalcul);

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = priceTotalCalcul;
    console.log(priceTotalCalcul);

}

//creation de la fonction de changement quantité

function additem() {
    let newQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity input"));
    let quantityValue = Array.from(document.querySelectorAll('.itemQuantity'));

    let addQty = [];
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


        });
    }

}

// creation de la fonction pour le bouton supprimer 

function deleteItem() {

    let deleteBouton = Array.from(document.querySelectorAll('.deleteItem'));
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
            alert("Ce produit a été supprimer")
            window.location.href = "cart.html";
        });

    }
}

//bouton commander 
const boutonOrder = document.getElementById('order');
//console.log (boutonOrder)

let controlForm = {
    firstName: {
        element: document.getElementById('firstName'),
        regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
        errorMsg: 'Prénom invalide'
    },
    lastName: {
        element: document.getElementById('lastName'),
        regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
        errorMsg: 'Nom invalide'
    },
    address: {
        element: document.getElementById('address'),
        regex: /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/,
        errorMsg: 'Adresse invalide'
    },
    city: {
        element: document.getElementById('city'),
        regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
        errorMsg: 'Ville invalide'
    },
    email: {
        element: document.getElementById('email'),
        regex: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
        errorMsg: 'Email invalide'
    }
};

function validForm(check) {
    const Element = check.element;
    const Regex = check.regex;
    const errorMsg = check.errorMsg;
    const errorDiv = check.element.nextElementSibling;
    const RegexValid = Regex.test(Element.value);

    if (RegexValid) {
        errorDiv.innerText = '';
    } else {
        errorDiv.innerText = errorMsg;
    }
    return RegexValid;
}
const firstNameCheck = document.getElementById('firstName');
firstNameCheck.addEventListener('change', () => validForm(controlForm.firstName));

const lastNameCheck = document.getElementById('lastName');
lastNameCheck.addEventListener('change', () => validForm(controlForm.lastName));

const addressCheck = document.getElementById('address');
addressCheck.addEventListener('change', () => validForm(controlForm.address));

const cityCheck = document.getElementById('city');
cityCheck.addEventListener('change', () => validForm(controlForm.city));

const emailCheck = document.getElementById('email');
emailCheck.addEventListener('change', () => validForm(controlForm.email));

// on écoute l'event au click de orderBtn pour contrôler, récupérer les informations et les envoyer plus tard
boutonOrder.addEventListener('click', (e) => {
    e.preventDefault();

    let contact = {
        firstName: firstNameCheck.value,
        lastName: lastNameCheck.value,
        address: addressCheck.value,
        city: cityCheck.value,
        email: emailCheck.value
    };

    if (
        validForm(controlForm.firstName) == false &&
        validForm(controlForm.lastName) == false &&
        validForm(controlForm.address) == false &&
        validForm(controlForm.city) == false &&
        validForm(controlForm.email) == false
    ) {
        alert(`Le formulaire est incorrect.`);
    } else {

        //Mettre l'objet "contact" dans le local storage :
        localStorage.setItem("Basketitems", JSON.stringify(contact));
        Server();

    }

function Server() {
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact, products }), // clefs contact et products
        })
            // on récupère et stock la réponse de l'API (orderId)
            .then((response) => {
                return response.json();
            })
            .then((server) => {
                const orderId = server.orderId;
                console.log(orderId);
                // si orderId n'est pas undefined on redirige l'utilisateur vers la page confirmation
                if (orderId != undefined) {
                    location.href = 'confirmation.html?id=' + orderId;
                }
            });
    }
}) 


/*********/
/* START */
/*********/

//recuperation de local storage 
var ProductLocalStorage = JSON.parse(localStorage.getItem("Basketitems"));

//titre de la page html

document.title = "Panier"

// creation d'un tableau pour recuperer les informations pour la confirmation 

let products = [];

displayBasket();

formContact();



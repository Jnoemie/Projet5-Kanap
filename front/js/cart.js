

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
            addItem();
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
    //console.log(quantityTotalCalcul);

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = priceTotalCalcul;
    //console.log(priceTotalCalcul);

}

//creation de la fonction de changement quantité

function addItem() {

    document.querySelectorAll('.itemQuantity').forEach(input => {
        input.addEventListener('change', function (event) {
            let quantityInput = event.target;
            let itemQtt= quantityInput.closest("article");
            let itemIdQtt= itemQtt.dataset.id;
            let itemColorQtt = itemQtt.dataset.color;
            let newQtt = quantityInput.value
            
            console.log(itemIdQtt+''+ itemColorQtt+ ''+newQtt)
        
            Update(itemIdQtt, itemColorQtt,newQtt);
            TotalPriceQuantity();
            

    });
    })
};

function deleteItem() {


    document.querySelectorAll('.deleteItem').forEach(button => {
        button.addEventListener("click", function (event) {
            let deleteBtn = event.target
            let itemDiv = deleteBtn.closest("article")
            let itemId = itemDiv.dataset.id
            let itemColor = itemDiv.dataset.color
            console.log(itemId + ' ' + itemColor)  
            deleteItemPlus(itemId, itemColor)

            alert("Ce produit a été supprimer")
            window.location.href = "cart.html";

        })
    })
}

function deleteItemPlus(id, color) {
    let basketDelete = [];

    for (let i = 0; i < ProductLocalStorage.length; i++) {
        if (ProductLocalStorage[i].id == id && ProductLocalStorage[i].color == color) {
            // on est sur le bon, on le vire
            basketDelete = ProductLocalStorage
            basketDelete.splice([i], 1)
            localStorage.setItem('Basketitems', JSON.stringify(basketDelete))
            break;
        }
    }
    document.querySelectorAll('.cart__item').forEach(div => {
        if (div.dataset.id == id) {
            div.parentNode.removeChild(div)
            return
        }
    })


}


//formulaire//


//bouton commander 
const boutonOrder = document.getElementById('order');
//console.log (boutonOrder)


// declaration des expresssions regulière 

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
// fonction verification //


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



// on écoute l'event au click de boutonOrder 
boutonOrder.addEventListener('click', (e) => {
    e.preventDefault();
    // objet conctact recuperer pour la confirmation
    let contact = {
        firstName: firstNameCheck.value,
        lastName: lastNameCheck.value,
        address: addressCheck.value,
        city: cityCheck.value,
        email: emailCheck.value
    };
    // verification si le formulaire est juste 
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

        // on appelle la fonction server 
        Server();

    }
    // mis en place de la fonction server

    function Server() {
        // appelle a l'api pour effectuer un post 
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact, products }),
        })
            // on récupère et stock la réponse de l'api
            .then((response) => {
                return response.json();
            })
            .then((server) => {
                const orderId = server.orderId;
                //console.log(orderId);
                // on redirige vers la page confirmation
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

function Update(productID,productColor, productQtt) {
    for(let i= 0 ; i <ProductLocalStorage.length; i++ ){
        if (ProductLocalStorage[i].id == productID && ProductLocalStorage[i].color == productColor){
            ProductLocalStorage[i].quantity = productQtt;
            localStorage.setItem('Basketitems', JSON.stringify(ProductLocalStorage))
        }
    }
}



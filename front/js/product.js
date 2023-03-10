// declaration d'une fonction recuperant l'url et en y recuperant les parametre 
function getParams(url = window.location) {
    let params = {};
    new URL(url).searchParams.forEach(function (val, key) {
        params[key] = val;
    });
    return params;
};

// recuperation de parametre de params 

let params = getParams();

// recuperation de l'id de produit selectionner

var productId = params['id'];

// console.log("Affichage du produit : " + productId)
fetch("http://localhost:3000/api/products/" + productId)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        document.title = data.name
        let img = document.createElement('img')
        img.src = data.imageUrl
        img.alt = data.altTxt
        document.getElementsByClassName('item__img')[0].appendChild(img)
        title.innerHTML = data.name
        price.innerHTML = data.price
        description.innerHTML = data.description
        for (let i = 0; i < data.colors.length; i++) {
            let option = document.createElement('option')
            option.value = data.colors[i]
            option.innerHTML = data.colors[i]
            document.getElementById('colors').appendChild(option)
        }
    }
    );

    
    // declaration d'un fonction avec un evenement  qui met un objet dans local storage et qui ajuste la quantité si besoin 

function onAddToBasket(event) {
    
    const selectedColor = colors.options[colors.selectedIndex].value
    let quantity = document.getElementById('quantity')
    let selectedQuantity = quantity.value
// verification coleur et quantité 
    if (selectedColor == '') {
        alert('Veuillez sélectionner une couleur');
        return;
    }

    else if (selectedQuantity < 1) {
        alert('Veuillez sélectionner le nombre d\'articles souhaités');
        return;
    }

    else if (selectedQuantity > 100) {
        alert('Vous pouvez seulement sélectionner 1 à 100 produits.');
        return;
    }

    else {
        alert('Votre article a bien été ajouté au panier ');
    }

// ajout d'un article dans le local storage en verifiant que l'article ne si trouve pas deja 

    let found = false
    for (let i = 0; i < basketItems.length; i++) {
        if (basketItems[i].id == productId && basketItems[i].color == selectedColor) {
            basketItems[i].quantity = parseInt(basketItems[i].quantity) + parseInt(quantity.value)
            found = true
            if (basketItems[i].quantity>100)
            {
                basketItems[i].quantity =100;
                alert ("le total pour cet article est bloqué à 100 dans votre panier!");
                
            }
        
            break;
        }}

    // si found renvoie false cree un nouvel element dans le tableau 
    if (!found) {
        let Kanap =
        {
            id: productId,
            color: selectedColor,
            quantity: quantity.value,
        }
        basketItems.push(Kanap);
    }
    localStorage.setItem('Basketitems', JSON.stringify(basketItems))
};
//recuperation des donné stoke dans le locale storage 
var basketItems = JSON.parse(localStorage.getItem('Basketitems'));

// si le local storage est vide 
    if (basketItems == null) {
        basketItems = []
    };
    
    if (typeof productId == "undefined" || productId == 0) {
        window.location.href = "/404.html";
    };


document.getElementById('addToCart').addEventListener('click', onAddToBasket)
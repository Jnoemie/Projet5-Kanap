function getParams(url = window.location) {
    let params = {};
    new URL(url).searchParams.forEach(function (val, key) {
        params[key] = val;
    });
    return params;
}

function onAddToBasket(event) {
    //let colorSelect = document.getElementById('colors')
    const selectedColor = colors.options[colors.selectedIndex].value
    let quantity = document.getElementById('quantity')
    let selectedQuantity = quantity.value

   

        

    

        //SI la colors ne vaut rien, veuillez choisir une couleur :
        if (selectedColor == '') {
            alert('⚠️Veuillez sélectionner une couleur⚠️');
            return;
        }

        //SI NON SI la quantity est inférieur à 1 veuillez choisir une quantités valide : 
        else if ( selectedQuantity< 1) {
            alert('⚠️Veuillez sélectionner le nombre d\'articles souhaités⚠️');
            return;
        }


        //SI NON SI la quantity est supérieur à 100 veuillez choisir une quantités entre 1 à 100 produits : 
        else if (selectedQuantity> 100) {
            alert('⚠️Vous pouvez seulement sélectionner 1 à 100 produits.⚠️');
            return;
        }


        //SI NON votre commande a bien ete enregistrée :
        else {
            alert('✅ Votre article ' + name + ' a bien été ajouté au panier ✅');
        }
    

        let found = false
        for (let i = 0; i < basketItems.length; i++) {
            if (basketItems[i].id == productId && basketItems[i].color == selectedColor) {
                basketItems[i].quantity = parseInt(basketItems[i].quantity) + parseInt(quantity.value)
                found = true
                break;
            }
        }
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
    }

    var basketItems = JSON.parse(localStorage.getItem('Basketitems'));
    if (basketItems == null) {
        basketItems = []
    }
    let params = getParams()
    var productId = params['id']

    if (typeof productId == "undefined" || productId == 0) {
        window.location.href = "/404.html";
    }

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

        )
    document.getElementById('addToCart').addEventListener('click', onAddToBasket)
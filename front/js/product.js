function getParams(url = window.location) {
    // Create a params object
    let params = {};

    new URL(url).searchParams.forEach(function (val, key) {
        params[key] = val;
    });

    return params;

}


let params = getParams()
console.log(params)
let productId = params['id']
console.log("Affichage du produit : " + productId)

fetch("http://localhost:3000/api/products/" + productId)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)

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
       
        basketItems = []
        document.getElementById('addToCart').addEventListener('click', onAddToBasket)
        
        function onAddToBasket(event) {
            let colorSelect = document.getElementById('colors')
            let selectedColor = colorSelect.options[colorSelect.selectedIndex].value
    
    
            console.log(selectedColor)
    
            let quantity= document.getElementById('quantity')
            let selectedQuantity=quantity.value
            let Kanap =
            {
                id: data._id,
                color: selectedColor,
                quantity: selectedQuantity,
            }

            basketItems.push(Kanap)
            localStorage.setItem('Basketitems', JSON.stringify(basketItems))
        }

        /* on ne met pas la couleur
        let colorSelect = document.getElementById('colors')
        console.log(colors.selectedIndex)
        on verra que c'est l'index de l'option selectionnée
        // du coup la valeur de la couleur c'est .....
        let selectedColor = colorSelect.options[colorSelect.selectedIndex].value
        basketItems doit devenir un tableau
        basketItems = [ 
        {
        },
        {       }]
        basketItems = []
        monItem = { }
        basketItems.push(monItem)
        le .push ca ajoute l'element entre parenthese a la fin du tabealu*/
    })

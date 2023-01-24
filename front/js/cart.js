var basketItems = localStorage.getItem('Basketitems');

console.log(basketItems);
document.title = "Panier"
let products = [];


    // Condition de vérification si le panier existe et ou est vide et modification texte :
    if (basketItems == null || basketItems.length == 0) {
        document.querySelector('h1').textContent = '🛒 Le panier est vide 🛒 !';
        document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`;
    }
    
    else{
        document.querySelector('h1').textContent = '🛒 Voici votre panier 🛒 ';
    };
    

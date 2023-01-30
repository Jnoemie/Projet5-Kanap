var ProductLocalStorage = JSON.parse(localStorage.getItem('Basketitems'));


document.title = "Panier"


// Condition de vérification si le panier existe et ou est vide et modification texte :
if (ProductLocalStorage == null || ProductLocalStorage.length == 0) {
    document.querySelector('h1').textContent = 'Le panier est vide !';
}

else {
    document.querySelector('h1').textContent = 'Voici votre panier';



}



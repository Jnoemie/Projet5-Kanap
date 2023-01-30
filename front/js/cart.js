var ProductLocalStorage =JSON.parse (localStorage.getItem('Basketitems'));


document.title = "Panier"


    // Condition de vérification si le panier existe et ou est vide et modification texte :
    if (ProductLocalStorage == null || ProductLocalStorage.length == 0) {
        document.querySelector('h1').textContent = 'Le panier est vide !';
    }
    
    else{
        document.querySelector('h1').textContent = 'Voici votre panier';


        fetch("http://localhost:3000/api/products")
        .then( (response) => response.json())
        .then ((data) => {
            product = data;
            for(let i = 0; i < ProductLocalStorage.length; i++){
            
            
            let colorProductPanier = ProductLocalStorage[i].colorProduct;
            let idProductPanier = ProductLocalStorage[i].idProduct;
          let   quantityProductPanier = ProductLocalStorage[i].quantityProduct;

          const compositionProduitsPanier = data.find((element) => element._id === idProductPanier);
          priceProductPanier = compositionProduitsPanier.price;
            }  
    });
    
    }
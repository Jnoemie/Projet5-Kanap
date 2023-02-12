function getProductId() {
    return new URL(location.href).searchParams.get('id')
  }
  
  const orderId = getProductId();
  //console.log(orderId);


//Affichage de l'id du produit :

let idConfirmation = document.getElementById("orderId");

idConfirmation.innerHTML = orderId;

//Nettoyage du local storage :

localStorage.clear();


let url = new URLSearchParams(document.location.search);

let id = url.get("id");

const orderId = id;

//Affichage de l'id du produit :

const idConfirmation = document.getElementById("orderId");

idConfirmation.innerHTML = orderId;

//Nettoyage du local storage :

localStorage.clear();


// //Variables to use and it's a mix of global and local variables
// let shoppingCart = [];
// let products = document.getElementsByTagName("button");

// let cartProducts = "";

// //This code gets whatever is inside data-product in the HTML
// let product = event.target.parentNode.getAttribute("data-product");
// cartProducts =
//   cartProducts +
//   '<li><span class="product-title">Titel: </span>' +
//   shoppingCart[i] +
//   "</li>";
// shoppingCart.push(product);

// //
// document.querySelector("#productsInCart").innerHTML = shoppingCart.length;
// document.querySelector("#cart").classList.toggle("hide");
// document.querySelector("#products").innerHTML = cartProducts;
// products[i].addEventListener("click", (event) => {
//   console.log(event.target);
//   // event here is the HTML element that was clicked on
// });
// document.querySelector("#open-cart").addEventListener("click", () => {});

// //Function declarations, add code inside {}
// function updateCart() {}
// function listProductsInCart() {}

// //For-loops of two arrays
// for (let i = 0; i < shoppingCart.length; i++) {}
// for (let i = 0; i < products.length; i++) {}

// //Function calls and there should be two listProductsInCart()
// updateCart();
// listProductsInCart();
// listProductsInCart();

let shoppingCart = [];

let products = document.getElementsByClassName("button");
let removeBtn = document.getElementsByClassName("remove-btn");

function updateCart() {
  document.querySelector("#productsInCart").innerText = shoppingCart.length;
}

function listProductsInCart() {
  let cartProducts = "";
  for (let i = 0; i < shoppingCart.length; i++) {
    cartProducts += `
      <li>
        <span class="product-title">Titel: </span>${shoppingCart[i]}
        <button class="remove-btn" data-index="${i}">Ta bort</button>
      </li>
    `;
  }
  document.querySelector("#products").innerHTML = cartProducts;

  // Lägg på event listeners på de nya remove-knapparna
  let removeBtn = document.getElementsByClassName("remove-btn");
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", remove);
  }
}

// Loop through all buttons
for (let i = 0; i < products.length; i++) {
  products[i].addEventListener("click", (event) => {
    let product = event.target.parentNode.getAttribute("data-product");
    if (shoppingCart.includes(product)) {
      console.log("finns");
    } else {
      shoppingCart.push(product);
    }

    updateCart();
    listProductsInCart();
  });
}

// Toggle cart visibility
document.querySelector("#open-cart").addEventListener("click", () => {
  document.querySelector("#cart").classList.toggle("hide");
});

function remove(event) {
  let index = event.target.getAttribute("data-index"); // index i shoppingCart
  shoppingCart.splice(index, 1); // tar bort produkten från arrayen
  updateCart(); // uppdatera antal i kundvagnen
  listProductsInCart(); // uppdatera listan med produkter
}

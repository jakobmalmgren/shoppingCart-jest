// let shoppingCart = [];

// let products = document.getElementsByClassName("button");

// function updateCart() {
//   document.querySelector("#productsInCart").innerText = shoppingCart.length;
// }

// function listProductsInCart() {
//   let cartProducts = "";
//   for (let i = 0; i < shoppingCart.length; i++) {
//     cartProducts += `
//       <li>
//         <span class="product-title">Titel: </span>${shoppingCart[i]}
//         <button class="remove-btn" data-index="${i}">Ta bort</button>
//       </li>
//     `;
//   }
//   document.querySelector("#products").innerHTML = cartProducts;

//   // Lägg på event listeners på de nya remove-knapparna
//   let removeBtn = document.getElementsByClassName("remove-btn");
//   for (let i = 0; i < removeBtn.length; i++) {
//     removeBtn[i].addEventListener("click", remove);
//   }
// }

// // Loop through all buttons
// for (let i = 0; i < products.length; i++) {
//   products[i].addEventListener("click", (event) => {
//     let product = event.target.parentNode.getAttribute("data-product");
//     if (shoppingCart.includes(product)) {
//       console.log("finns");
//     } else {
//       shoppingCart.push(product);
//     }

//     updateCart();
//     listProductsInCart();
//   });
// }

// // Toggle cart visibility
// document.querySelector("#open-cart").addEventListener("click", () => {
//   document.querySelector("#cart").classList.toggle("hide");
// });

// function remove(event) {
//   let index = event.target.getAttribute("data-index"); // index i shoppingCart
//   shoppingCart.splice(index, 1); // tar bort produkten från arrayen
//   updateCart(); // uppdatera antal i kundvagnen
//   listProductsInCart(); // uppdatera listan med produkter
// }

document.addEventListener("DOMContentLoaded", () => {
  let shoppingCart = [];

  // Hämta alla "Add to cart"-knappar
  let products = document.getElementsByClassName("button");

  // Uppdatera antal produkter i kundvagnen
  function updateCart() {
    document.querySelector("#productsInCart").textContent = shoppingCart.length;
  }

  // Lista produkter i kundvagnen
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

    // Lägg event listeners på de nya remove-knapparna
    let removeBtns = document.getElementsByClassName("remove-btn");
    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].addEventListener("click", remove);
    }
  }

  // Lägg till produkt när knappen klickas
  for (let i = 0; i < products.length; i++) {
    products[i].addEventListener("click", (event) => {
      // Hitta närmaste artikel med data-product
      let product = event.target.closest(".card").getAttribute("data-product");

      if (!shoppingCart.includes(product)) {
        shoppingCart.push(product);
      }

      updateCart();
      listProductsInCart();
    });
  }

  // Toggle kundvagnens synlighet
  document.querySelector("#open-cart").addEventListener("click", () => {
    document.querySelector("#cart").classList.toggle("hide");
  });

  // Ta bort produkt från kundvagnen
  function remove(event) {
    let index = event.target.getAttribute("data-index");
    shoppingCart.splice(index, 1);
    updateCart();
    listProductsInCart();
  }
});

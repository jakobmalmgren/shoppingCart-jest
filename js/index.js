document.addEventListener("DOMContentLoaded", () => {
  // DE HÄR FÖRSTÅR JA EJ?
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

      if (shoppingCart.includes(product)) {
        // throw new Error("kan ej lägga till samma bok igen");
        return;
      } else {
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

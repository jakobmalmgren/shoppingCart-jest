require("@testing-library/jest-dom");
const { fireEvent } = require("@testing-library/dom");

const html = `  <body>
    <header class="header">
      <nav class="menu">
        <a href="#" class="link" id="open-cart">Cart</a>
        <span class="cart-total" id="productsInCart">0</span>
        <section class="cart-wrapper hide" id="cart">
          <h3>Tillagda produkter</h3>
          <ul id="products"></ul>
        </section>
      </nav>
    </header>
    <main>
      <section class="cards">
        <article class="card" data-product="Goodnight Moon">
          <h3 class="title">Goodnight Moon</h3>
          <p class="author">Av Margaret Wise Brown</p>
          <p class="about">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            unde ad modi amet deleniti explicabo debitis earum rem vel illum
            dolores, quidem quibusdam adipisci dolorem repellendus repellat
            mollitia! Voluptatem?
          </p>
          <button class="button" id="add-to-cart-button">Add to cart</button>
        </article>
        <article class="card" data-product="The Very Hungry Caterpillar">
          <h3 class="title">The Very Hungry Caterpillar</h3>
          <p class="author">Av Eric Carle</p>
          <p class="about">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            unde ad modi amet deleniti explicabo debitis earum rem vel illum
            dolores, quidem quibusdam adipisci dolorem repellendus repellat
            mollitia! Voluptatem?
          </p>
          <button class="button">Add to cart</button>
        </article>
        <article class="card" data-product="A Wrinkle in Time">
          <h3 class="title">A Wrinkle in Time</h3>
          <p class="author">Av Madeleine L’Engle</p>
          <p></p>
          <p class="about">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            unde ad modi amet deleniti explicabo debitis earum rem vel illum
            dolores, quidem quibusdam adipisci dolorem repellendus repellat
            mollitia! Voluptatem?
          </p>
          <button class="button">Add to cart</button>
        </article>
        <article class="card" data-product="Where the Wild Things Are">
          <h3 class="title">Where the Wild Things Are</h3>
          <p class="author">Av Maurice Sendak</p>
          <p></p>
          <p class="about">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil odio
            unde ad modi amet deleniti explicabo debitis earum rem vel illum
            dolores, quidem quibusdam adipisci dolorem repellendus repellat
            mollitia! Voluptatem?
          </p>
          <button class="button">Add to cart</button>
        </article>
      </section>
    </main>
  </body>`;
// Allt sker i den fejkade jsdom-DOM, men med riktig JS-logik från index.js.

describe("functionality so the app works", () => {
  beforeEach(() => {
    document.body.innerHTML = html;
    jest.resetModules(); // Återställar DOM och JS-skript inför varje test
    //När Node kör require laddas din riktiga JS-kod (index.js) och körs.
    require("./index.js");
    // Triggera DOMContentLoaded manuellt, DE HÄR FÖRSTÅR JA EJ?
    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);
  });
  it("should work to add a book when the button is clicked", () => {
    //arrange
    // hämtar alla knappar etc som vanlig JS
    const buttons = document.querySelectorAll(".button");
    const cartCounter = document.getElementById("productsInCart");
    const productsList = document.getElementById("products");
    //act
    fireEvent.click(buttons[0]);
    //assert
    expect(cartCounter).toHaveTextContent("1");
    expect(productsList).toHaveTextContent("Goodnight Moon");
  });

  it("should not work to add same book again", () => {
    // arrange
    const buttons = document.querySelectorAll(".button");
    const cartCounter = document.getElementById("productsInCart");
    const productsList = document.getElementById("products");

    // act
    fireEvent.click(buttons[0]); // lägg till första gången

    // ville köra dena o ha tothrow men gick ej tydligen för
    //fungerar bara för synkrona funktioner inte för eventlisterners
    // som ja har i min JS fil..

    // expect(() => fireEvent.click(buttons[0])).toThrow(
    //   "kan ej lägga till samma bok igen"
    // );
    fireEvent.click(buttons[0]); // försök lägga till samma bok igen

    // assert
    expect(cartCounter).toHaveTextContent("1"); // antal ska fortfarande vara 1
    expect(productsList).toHaveTextContent("Goodnight Moon"); // samma bok ska visas bara en gång
  });
  it("should be possible to delete a book", () => {
    const cartCounter = document.getElementById("productsInCart");
    const productsList = document.getElementById("products");
    const buttons = document.querySelectorAll(".button");
    // Lägg till en bok först
    fireEvent.click(buttons[0]);

    //eftersom en bok har lagt till nu med :   fireEvent.click(buttons[0]);
    // så finns därför ".remove-btn" som annars har genererats i JS filen
    // och ingen ren HTML, så kan inte nå de direkt i de "fejkade DOM trädet ovan"

    // Nu genereras remove-knappen genom din listProductsInCart-funktion
    const removeButtons = document.querySelectorAll(".remove-btn");
    expect(removeButtons.length).toBe(1); // säkerställ att knappen finns

    // Klicka på Ta bort knappen
    fireEvent.click(removeButtons[0]);

    // Kolla att varukorgen är tom och att listan är tom
    expect(cartCounter).toHaveTextContent("0");
    expect(productsList).toHaveTextContent("");
  });
});

// lägga till felhantering med !!

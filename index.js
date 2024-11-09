// https://dummyjson.com/products
document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector(".app");
  let products = [];
  let currentPg = 1;

  const fetchAllProducts = async () => {
    const resp = await fetch("https://dummyjson.com/products?limit=100");
    const jsonFormattedResp = await resp.json();
    if (jsonFormattedResp && jsonFormattedResp.products) {
      products = jsonFormattedResp.products;
      render();
    }
  };

  const render = () => {
    const productsContainer = document.createElement("dic");
    productsContainer.classList.add("products-container");
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");
    if (products.length > 0) {
      products.slice(currentPg * 10 - 10, currentPg * 10).forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product__single");
        productCard.innerHTML = `<h2>${product.title}</h2><img src=${product.thumbnail}  />`;
        productsContainer.appendChild(productCard);
      });

      if (currentPg > 1) {
        const prevBtn = createPaginationButton("◀️", () =>
          pageHandler(currentPg - 1)
        );
        pagination.appendChild(prevBtn);
      }

      for (let i = 0; i < products.length / 10; i++) {
        const pageBtn = createPaginationButton(
          i + 1,
          () => pageHandler(i + 1),
          currentPg == i + 1
        );
        pagination.appendChild(pageBtn);
      }
      if (currentPg < products.length / 10) {
        const nextBtn = createPaginationButton("▶️", () =>
          pageHandler(currentPg + 1)
        );
        pagination.appendChild(nextBtn);
      }
    }
    app.innerHTML = "";
    app.appendChild(pagination);

    app.appendChild(productsContainer);
  };
  fetchAllProducts();
  const createPaginationButton = (buttonText, cbOnClick, isSelected) => {
    const button = document.createElement("button");
    button.textContent = buttonText;
    button.addEventListener("click", cbOnClick);
    if (isSelected) {
      button.classList.add("pagination__selected");
    }
    return button;
  };
  const pageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != currentPg
    ) {
      currentPg = selectedPage;
      render();
    }
  };
});

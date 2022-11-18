//HEADER-HIDER
const header = document.getElementsByTagName("header")[0];

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    header.style.top = "0";
  } else {
    header.style.top = "-150px";
  }
  prevScrollpos = currentScrollPos;
};

//CART-OVERLAY
const cartOverlay = document.getElementsByClassName("cart-overlay")[0];
const cartOpen = document.getElementsByClassName("cart")[0];
const cartClose = document.getElementsByClassName("cart-close")[0];
const cartFinish = document.getElementsByClassName("cart-finish")[0];
const cartContinue = document.getElementsByClassName("cart-continue")[0];

cartOpen.addEventListener("click", () => {
  cartOverlay.style.left = "0";
  document.body.classList.add("stop-scrolling");
});
cartClose.addEventListener("click", () => {
  cartOverlay.style.left = "-100vw";
  document.body.classList.remove("stop-scrolling");
});
cartFinish.addEventListener("click", () => {
  console.log("Data sent to Stripe");
});
cartContinue.addEventListener("click", () => {
  cartOverlay.style.left = "-100vw";
  document.body.classList.remove("stop-scrolling");
});

//product-table
const productTable = {
  f22ro: {
    name: "Real One",
    price: 74.99,
    image: "/assets/images/real/real_front.JPG",
  },
  f22s: {
    name: "Slasher",
    price: 74.99,
    image: "/assets/images/slasher/slasher_front_f.JPG",
  },
  f22lwu: {
    name: "LWU",
    price: 74.99,
    image: "/assets/images/lost/lost_front_f.JPG",
  },
};

//LOAD-CART
let cart = [];

if (localStorage.getItem("ph__cart") === null) {
  cart = [];
} else {
  const productsFromStorage = JSON.parse(localStorage.getItem("ph__cart"));
  cart = productsFromStorage;
  updateCart();
}

const stripe = Stripe(
  "pk_live_51M3l8fDWw7KIDNJZ0WXAMhS6qGO2zAVjJW91LF0fB580QujNDI5CmhPPP9iDzMiMwCwsjrCI6p1CEiFUa6XdI6Ph00S62JJyhN"
);

function fillCheckout(item) {
  switch (item.id) {
    case "f22ro":
      if (item.size === "XS") {
        return "price_1M5PYvDWw7KIDNJZLbcIFA7u";
      } else if (item.size === "S") {
        return "price_1M5PZZDWw7KIDNJZlPgYngC0";
      } else if (item.size === "M") {
        return "price_1M5PZiDWw7KIDNJZk4pg0NV4";
      } else if (item.size === "L") {
        return "price_1M5PZvDWw7KIDNJZHPVlipDI";
      } else if (item.size === "XL") {
        return "price_1M5Pa2DWw7KIDNJZuw2vIpeN";
      } else {
        return "price_1M5Pa8DWw7KIDNJZlpEWwTCt";
      }
    case "f22s":
      if (item.size === "XS") {
        return "price_1M5PaRDWw7KIDNJZj7aNTU0S";
      } else if (item.size === "S") {
        return "price_1M5PaZDWw7KIDNJZuUTF4uqG";
      } else if (item.size === "M") {
        return "price_1M5PawDWw7KIDNJZP6LXwqqT";
      } else if (item.size === "L") {
        return "price_1M5Pb6DWw7KIDNJZ3AhK6FJi";
      } else if (item.size === "XL") {
        return "price_1M5PbDDWw7KIDNJZcuTJqlCc";
      } else {
        return "price_1M5PbJDWw7KIDNJZ3pzYjXQu";
      }
    case "f22lwu":
      if (item.size === "XS") {
        return "price_1M5PbiDWw7KIDNJZaOoVUSlJ";
      } else if (item.size === "S") {
        return "price_1M5PbnDWw7KIDNJZqSbWPAm7";
      } else if (item.size === "M") {
        return "price_1M5PbwDWw7KIDNJZt0rIAKnG";
      } else if (item.size === "L") {
        return "price_1M5Pc8DWw7KIDNJZGDB3ar3j";
      } else if (item.size === "XL") {
        return "price_1M5PcDDWw7KIDNJZJjBSWT6E";
      } else {
        return "price_1M5PcIDWw7KIDNJZkswB1j6q";
      }
  }
}

const checkoutButton = document.getElementsByClassName("cart-finish")[0];
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    return;
  } else {
    stripe.redirectToCheckout({
      lineItems: ([] = cart.map((item) => ({
        price: `${fillCheckout(item)}`,
        quantity: item.quantity,
      }))),
      mode: "payment",
      successUrl: "https://www.pastelhood.com",
      cancelUrl: "https://www.pastelhood.com",
      shippingAddressCollection: {
        allowedCountries: ["CZ", "SK"],
      },
    });
  }
});

//UPDATE-CART
function updateCart() {
  const cartList = document.getElementsByClassName("cart-list")[0];
  cartList.innerHTML = "";

  cart.forEach((item) => {
    //cart-item
    const cartItem = document.createElement("div");
    cartItem.setAttribute("id", cart.indexOf(item));
    cartItem.setAttribute("class", "cart-item");
    cartList.appendChild(cartItem);
    //cart-item-left
    const cartItemLeft = document.createElement("div");
    cartItemLeft.setAttribute("class", "cart-item-left");
    cartItem.appendChild(cartItemLeft);
    const cartItemImage = document.createElement("div");
    cartItemImage.setAttribute("class", "cart-item-image");
    cartItemLeft.appendChild(cartItemImage);
    const itemImage = document.createElement("img");
    itemImage.setAttribute("src", productTable[item.id].image); //ZMENIT PODLA DB
    itemImage.setAttribute("alt", "");
    cartItemImage.appendChild(itemImage);
    const cartItemName = document.createElement("div");
    cartItemName.setAttribute("class", "cart-item-name");
    cartItemName.innerText = `"${productTable[item.id].name}"`;
    cartItemImage.appendChild(cartItemName);
    //cart-item-right
    const cartItemRight = document.createElement("div");
    cartItemRight.setAttribute("class", "cart-item-right");
    cartItem.appendChild(cartItemRight);
    const cartItemSize = document.createElement("div");
    cartItemSize.setAttribute("class", "cart-item-size");
    cartItemSize.innerText = item.size;
    cartItemRight.appendChild(cartItemSize);
    const cartItemPrice = document.createElement("div");
    cartItemPrice.setAttribute("class", "cart-item-price");
    cartItemPrice.innerText = `${(
      item.quantity * productTable[item.id].price
    ).toFixed(2)}€`; //ZMENIT PODLA DB
    cartItemRight.appendChild(cartItemPrice);
    //cart-item-counter//start
    const cartItemCounter = document.createElement("div");
    cartItemCounter.setAttribute("class", "cart-item-counter");
    cartItemRight.appendChild(cartItemCounter);
    const counterDecrement = document.createElement("div");
    counterDecrement.setAttribute("class", "counter-decrement");
    counterDecrement.innerText = "-";
    counterDecrement.addEventListener("click", handleDecrement);
    cartItemCounter.appendChild(counterDecrement);
    const cartItemCount = document.createElement("div");
    cartItemCount.setAttribute("class", "cart-item-count");
    cartItemCount.innerText = item.quantity;
    cartItemCounter.appendChild(cartItemCount);
    const counterIncrement = document.createElement("div");
    counterIncrement.setAttribute("class", "counter-increment");
    counterIncrement.innerText = "+";
    counterIncrement.addEventListener("click", handleIncrement);
    cartItemCounter.appendChild(counterIncrement);
    //cart-item-counter//end
    const cartItemRemove = document.createElement("div");
    cartItemRemove.setAttribute("class", "cart-item-remove");
    cartItemRemove.innerText = "ODSTRÁNIŤ";
    cartItemRemove.addEventListener("click", handleRemove);
    cartItemRight.appendChild(cartItemRemove);

    updateTotal();
    updateCartCount();
  });
}

function handleDecrement(e) {
  const target = e.target.parentNode.parentNode.parentNode.id;
  if (cart[target].quantity === 1) {
    return;
  } else {
    cart[target].quantity -= 1;
    document.getElementsByClassName("cart-item-count")[target].innerText =
      cart[target].quantity;
    document.getElementsByClassName("cart-item-price")[target].innerText = `${(
      cart[target].quantity * 74.99
    ).toFixed(2)}€`;
    localStorage.setItem("ph__cart", JSON.stringify(cart));
    updateTotal();
    updateCartCount();
  }
}

function handleIncrement(e) {
  const target = e.target.parentNode.parentNode.parentNode.id;
  cart[target].quantity += 1;
  document.getElementsByClassName("cart-item-count")[target].innerText =
    cart[target].quantity;
  document.getElementsByClassName("cart-item-price")[target].innerText = `${(
    cart[target].quantity * 74.99
  ).toFixed(2)}€`;
  localStorage.setItem("ph__cart", JSON.stringify(cart));
  updateTotal();
  updateCartCount();
}

function handleRemove(e) {
  const target = e.target.parentNode.parentNode;
  cart.splice(target.id, 1);
  target.remove();
  const cartList = document.getElementsByClassName("cart-list")[0].childNodes;
  for (let i = target.id; i < cart.length; i++) {
    cartList[i].id -= 1;
  }
  localStorage.setItem("ph__cart", JSON.stringify(cart));
  updateTotal();
  updateCartCount();
}

function updateTotal() {
  const cartTotal = document.getElementsByClassName("cart-total-price")[0];
  const total = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  cartTotal.innerText = `${(total * 74.99).toFixed(2)}€`;
}

function updateCartCount() {
  if (cart.length >= 1) {
    const cartCount = document.getElementsByClassName("cart-count")[0];
    cartCount.innerText = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    cartCount.style.display = "flex";
  } else {
    cartCount.style.display = "none";
  }
}

//NAVBAR-OVERLAY
const navOverlay = document.getElementsByClassName("nav-overlay")[0];
const navOpen = document.getElementsByClassName("hamburger")[0];
const navClose = document.getElementsByClassName("nav-close")[0];

navOpen.addEventListener("click", () => {
  navOverlay.style.right = "0";
  document.body.classList.add("stop-scrolling");
});
navClose.addEventListener("click", () => {
  navOverlay.style.right = "-100vw";
  document.body.classList.remove("stop-scrolling");
});

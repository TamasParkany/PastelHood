//PRODUCT-TABLE
const productTable = {
  f22ro: {
    name: "Real One",
    price: 64.99,
    image: "/assets/images/real/real_front.JPG",
  },
  f22s: {
    name: "Slasher",
    price: 64.99,
    image: "/assets/images/slasher/slasher_front_f.JPG",
  },
  f22lwu: {
    name: "LWU",
    price: 64.99,
    image: "/assets/images/lost/lost_front_f.JPG",
  },
};

//HEADER-HIDER
// const header = document.getElementsByTagName("header")[0];

// let prevScrollpos = window.pageYOffset;
// window.onscroll = function () {
//   let currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     header.style.top = "0";
//   } else {
//     header.style.top = "-150px";
//   }
//   prevScrollpos = currentScrollPos;
// };

//CART-OVERLAY
const cartOverlay = document.getElementsByClassName("cart-overlay")[0];
const cartOpen = document.getElementsByClassName("cart")[0];
const cartClose = document.getElementsByClassName("cart-close")[0];
const cartContinue = document.getElementsByClassName("cart-continue")[0];

cartOpen.addEventListener("click", () => {
  cartOverlay.style.right = "0";
  document.body.classList.add("stop-scrolling");
});
cartClose.addEventListener("click", () => {
  cartOverlay.style.right = "-100vw";
  document.body.classList.remove("stop-scrolling");
});
cartContinue.addEventListener("click", () => {
  cartOverlay.style.right = "-100vw";
  document.body.classList.remove("stop-scrolling");
});

//LOAD-CART
let cart = [];

if (localStorage.getItem("ph__cart") === null) {
  cart = [];
} else {
  const productsFromStorage = JSON.parse(localStorage.getItem("ph__cart"));
  cart = productsFromStorage;
  updateCart();
}

//CHECKOUT
const checkoutButton = document.getElementsByClassName("cart-finish")[0];

checkoutButton.addEventListener("click", () => {
  if (cart.length > 0) {
    fetch(
      "https://pastelhood-api.netlify.app/.netlify/functions/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [...cart],
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
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
      cart[target].quantity * 64.99
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
    cart[target].quantity * 64.99
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
  cartTotal.innerText = `${(total * 64.99).toFixed(2)}€`;
}

function updateCartCount() {
  const cartCount = document.getElementsByClassName("cart-count")[0];
  if (cart.length >= 1) {
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
  navOverlay.style.left = "0";
  document.body.classList.add("stop-scrolling");
});
navClose.addEventListener("click", () => {
  navOverlay.style.left = "-100vw";
  document.body.classList.remove("stop-scrolling");
});

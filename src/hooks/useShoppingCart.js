import { signal } from "@preact/signals-react";
import { currentUser } from "../App";
import { loginError } from "../components/Header/Login";
import { loginDropdownActive } from "../components/Header";
import { cartDropdownActive } from "../components/Header";
import {
  cartAddMessage,
  cartDelMessage,
} from "../components/Header/CartDropdown";

let cartDropdownTimer;
let cartAddMessageTimer;
let cartDelMessageTimer;
let addCounter = 0;
let delCounter = 0;

const cart = signal(JSON.parse(localStorage.getItem("cart")) || []);

const useShoppingCart = () => {
  const addToCart = (product, quantity) => {
    if (cartDropdownTimer) clearTimeout(cartDropdownTimer);
    if (cartAddMessageTimer) clearTimeout(cartAddMessageTimer);
    addCounter += 1;
    cartAddMessage.value = `+${addCounter}`;
    cartAddMessageTimer = setTimeout(() => {
      cartAddMessage.value = "";
      addCounter = 0;
    }, 2000);
    cartDropdownActive.value = true;
    cartDropdownTimer = setTimeout(() => {
      cartDropdownActive.value = false;
    }, 2000);

    product = { ...product, quantity: quantity || 1 };
    cart.value = [...cart.value, product];
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const removeFromCart = (productId) => {
    if (cartDelMessageTimer) clearTimeout(cartDelMessageTimer);
    delCounter -= 1;
    cartDelMessage.value = delCounter;
    cartDelMessageTimer = setTimeout(() => {
      cartDelMessage.value = "";
      delCounter = 0;
    }, 2000);

    cart.value = cart.value.filter((product) => product._id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const incraseQuantity = (productId) => {
    cart.value = cart.value.map((product) => {
      if (product._id === productId) {
        product.quantity++;
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const decreaseQuantity = (productId) => {
    cart.value = cart.value.map((product) => {
      if (product._id === productId) {
        product.quantity--;
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const clearCart = () => {
    cart.value = [];
    localStorage.setItem("cart", JSON.stringify(cart.value));
  };

  const ifInCart = (productId) => {
    return cart.value.find((p) => p._id === productId);
  };

  const handleCartBtnClicked = (product, quantity) => {
    if (!currentUser.value) {
      loginError.value = "Please register/login to add to cart.";
      setTimeout(() => {
        loginError.value = "";
      }, 5000);
      loginDropdownActive.value = true;
      return;
    }

    const found = ifInCart(product._id);

    if (found) {
      removeFromCart(product._id);
    } else {
      addToCart(product, quantity);
    }
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    incraseQuantity,
    decreaseQuantity,
    clearCart,
    ifInCart,
    handleCartBtnClicked,
    cartDropdownTimer,
  };
};

export default useShoppingCart;

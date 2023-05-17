import { createSlice } from "@reduxjs/toolkit";
import { cartKeys } from "app/constants/localStorageKeys";
import { toast } from "react-toastify";

// code for save local storage on next js
const data =
  typeof window !== "undefined" && localStorage.getItem(cartKeys.CART_ITEMS)
    ? JSON.parse(localStorage.getItem(cartKeys.CART_ITEMS))
    : [];
// code for save local storage on next js

const initialState = {
  isOpenModalCart: false,
  cartItems: data,
  // not work to next js  localStorage.getItem(cartKeys.CART_ITEMS)? (JSON.parse(localStorage.getItem(cartKeys.CART_ITEMS))):[],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.product.id);

      state.cartItems[itemIndex].cartQuantity = action.payload.val;
      localStorage.setItem(cartKeys.CART_ITEMS, JSON.stringify(state.cartItems));
    },
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        state.cartItems[itemIndex].total_price = state.cartItems[itemIndex].cartQuantity * state.cartItems[itemIndex].price;
        toast.info(`An additional ${state.cartItems[itemIndex].title} has been added to the cart`);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1, total_price: action.payload?.price };

        toast.success(`${action.payload.title || "The item"} was added to cart`);
        state.cartItems.push(tempProduct);
      }
      state.isOpenModalCart = true;
      localStorage.setItem(cartKeys.CART_ITEMS, JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);
      state.cartItems = nextCartItems;
      localStorage.setItem(cartKeys.CART_ITEMS, JSON.stringify(state.cartItems));
      toast.error(`${action.payload.title} was removed from the cart`);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === action.payload.id);
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        state.cartItems[itemIndex].total_price = state.cartItems[itemIndex].cartQuantity * state.cartItems[itemIndex].price;
        toast.info(`Decrease ${action.payload.title} cart quantity`);
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        localStorage.setItem(cartKeys.CART_ITEMS, JSON.stringify(state.cartItems));
        toast.error(`${action.payload.title} was removed from the cart`);
        localStorage.setItem(cartKeys.CART_ITEMS, JSON.stringify(state.cartItems));
      }
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.removeItem(cartKeys.CART_ITEMS);
    },
    setModalCart(state, action) {
      state.isOpenModalCart = action.payload.open;
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, decreaseCart, getTotals, clearCart, setModalCart } =
  cartSlice.actions;

export default cartSlice.reducer;

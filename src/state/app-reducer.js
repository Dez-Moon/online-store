let initialState = {
  selectedPage: null,
  selectedCurrency: 0,
  categories: [],
  cart: [],
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_PAGE":
      return {
        ...state,
        selectedPage: action.selectedPage,
      };
    case "SET_SELECTED_CURRENCY":
      localStorage.setItem("selectedCurrency", action.selectedCurrency);
      return {
        ...state,
        selectedCurrency: action.selectedCurrency,
      };
    case "SET_CATEGORIES": {
      return { ...state, categories: action.categories };
    }
    case "ADD_PRODUCT_TO_CART":
      let cart = [...state.cart];
      if (state.cart.length === 0) {
        cart = [action.product, ...state.cart];
        localStorage.setItem("cart", JSON.stringify(cart));
        return { ...state, cart };
      } else {
        for (let i = 0; i < state.cart.length; i++) {
          let matches = 0;
          if (action.product && state.cart[i].id === action.product.id) {
            action.product.selectedAttributes.forEach((value, key) => {
              if (
                state.cart[i].selectedAttributes.has(key) &&
                state.cart[i].selectedAttributes.get(key) === value
              ) {
                matches += 1;
              }
            });
          } else {
            cart = [action.product, ...state.cart];
            localStorage.setItem("cart", JSON.stringify(cart));
          }
          if (matches === action.product.selectedAttributes.size) {
            cart = [...state.cart];
            cart[i].count += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            return { ...state, cart };
          } else {
            cart = [action.product, ...state.cart];
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
      }
      return { ...state, cart };
    case "EDIT_COUNT_PRODUCT_IN_CART": {
      let stateCopy = { ...state, cart: [...state.cart] };
      let productCopy = { ...state.cart[action.index] };
      productCopy.count += action.count;
      if (productCopy.count === 0) {
        productCopy.count = 1;
      }
      stateCopy.cart[action.index] = productCopy;
      localStorage.setItem("cart", JSON.stringify(stateCopy.cart));
      return stateCopy;
    }
    case "DELETE_PRODUCT_FROM_CART": {
      let stateCopy = { ...state, cart: [...state.cart] };
      stateCopy.cart.splice(action.index, 1);
      localStorage.setItem("cart", JSON.stringify(stateCopy.cart));
      return stateCopy;
    }
    case "CART_CLEAR": {
      return { ...state, cart: [] };
    }
    case "CART_UPDATE": {
      return { ...state, cart: action.cart };
    }
    default:
      return state;
  }
};

export const setSelectedPageAC = (selectedPage) => ({
  type: "SET_SELECTED_PAGE",
  selectedPage,
});
export const setSelectedCurrencyAC = (selectedCurrency) => ({
  type: "SET_SELECTED_CURRENCY",
  selectedCurrency,
});
export const setCategoriesAC = (categories) => ({
  type: "SET_CATEGORIES",
  categories,
});
export const addProductToCartAC = (product) => ({
  type: "ADD_PRODUCT_TO_CART",
  product,
});
export const editCountProductInCartAC = (index, count) => ({
  type: "EDIT_COUNT_PRODUCT_IN_CART",
  index,
  count,
});
export const deleteProductFromCartAC = (index) => ({
  type: "DELETE_PRODUCT_FROM_CART",
  index,
});
export const cartClearAC = () => ({ type: "CART_CLEAR" });
export const cartUpdateAC = (cart) => ({ type: "CART_UPDATE", cart });
export default appReducer;

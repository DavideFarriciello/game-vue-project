import { reactive, readonly } from 'vue';

export const store = reactive({
  isLoggedIn: false
});

export function logout() {
  store.isLoggedIn = false;
}

const state = reactive({
  cart: [],
  favorites: []
});

const addToCart = (game) => {
  const existing = state.cart.find(item => item.id === game.id);
  if (!existing) {
    state.cart.push({ ...game, quantity: 1 });
    return true;  // Indicate that the item was successfully added
  }
  // Optionally return false or throw an error if the item is already in the cart
  return false;  // Indicate that the item was not added because it already exists
};

const addToFavorites = (game) => {
  const existing = state.favorites.find(item => item.id === game.id);
  if (!existing) {
    state.favorites.push({ ...game, quantity: 1 });
    return true;  
  }
  return false;  
};

const removeFromCart = (gameId) => {
  const index = state.cart.findIndex(item => item.id === gameId);
  if (index !== -1) {
    state.cart.splice(index, 1);
  }
};

const removeFromFavorites = (gameId) => {
  const index = state.favorites.findIndex(item => item.id === gameId);
  if (index !== -1) {
    state.favorites.splice(index, 1);
  }
};

const clearCart = () => {
  state.cart = [];
};

export function useCartStore() {
  return {
    cart: readonly(state.cart),
    favorites: readonly(state.favorites),
    addToCart,
    addToFavorites,
    removeFromCart,
    removeFromFavorites,
    clearCart
  };
}

import { reactive, readonly } from 'vue';

const state = reactive({
  cart: [],
  favorites: []
});

const addToCart = (game) => {
  const existing = state.cart.find(item => item.id === game.id);
  if (!existing) {
    state.cart.push({ ...game, quantity: 1 });
  } else {
    existing.quantity += 1;
  }
};

const addToFavorite = (game) => {
  const existing = state.favorites.find(item => item.id === game.id);
  if (!existing) {
    state.favorites.push(game);
  }
};

const removeFromCart = (gameId) => {
  const index = state.cart.findIndex(item => item.id === gameId);
  if (index !== -1) {
    state.cart.splice(index, 1);
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
    addToFavorite,
    removeFromCart,
    clearCart
  };
}

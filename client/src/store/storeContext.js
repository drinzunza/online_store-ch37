import { createContext } from 'react';

/**
 * Context is a description of the data
 * Interface / Plan / BluePrint
 * It should not have any implementation
 */
const StoreContext = createContext({
  cart: [],
  user: {},
  addToCart: () => {},
  removeFromCart: () => {},
  getCartCount: () => {},
});

export default StoreContext;

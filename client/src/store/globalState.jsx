import { useState } from 'react';
import StoreContext from './storeContext';

const GlobalState = (props) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ id: 1233, name: 'Sergio', email: 'sinzunza@sdgku.edu' });

  const addToCart = (product) => {
    let copy = [...cart];
    let found = false;
    for (let i = 0; i < copy.length; i++) {
      let cartProd = copy[i];
      if (cartProd._id === product._id) {
        found = true;
        cartProd.quantity += product.quantity;
      }
    }

    if (!found) {
      copy.push(product);
    }

    setCart(copy);
  };

  const removeFromCart = (_id) => {
    let copy = cart.filter((p) => p._id != _id);
    setCart(copy);
  };

  const getCartCount = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      let prod = cart[i];
      total += prod.quantity;
    }
    return total;
  };

  return (
    <StoreContext.Provider
      value={{
        cart: cart,
        user: user,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        getCartCount: getCartCount,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default GlobalState;

/***
 * stp1 - console log the coupon code text
 */

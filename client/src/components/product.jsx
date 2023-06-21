import StoreContext from '../store/storeContext';
import './product.css';
import QuantityPicker from './quantityPicker';
import { useContext, useState } from 'react';

const Product = (props) => {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useContext(StoreContext).addToCart;

  const handleAdd = () => {
    const prod2Cart = { ...props.data, quantity };
    addToCart(prod2Cart); // call the global state function
  };

  function onQuantityChange(qty) {
    console.log('new value: ' + qty);
    setQuantity(qty);
  }

  function getTotal() {
    let total = props.data.price * quantity;
    return total.toFixed(2);
  }

  return (
    <div className="product">
      <img src={'/images/' + props.data.image} alt="" />
      <h5>{props.data.title}</h5>

      <div className="prices">
        <label className="lbl-total">
          <span>Total</span> ${getTotal()}
        </label>
        <label className="lbl-price">
          <span>Price</span> ${props.data.price.toFixed(2)}
        </label>
      </div>

      <div className="controls">
        <QuantityPicker onChange={onQuantityChange} />

        <button className="btn btn-sm btn-success btn-add" onClick={handleAdd}>
          <i className="fa-solid fa-cart-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Product;

//when the user clicks on the add button console log: how many products
//are being added.
//i.e
// Adding 6 oranges

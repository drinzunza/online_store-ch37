import { useContext } from 'react';
import './productInCart.css';
import StoreContext from '../store/storeContext';

const ProductInCart = (props) => {
  const removeFromCart = useContext(StoreContext).removeFromCart;

  const getTotal = () => {
    const total = props.data.price * props.data.quantity;
    return total.toFixed(2);
  };

  const handleDelete = () => {
    removeFromCart(props.data._id);
  };

  return (
    <div className="cart-product">
      <img src={'/images/' + props.data.image} alt="" />
      <div className="desc">
        <h5>{props.data.title}</h5>
        <label>{props.data.category}</label>
      </div>
      <label>${props.data.price.toFixed(2)}</label>
      <label>{props.data.quantity}</label>
      <label className="lbl-total">${getTotal()}</label>
      <button onClick={handleDelete} className="btn btn-sm btn-outline-danger">
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default ProductInCart;

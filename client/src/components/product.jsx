import './product.css';
import QuantityPicker from './quantityPicker';

const Product = (props) => {

  const handleAdd = () => {
    console.log("Add to cart");
  };

  return (
    <div className="product">
      <img src={"/images/"+ props.data.image} />
      <h5>{props.data.title}</h5>

      <label>${props.data.price.toFixed(2)}</label>

      <QuantityPicker />

      <button className='btn btn-sm btn-success' onClick={handleAdd}>
        <i className="fa-solid fa-cart-plus"></i>
      </button>
    </div>
  );
};

export default Product;

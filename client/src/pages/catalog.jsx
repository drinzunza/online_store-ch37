import Product from '../components/product';
import './catalog.css';

const Catalog = () => {
  return (
    <div className="catalog">
      <h3>Check our amazing catalog below</h3>

      <div className="products">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Catalog;



// JS default vs named exports
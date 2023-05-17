import Product from '../components/product';
import './catalog.css';
import DataService from '../services/dataService';
import { useEffect, useState } from 'react';

const Catalog = () => {
  // allProducts
  const [allProducts, setAllProducts] = useState([]);

  // do something when the component loads
  useEffect(() => {
    let service = new DataService();
    let prods = service.getProducts();
    setAllProducts(prods);
  }, []);

  return (
    <div className="catalog">
      <h3>Check our amazing catalog below</h3>
      <h5>We currently have {allProducts.length} products ready for you</h5>

      <div className="products">
       { allProducts.map( prod => <Product key={prod._id} data={prod} /> ) }
      </div>
    </div>
  );
};

export default Catalog;
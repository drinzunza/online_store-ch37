import Product from '../components/product';
import './catalog.css';
import DataService from '../services/dataService';
import { useEffect, useState } from 'react';

const Catalog = () => {
  // allProducts
  const [allProducts, setAllProducts] = useState([]);
  //lets practice the use of state variables
  const [categories, setCategories] = useState([]);
  //create state variables for products to display
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  // do something when the component loads
  useEffect(() => {
    loadCatalog();
  }, []);

  async function loadCatalog() {
    let service = new DataService();
    let prods = await service.getProducts();
    setAllProducts(prods);
    setProductsToDisplay(prods);

    let cats = await service.getCategories();
    setCategories(cats);
  }

  const funFilter = (filter) => {
    //find the products that match the categories
    //and add it to the list
    let list = [];
    allProducts.forEach((product) => {
      if (product.category === filter) list.push(product);
    });
    console.log(list);
    setProductsToDisplay(list);
  };

  function clearFilters() {
    setProductsToDisplay(allProducts);
  }
  return (
    <div className="catalog page">
      <h1>Our Catalog</h1>

      <div className="products">
        {/*Here create a new button that clear the filters and render
        all the products again*/}
        <button onClick={clearFilters} className="btn btn-sm btn-dark btn-filter">
          all
        </button>

        {/*Here render each category into a button*/}
        {categories.map((filter) => (
          <button key={filter} onClick={() => funFilter(filter)} className="btn btn-sm btn-info btn-filter">
            {filter}
          </button>
        ))}
        <br />
        {productsToDisplay.map((prod) => (
          <Product key={prod._id} data={prod} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
//render buttons according to the amount of categories that we have 
//in the dataservice- we already create a list that contain 
//that elements

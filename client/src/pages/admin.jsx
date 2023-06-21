import { useEffect, useState } from 'react';
import './admin.css';
import DataService from '../services/dataService';

const Admin = () => {
  const [product, setProduct] = useState({});
  const [coupon, setCoupon] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const service = new DataService();
    const prods = await service.getProducts();
    setAllProducts(prods);

    const coupons = await service.getCoupons();
    setAllCoupons(coupons);
  };

  const handleTextChange = (e) => {
    let text = e.target.value;
    const name = e.target.name;

    if (name === 'price') {
      // parse text to be a number
      text = parseFloat(text);
    }

    /**
     * Create a copy
     * Modify the copy
     * set the copy back
     */
    let copy = { ...product };
    copy[name] = text;
    setProduct(copy);
  };

  const saveProduct = async () => {
    console.log(product);

    // TODO: Send product to server
    const service = new DataService();
    const savedProduct = await service.saveProduct(product);
    console.log(savedProduct);

    // add product to allProducts array
    let copy = [...allProducts];
    copy.push(product);
    setAllProducts(copy);
  };

  const handleCouponChange = (e) => {
    let text = e.target.value;
    const name = e.target.name;

    if (name === 'discount') {
      text = parseFloat(text);
    }

    let copy = { ...coupon };
    copy[name] = text;
    setCoupon(copy);
  };

  const saveCoupon = () => {
    console.log(coupon);

    // TODO: save to server

    // add to list
    let copy = [...allCoupons];
    copy.push(coupon);
    setAllCoupons(copy);
  };

  const handleDeleteCoupon = async (id) => {
    let service = new DataService();
    let response = await service.deleteCoupon(id);
    // delete the coupon from allCoupons
    let copy = allCoupons.filter((c) => c._id != id);
    setAllCoupons(copy);
  };

  return (
    <div className="admin page">
      <h1>Store Administration</h1>

      <div className="sections">
        <section className="products">
          <h3>Products</h3>

          <div className="form">
            <div className="row">
              <label className="form-label">Title</label>
              <input onBlur={handleTextChange} name="title" type="text" className="form-control" />
            </div>

            <div className="row">
              <label className="form-label">Price</label>
              <input onBlur={handleTextChange} name="price" type="number" className="form-control" />
            </div>

            <div className="row">
              <label className="form-label">Category</label>
              <input onBlur={handleTextChange} name="category" type="text" className="form-control" />
            </div>

            <div className="row">
              <label className="form-label">Image</label>
              <input onBlur={handleTextChange} name="image" type="text" className="form-control" />
            </div>

            <div className="form-buttons">
              <button onClick={saveProduct} className="btn btn-primary">
                Save Product
              </button>
            </div>
          </div>

          <ul className="product-list">
            {allProducts.map((p) => (
              <li>
                <span className="title">{p.title}</span>
                <span className="price">${p.price.toFixed(2)}</span>
                <span className="cat">{p.category}</span>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="coupons">
          <h3>Coupon Code</h3>
          <div className="form">
            <div className="row">
              <label className="form-label">Coupon Code</label>
              <input onBlur={handleCouponChange} name="code" type="text" className="form-control" />
            </div>

            <div className="row">
              <label className="form-label">Discount</label>
              <input onBlur={handleCouponChange} name="discount" type="number" className="form-control" />
            </div>

            <div className="form-buttons">
              <button onClick={saveCoupon} className="btn btn-primary">
                Save Coupon Code
              </button>
            </div>
          </div>

          <ul className="product-list">
            {allCoupons.map((c) => (
              <li>
                <span className="title">{c.code}</span>
                <span className="price">${c.discount.toFixed(2)}</span>
                <button onClick={() => handleDeleteCoupon(c._id)} className="btn btn-sm btn-outline-danger">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Admin;

/**
 * Coupon Code
 * code (text)
 * discount (number)
 */

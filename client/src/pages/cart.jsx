import { useContext, useState } from 'react';
import './cart.css';
import StoreContext from '../store/storeContext';
import ProductInCart from '../components/productInCart';

import { Link } from 'react-router-dom';
import DataService from '../services/dataService';

const Cart = () => {
  const { cart, getCartCount } = useContext(StoreContext);
  const [couponText, setCouponText] = useState('');
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const [coupon, setCoupon] = useState(null);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const prod = cart[i];
      total += prod.quantity * prod.price;
    }

    return total.toFixed(2);
  };

  const getTotalWithDiscount = () => {
    let total = getTotal();

    if (!coupon) {
      return total;
    }

    const discount = (coupon.discount / 100) * total;
    total = total - discount;

    return total.toFixed(2);
  };

  if (cart.length < 1) {
    return (
      <div className="cart page no-prods">
        <h3>Empty Cart</h3>
        <h4>
          Please go to <Link to="/catalog">Catalog</Link> and add some product to your backet.
        </h4>
      </div>
    );
  }

  const handleCouponText = (e) => {
    const text = e.target.value;
    setCouponText(text);
  };

  const handleApplyCoupon = async () => {
    const service = new DataService();
    const coupon = await service.getCouponByCode(couponText);
    if (coupon) {
      setInvalidCoupon(false);
      setCoupon(coupon);
    } else {
      setInvalidCoupon(true);
      setCoupon(null);
    }
  };

  return (
    <div className="cart page">
      <h1>Ready to Pay?</h1>

      <div className="cart-content">
        <section className="product-list">
          {cart.map((p) => (
            <ProductInCart key={p._id} data={p}></ProductInCart>
          ))}
        </section>

        <aside className="info">
          <h5>Products</h5>
          <h3>{getCartCount()}</h3>

          <h5>Subtotal</h5>
          <h3>{getTotal()}</h3>

          <div className="discount">
            <label className="form-label">Apply coupon code:</label>

            {invalidCoupon ? <label className="error">Invalid Code</label> : null}

            <div className="controls">
              <input onBlur={handleCouponText} className="form-control" type="text"></input>
              <button onClick={handleApplyCoupon} className="btn btn-sm btn-outline-primary">
                Apply
              </button>
            </div>
          </div>

          <h5 className="mt-5">Total</h5>
          <h3>{getTotalWithDiscount()}</h3>

          <hr className="divider" />

          <button className="btn btn-outline-success">Complete Order</button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;

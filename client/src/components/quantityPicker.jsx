import { useState } from 'react';
import './quantityPicker.css';

const QuantityPicker = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if(quantity > 1) {
        setQuantity(quantity - 1);
    }
  };

  return (
    <div className="qt-picker">
      <button className='btn btn-sm btn-outline-success' onClick={handleDecrease} disabled={quantity === 1}>-</button>
      <label>{quantity}</label>
      <button className='btn btn-sm btn-outline-success' onClick={handleIncrease}>+</button>
    </div>
  );
};

export default QuantityPicker;

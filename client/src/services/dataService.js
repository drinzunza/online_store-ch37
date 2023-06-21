import axios from 'axios';

var catalog = [
  {
    _id: '1',
    price: 12.99,
    title: 'Cabbage',
    image: 'img-1.jpg',
    category: 'Vegetable',
  },
  {
    _id: '2123sxw12312',
    price: 22.71,
    title: 'Strawberry',
    image: 'product-6.jpg',
    category: 'Fruit',
  },
  {
    _id: 'asvdooy123',
    price: 32.0,
    title: 'Bell pepper',
    image: 'img-14.jpg',
    category: 'Vegetable',
  },
  {
    _id: '4',
    price: 6.99,
    title: 'Carrot',
    image: 'img-4.jpg',
    category: 'Vegetable',
  },
  {
    _id: '5',
    price: 16.39,
    title: 'Banana',
    image: 'img-5.jpg',
    category: 'Fruit',
  },
  {
    _id: '6',
    price: 14.0,
    title: 'Orange',
    image: 'product-10.jpg',
    category: 'Fruit',
  },
  {
    _id: '7',
    price: 12.0,
    title: 'Egg',
    image: 'img-15.jpg',
    category: 'Dairy & Eggs',
  },
  {
    _id: '8',
    price: 19.1,
    title: 'Orange Juice',
    image: 'product-15.jpg',
    category: 'Beverages',
  },
];

class DataService {
  serverUrl = 'http://127.0.0.1:5000';

  async getProducts() {
    // return catalog;

    // get data from server
    const results = await axios.get(this.serverUrl + '/api/products');
    return results.data;
  }

  async getCategories() {
    const response = await axios.get(this.serverUrl + '/api/categories');
    return response.data;
  }

  async getCoupons() {
    const response = await axios.get(this.serverUrl + '/api/coupons');
    return response.data;
  }

  async getCouponByCode(code) {
    try {
      const response = await axios.get(this.serverUrl + '/api/coupon/' + code);
      return response.data;
    } catch {
      return null;
    }
  }

  async deleteCoupon(id) {
    const response = await axios.delete(this.serverUrl + '/api/coupon/' + id);
    return response.data;
  }

  async saveProduct(product) {
    try {
      const response = await axios.post(this.serverUrl + '/api/products', product);
      return response.data;
    } catch {
      return null;
    }
  }
}

export default DataService;

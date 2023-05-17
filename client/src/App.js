import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Catalog from './pages/catalog';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";

function App() {
  return (
    <div className="App">
      <Navbar />      

      <main>
        <Catalog />
      </main>

      <Footer />
    </div>
  );
}

export default App;

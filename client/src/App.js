import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Catalog from './pages/catalog';

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

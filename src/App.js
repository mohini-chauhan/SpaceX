import "./App.css";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import Dashboard from "./components/Dashboard/Dashboard";
import CapsuleProvider from "./context/CapsuleProvider";
import Footer from "./components/Footer/Footer";
// import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <CapsuleProvider>
      <section className="App">
        <Navbar />
        <Banner />
        <Dashboard />
        <Product />
        <Footer />
      </section>
    </CapsuleProvider>
  );
}

export default App;

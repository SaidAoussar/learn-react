import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { ToastProvider } from "./context/ToastContext";




function App() {



  return (<div>
    <Header />
    <main role="main" className="container mx-auto px-4">
      <ToastProvider>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </ToastProvider>
    </main>
  </div >)
}

export default App;

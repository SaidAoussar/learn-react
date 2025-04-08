import { useEffect, useState } from "react";
import { Product } from "./types/Product";
import { productData } from "./mock-data/product-data";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import Toast, { ToastType } from "./components/Toast";
import { CartItem } from "./types/CartItem";
import { useFetch } from "./hooks/useFetch";



const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("http://localhost:3000/products");
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return await res.json()
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(`${error}`);
  }
}


function App() {

  const [cart, setCart] = useState<CartItem[]>([]);
  const { data: products, isLoading, error } = useFetch<Product[]>("http://localhost:3000/products")




  const [showToast, setShowToast] = useState<boolean>(false);
  const [msgToast, setMsgToast] = useState<string>("success");
  const [typeToast, setTypeToast] = useState<ToastType>(ToastType.Success);




  useEffect(() => {

    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        setMsgToast("")
      }, 4000)

      return () => clearTimeout(timer);
    }

  }, [showToast])

  const handleAddToCart = (product: Product) => {
    const productExist = cart.some((c) => c.product.id === product.id);
    if (!productExist) {
      setCart((prev) => [...prev, { product: product, quantity: 1 }]);
      showSuccessToast("Product added to your cart successfully!");
    } else {

      setCart(prev => {
        return prev.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      })
      showSuccessToast("Product quantity updated in your cart!");
    }
  }

  const handleClose = () => {
    setShowToast(false);
  }

  const showSuccessToast = (msg: string) => {
    setShowToast(true);
    setMsgToast(msg);
    setTypeToast(ToastType.Success)
  }


  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <main role="main" className="container mx-auto px-4">
      <Toast isVisible={showToast} type={typeToast} message={msgToast} onClose={handleClose} />
      <Header cartCount={getCartCount()} />
      {error && <div className="error-message text-red-500">{error}</div>}
      {isLoading && <div className="loading-spinner">Loading...</div>}
      {!isLoading && !error && <ProductList products={products || []} addToProduct={handleAddToCart} cart={cart} />}
    </main>
  );
}

export default App;

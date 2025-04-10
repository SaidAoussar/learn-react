import ProductList from "../components/ProductList";
import { useFetch } from "../hooks/useFetch";
import { Product } from "../types/Product";


const ProductsPage = () => {
  const { data: products, isLoading, error } = useFetch<Product[]>("http://localhost:3000/products")

  return <div>
    {error && <div className="error-message text-red-500">{error}</div>}
    {isLoading && <div className="loading-spinner">Loading...</div>}
    {!isLoading && !error && <ProductList products={products || []} />}
  </div>
}


export default ProductsPage;
import React from "react"
import { Product } from "../types/Product"
import ProductCard from "./ProductCard"
import { useCart } from "../context/CartContext"


type ProductListProps = {
  products: Product[],
}


const ProductList: React.FC<ProductListProps> = ({ products }) => {

  const { addToCart } = useCart();



  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="product-list-container">
    {products.length !== 0 ?
      products.map((product) => <ProductCard product={product} key={product.id} onAddToCart={addToCart} />)
      :
      <p>no products found</p>
    }
  </div>
}



export default ProductList;
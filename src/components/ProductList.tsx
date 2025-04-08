import React from "react"
import { Product } from "../types/Product"
import ProductCard from "./ProductCard"
import { CartItem } from "../types/CartItem"


type ProductListProps = {
  products: Product[],
  addToProduct?: (product: Product) => void,
  cart?: CartItem[]

}


const ProductList: React.FC<ProductListProps> = ({ products, addToProduct, cart }) => {



  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="product-list-container">
    {products.length !== 0 ?
      products.map((product) => <ProductCard product={product} key={product.id} onAddToCart={addToProduct} isInCart={cart?.some(p => p.product.id === product.id)} />)
      :
      <p>no products found</p>
    }
  </div>
}



export default ProductList;
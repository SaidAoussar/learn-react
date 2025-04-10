import { useState } from "react";
import { Product } from "../types/Product";
import { ShoppingCart } from "lucide-react";
import { CartCallback } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { ToastType } from "./Toast";


type productCardProps = {
  product: Product,
  onAddToCart?: (product: Product, callbacks?: CartCallback) => void,
}


const shortDescription = (description: string) => {
  return description.split('.')[0];
}

const ProductCard: React.FC<productCardProps> = ({ product, onAddToCart }) => {

  const [showDescription, setShowDescription] = useState<boolean>(false);
  const { showToast } = useToast();
  const toggleDescription = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDescription((prevState) => !prevState);
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, {
        onSuccess: (msg) => showToast(msg, ToastType.Success)
      })
    }

  }

  return (<div className="bg-white shadow-md rounded-2xl overflow-hidden p-4 max-w-sm hover:shadow-lg transition cursor-pointer hover:scale-105">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
    <p className="text-gray-600 text-sm mb-4">
      {showDescription ? product.description : shortDescription(product.description)}

      <a onClick={toggleDescription} className="block text-blue-400 hover:underline cursor-pointer">{showDescription ? 'show less' : 'show more'}</a>
    </p>
    <div className="text-lg font-bold text-blue-600">
      ${product.price.toFixed(2)}
    </div>
    <button role="button" onClick={handleAddToCart} className={`w-full py-2 px-4 rounded-lg transition flex justify-center transform active:scale-95 bg-blue-600 text-white hover:bg-blue-700`}><ShoppingCart size={24} /><span className="ml-2">Add To Cart</span></button>
  </div >)
}


export default ProductCard;
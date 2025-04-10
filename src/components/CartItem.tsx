import React from "react"
import { CartItem as CartItemType } from "../types/CartItem"
import { useCart } from "../context/CartContext"


type CartItemProps = {
  item: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {

  const { removeFromCart, updateQuantity } = useCart();
  return <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
    <div className="flex items-center gap-4">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-24 h-24 rounded-lg object-cover border"
      />
      <div>
        <h3 className="text-lg font-semibold">{item.product.name}</h3>
        <p className="text-sm text-gray-500">{item.product.description}</p>
        <div className="mt-2 flex items-center space-x-2">
          <button className="w-8 h-8 border rounded hover:bg-gray-100" onClick={() => updateQuantity(item.product.id, 'decrement')}>-</button>
          <span className="text-sm font-medium">{item.quantity}</span>
          <button className="w-8 h-8 border rounded hover:bg-gray-100" onClick={() => updateQuantity(item.product.id, 'increment')}>+</button>
        </div>
      </div>
    </div>

    <div className="mt-4 sm:mt-0 flex flex-col items-end space-y-2">
      <span className="text-lg font-bold text-gray-800">${(item.product.price * item.quantity).toFixed(2)}</span>
      <button className="text-red-500 text-sm hover:underline" onClick={() => removeFromCart(item.product.id)}>Remove</button>
    </div>
  </div>
}



export default CartItem;
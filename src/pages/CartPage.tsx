import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
const CartPage = () => {


  const { cart, cartCount, subtotal, total } = useCart()


  return (<div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
      <ShoppingCart className="h-6 w-6" />
      Your Shopping Cart
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex justify-between mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Cart Items ({cartCount})</h2>
            <p className="text-gray-600">Price</p>
          </div>

          {cart.map((item) => (
            <CartItem
              item={item} key={item.product.id}
            />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <Link to="/" className="inline-flex h-10 items-center justify-center rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 ring-offset-white transition-colors hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:bg-blue-100 disabled:pointer-events-none disabled:opacity-50">Continue Shopping</Link>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 className="text-lg font-semibold mb-6 pb-6 border-b border-gray-200">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">{subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-600">Tax</p>
              <p className="font-medium">8%</p>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold">{total.toFixed(2)}</p>
            </div>
          </div>

          <button className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm ring-offset-white transition-colors hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:bg-blue-800 disabled:pointer-events-none disabled:opacity-50 my-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
            Proceed to Checkout
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>We accept all major credit cards and PayPal</p>
          </div>
        </div>
      </div>
    </div>
  </div>)
}


export default CartPage;
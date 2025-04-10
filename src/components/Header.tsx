import { ShoppingCart } from "lucide-react";

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


const Header: React.FC = () => {

  const { cartCount } = useCart()
  return <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between mb-4">
    <Link to="/" className="text-2xl font-bold text-gray-800">MyStore</Link>

    <Link to="/cart" className="text-gray-600 text-xl relative">
      <ShoppingCart size={24} />
      {cartCount > 0 && (
        <span className="absolute -top-3 left-4/3 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-0.5 py-0.5 rounded-full min-w-6 text-center">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  </header>

}

export default Header;
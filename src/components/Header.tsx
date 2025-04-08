import { ShoppingCart } from "lucide-react";


type HeaderProps = {
  cartCount: number,
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  return <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between mb-4">
    <div className="text-2xl font-bold text-gray-800">MyStore</div>

    <div className="text-gray-600 text-xl relative">
      <ShoppingCart size={24} />
      {cartCount > 0 && (
        <span className="absolute -top-3 left-4/3 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-0.5 py-0.5 rounded-full min-w-6 text-center">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </div>
  </header>

}

export default Header;
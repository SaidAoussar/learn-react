import { createContext, useState, ReactNode, useContext } from "react";
import { Product } from "../types/Product";
import { CartItem } from "../types/CartItem";


export type CartCallback = {
  onSuccess?: (msg: string) => void,
  onError?: (msg: string) => void
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, callbacks?: CartCallback) => void,
  removeFromCart: (id: string) => void,
  updateQuantity: (id: string, type: 'increment' | 'decrement') => void
  cartCount: number,
  subtotal: number,
  total: number,
}

const cartContext = createContext<CartContextType | undefined>(undefined);


export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);


  const addToCart = (product: Product, callbacks?: CartCallback) => {

    let wasUpdated = false;
    let wasAdded = false;


    setCart((prev) => {
      const exists = prev.some((item) => item.product.id === product.id)
      if (exists) {
        wasUpdated = true;
        return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);

      }

      wasAdded = true;
      return [...prev, { product, quantity: 1 }]
    })

    if (wasUpdated) {
      callbacks?.onSuccess?.("Product quantity updated in cart.");
    } else if (wasAdded) {
      callbacks?.onSuccess?.("Product added to cart");
    }

  }

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      return prev.filter((i) => i.product.id !== id);
    })
  }

  const updateQuantity = (id: string, type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setCart((prev) => {
        return prev.map((i) => i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)
      })
    } else if (type === 'decrement') {
      setCart((prev) => {
        return prev.map((i) => {
          if (i.product.id === id) {
            if (i.quantity > 0) {
              if (i.quantity - 1 === 0) {
                removeFromCart(i.product.id);
              }
              return { ...i, quantity: i.quantity - 1 };
            }
          }

          return i;
        })
      })
    }
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const tax = 0.08;
  const total = subtotal + tax * subtotal;

  return (
    <cartContext.Provider value={{ cart, addToCart, cartCount, subtotal, total, removeFromCart, updateQuantity }}>
      {children}
    </cartContext.Provider>
  )
}


export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used withen a CartProvider");
  }
  return context;
}



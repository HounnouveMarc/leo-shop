import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const sendWhatsApp = () => {
    if (cart.length === 0) return;
    const lines = cart.map((item) => `- ${item.qty} x ${item.name}`).join("\n");
    const msg = `Bonjour,\nJe souhaite commander :\n${lines}\n\nMerci de me faire un retour.`;
    const url = `https://wa.me/243801145005?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, totalItems, isOpen, setIsOpen, sendWhatsApp }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQty, removeFromCart, totalItems, sendWhatsApp } = useCart();

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#1E1E1E] z-50 shadow-2xl flex flex-col border-l border-[#C9A227]/20">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#C9A227]/20">
          <h2 className="font-display text-xl font-semibold text-[#F5F5F5]">
            Mon Panier <span className="text-[#C9A227] text-base">({totalItems})</span>
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-[#888] hover:text-[#F5F5F5] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-[#888] text-sm text-center mt-10">Votre panier est vide.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-[#111111] rounded-xl p-3 border border-[#C9A227]/10">
                <img
                  src={`/products/images/${item.id}/main.jpeg`}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg"
                  onError={(e) => { e.target.src = `https://placehold.co/56x56/1E1E1E/C9A227?text=📱`; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#F5F5F5] truncate">{item.name}</p>
                  <p className="text-[#C9A227] text-sm font-semibold">${item.price}</p>
                </div>
                {/* Qty controls */}
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-full bg-[#1E1E1E] border border-[#C9A227]/30 text-[#C9A227] flex items-center justify-center hover:border-[#C9A227]">
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-full bg-[#1E1E1E] border border-[#C9A227]/30 text-[#C9A227] flex items-center justify-center hover:border-[#C9A227]">
                    <Plus size={12} />
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 ml-1">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-[#C9A227]/20 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#888]">Total estimé</span>
              <span className="text-[#C9A227] font-semibold font-display text-lg">${total}</span>
            </div>
            <button
              onClick={sendWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-xl hover:bg-[#1ebe5d] transition-colors active:scale-95"
            >
              <MessageCircle size={18} />
              Passer la commande via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
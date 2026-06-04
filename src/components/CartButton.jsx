import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      title="Mon panier"
      className="fixed z-50 flex items-center justify-center transition-all active:scale-95"
      style={{
        bottom: "88px",
        right: "20px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #C9A227, #e0b52e)",
        boxShadow: "0 4px 20px rgba(201,162,39,0.35)",
        color: "#111111",
      }}
    >
      <ShoppingCart size={19} />
      {totalItems > 0 && (
        <span
          className="absolute flex items-center justify-center text-[10px] font-bold"
          style={{
            top: "-4px",
            right: "-4px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#111111",
            color: "#C9A227",
            border: "1.5px solid #C9A227",
          }}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
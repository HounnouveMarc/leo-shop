import { Link } from "react-router-dom";
import { ShoppingCart, Expand } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, setIsOpen } = useCart();

  // La première image est déjà un chemin complet (/products/iphone-16-pro/1.jpeg)
  const mainImage = product.images?.[0] ?? null;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setIsOpen(true);
  };

  return (
    <div className="product-card flex flex-col group">

      {/* Image */}
      <Link to={`/produit/${product.id}`} className="relative block overflow-hidden">
        <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          {/* Fallback placeholder */}
          <div
            style={{
              display: mainImage ? "none" : "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              background: "#1A1A1A",
              color: "#C9A227",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
            }}
          >
            {product.name}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge condition */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={
              product.condition === "Neuf"
                ? { background: "rgba(201,162,39,0.18)", color: "#C9A227", border: "1px solid rgba(201,162,39,0.3)" }
                : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.12)" }
            }
          >
            {product.condition}
          </span>
        </div>

        {/* Expand */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Expand size={13} className="text-white/80" />
          </div>
        </div>
      </Link>

      {/* Infos */}
      <div className="flex flex-col flex-1" style={{ padding: "1rem 1.1rem 1.1rem" }}>
        <Link to={`/produit/${product.id}`}>
          <h3
            className="font-display font-semibold transition-colors"
            style={{ fontSize: "1.05rem", color: "#F5F5F5", lineHeight: 1.3 }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#C9A227"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#F5F5F5"}
          >
            {product.name}
          </h3>
        </Link>
        <p style={{ fontSize: "0.7rem", color: "#555", marginTop: "0.25rem", letterSpacing: "0.05em" }}>
          {product.storage} · {product.color}
        </p>

        <p className="font-display font-semibold" style={{ fontSize: "1.3rem", color: "#C9A227", marginTop: "0.75rem" }}>
          ${product.price}
        </p>

        <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-1.5 transition-all active:scale-95"
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #C9A227, #e0b52e)",
              color: "#111",
              fontWeight: 600,
              fontSize: "0.78rem",
              padding: "0.6rem 0",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(201,162,39,0.2)",
            }}
          >
            <ShoppingCart size={13} /> Ajouter
          </button>
          <Link
            to={`/produit/${product.id}`}
            className="flex items-center justify-center transition-all"
            style={{
              padding: "0.6rem 0.9rem",
              borderRadius: "10px",
              fontSize: "0.78rem",
              color: "#C9A227",
              border: "1px solid rgba(201,162,39,0.2)",
              background: "transparent",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(201,162,39,0.06)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            Détail
          </Link>
        </div>
      </div>
    </div>
  );
}
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, CheckCircle } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import ImageCarousel from "../components/ImageCarousel";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart, setIsOpen } = useCart();

  const product = products.find((p) => p.id === id);

  if (loading) return (
    <div style={{ paddingTop: "6rem", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #C9A227", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
    </div>
  );

  if (!product) return (
    <div style={{ paddingTop: "6rem", textAlign: "center", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
      <p style={{ fontSize: "3rem" }}>🔍</p>
      <p style={{ color: "#888" }}>Produit introuvable.</p>
      <Link to="/catalogue" style={{ color: "#C9A227", fontSize: "0.875rem" }}>← Retour au catalogue</Link>
    </div>
  );

  const handleAdd = () => { addToCart(product); setIsOpen(true); };

  return (
    <div style={{ paddingTop: "5.5rem", maxWidth: "1000px", margin: "0 auto", padding: "5.5rem 1.5rem 5rem" }}>

      <Link to="/catalogue"
        style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#555", fontSize: "0.8rem", marginBottom: "2rem", transition: "color 0.2s" }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#F5F5F5"}
        onMouseLeave={(e) => e.currentTarget.style.color = "#555"}
      >
        <ArrowLeft size={15} /> Retour au catalogue
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}
        className="block md:grid">

        {/* Carrousel — chemins complets passés directement */}
        <ImageCarousel images={product.images} productName={product.name} />

        {/* Infos */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: "0.7rem",
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: "20px",
              marginBottom: "1rem",
              ...(product.condition === "Neuf"
                ? { background: "rgba(201,162,39,0.15)", color: "#C9A227", border: "1px solid rgba(201,162,39,0.3)" }
                : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.12)" })
            }}
          >
            {product.condition}
          </span>

          <h1 className="font-display font-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#F5F5F5", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            {product.name}
          </h1>
          <p style={{ fontSize: "0.75rem", color: "#555", marginBottom: "1.25rem", letterSpacing: "0.05em" }}>
            {product.storage} · {product.color}
          </p>

          <p className="font-display font-semibold" style={{ fontSize: "2.2rem", color: "#C9A227", marginBottom: "1.25rem" }}>
            ${product.price}
          </p>

          <p style={{ color: "rgba(245,245,245,0.5)", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "1.75rem" }}>
            {product.description}
          </p>

          <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
            {["Commande via WhatsApp", "Paiement à la livraison disponible", "Garantie satisfaction"].map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "rgba(245,245,245,0.7)" }}>
                <CheckCircle size={14} style={{ color: "#C9A227", flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #C9A227, #e0b52e)",
              color: "#111",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "0.9rem",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(201,162,39,0.3)",
              letterSpacing: "0.03em",
            }}
          >
            <ShoppingCart size={18} /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
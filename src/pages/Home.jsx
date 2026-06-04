import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { products, loading } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="pt-16">

      {/* ── Hero ── */}
      <section
        className="flex flex-col items-center justify-center text-center relative overflow-hidden"
        style={{ minHeight: "88vh", padding: "4rem 1.5rem" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 68%)",
          }}
        />

        <p
          className="font-body"
          style={{
            color: "#C9A227",
            fontSize: "0.65rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
            opacity: 0.75,
          }}
        >
          Kinshasa · République Démocratique du Congo
        </p>

        <h1
          className="font-display font-bold"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            lineHeight: 1.1,
            color: "#F5F5F5",
            marginBottom: "1.25rem",
            maxWidth: "700px",
          }}
        >
          L'iPhone Premium<br />
          <span
            style={{
              background: "linear-gradient(90deg, #C9A227 0%, #e8c547 50%, #C9A227 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            à votre portée
          </span>
        </h1>

        <p
          className="font-body font-light"
          style={{
            color: "rgba(245,245,245,0.45)",
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
            lineHeight: 1.75,
            maxWidth: "420px",
            marginBottom: "2.5rem",
          }}
        >
          iPhones neufs &amp; reconditionnés. Qualité garantie,
          commande directe via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Link to="/catalogue" className="btn-gold" style={{ fontSize: "0.8rem" }}>
            Voir le catalogue <ArrowRight size={14} />
          </Link>
          <Link to="/apropos" className="btn-outline" style={{ fontSize: "0.8rem" }}>
            À propos
          </Link>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute flex flex-col items-center gap-2"
          style={{ bottom: "2rem", left: "50%", transform: "translateX(-50%)", opacity: 0.2 }}
        >
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, transparent, #C9A227)" }} />
          <span style={{ fontSize: "0.55rem", letterSpacing: "0.4em", color: "#C9A227" }}>SCROLL</span>
        </div>
      </section>

      {/* ── Featured ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* Header */}
        <div className="flex items-end justify-between" style={{ marginBottom: "2.5rem" }}>
          <div>
            <p style={{ color: "#C9A227", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.5rem", opacity: 0.75 }}>
              Sélection
            </p>
            <h2
              className="font-display font-semibold"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#F5F5F5" }}
            >
              Nos coups de cœur
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="hidden md:flex items-center gap-1.5"
            style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#C9A227"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#555"}
          >
            Tout voir <ArrowRight size={12} />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ borderRadius: "18px", height: "320px", background: "linear-gradient(135deg, #1A1A1A, #222)", animation: "pulse 1.5s infinite" }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* Voir plus */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
          <Link to="/catalogue" className="btn-see-more">
            Voir plus de produits <ArrowRight size={12} />
          </Link>
        </div>
      </section>

    </div>
  );
}
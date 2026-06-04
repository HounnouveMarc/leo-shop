import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

export default function Catalogue() {
  const { products, loading } = useProducts();
  const [filter, setFilter] = useState("Tous");

  const filters = ["Tous", "Neuf", "Occasion"];
  const filtered = filter === "Tous" ? products : products.filter((p) => p.condition === filter);

  return (
    <div className="pt-24 min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="text-[#C9A227] text-[10px] tracking-[0.4em] uppercase mb-2 opacity-80">Leo Shop</p>
          <h1 className="font-display font-bold text-[#F5F5F5] mb-6"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
            Catalogue
          </h1>

          {/* Filters */}
          <div className="flex gap-2.5 flex-wrap">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all"
                style={filter === f
                  ? { background: "linear-gradient(135deg, #C9A227, #e0b52e)", color: "#111", boxShadow: "0 4px 15px rgba(201,162,39,0.25)" }
                  : { background: "transparent", color: "#888", border: "1px solid rgba(255,255,255,0.1)" }
                }>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="rounded-[18px] h-72 animate-pulse"
                style={{ background: "linear-gradient(135deg, #1A1A1A, #222)" }} />
            ))}
          </div>
        ) : (
          <>
            <p className="text-[#555] text-xs mb-5 tracking-wider">
              {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
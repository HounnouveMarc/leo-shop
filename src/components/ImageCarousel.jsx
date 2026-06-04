import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// images = tableau de chemins complets ex: ["/products/iphone-16-pro/1.jpeg", ...]
export default function ImageCarousel({ images = [], productName = "" }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  if (images.length === 0) return (
    <div style={{ aspectRatio: "1", borderRadius: "18px", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A227", fontSize: "0.8rem" }}>
      {productName}
    </div>
  );

  return (
    <div style={{ borderRadius: "18px", overflow: "hidden", background: "#1A1A1A", border: "1px solid rgba(201,162,39,0.12)" }}>
      {/* Image principale */}
      <div style={{ position: "relative", aspectRatio: "1 / 1" }}>
        <img
          src={images[current]}
          alt={`${productName} vue ${current + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.target.src = `https://placehold.co/600x600/1A1A1A/C9A227?text=${encodeURIComponent(productName)}`; }}
        />

        {images.length > 1 && (
          <>
            <button onClick={prev}
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(201,162,39,0.25)", color: "#C9A227", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronLeft size={17} />
            </button>
            <button onClick={next}
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(201,162,39,0.25)", color: "#C9A227", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronRight size={17} />
            </button>
          </>
        )}

        {/* Compteur */}
        <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", borderRadius: "20px", padding: "3px 10px", fontSize: "0.65rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: "8px", padding: "10px 12px", background: "#111" }}>
          {images.map((src, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: "56px", height: "56px", borderRadius: "8px", overflow: "hidden", border: i === current ? "2px solid #C9A227" : "2px solid transparent", opacity: i === current ? 1 : 0.4, cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}>
              <img src={src} alt={`miniature ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.src = `https://placehold.co/56x56/1A1A1A/C9A227?text=${i+1}`; }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
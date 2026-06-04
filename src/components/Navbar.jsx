import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/catalogue", label: "Catalogue" },
    { to: "/apropos", label: "À Propos" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(17,17,17,0.94)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1100px",
          padding: "0 1.5rem",
          height: "60px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-semibold"
          style={{
            color: "#C9A227",
            fontSize: "1.1rem",
            letterSpacing: "0.3em",
          }}
        >
          LEO SHOP
        </Link>

        {/* Desktop links — centrés */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                color: pathname === to ? "#C9A227" : "rgba(245,245,245,0.45)",
                transition: "color 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => { if (pathname !== to) e.target.style.color = "rgba(245,245,245,0.85)"; }}
              onMouseLeave={(e) => { if (pathname !== to) e.target.style.color = "rgba(245,245,245,0.45)"; }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle — à droite, loin des boutons flottants */}
        <button
          className="md:hidden flex items-center justify-center rounded-lg"
          style={{
            width: "36px",
            height: "36px",
            background: "rgba(255,255,255,0.05)",
            color: "#F5F5F5",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col"
          style={{
            background: "rgba(17,17,17,0.98)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            padding: "0.5rem 1rem 1.25rem",
          }}
        >
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "0.85rem 1rem",
                borderRadius: "10px",
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                color: pathname === to ? "#C9A227" : "rgba(245,245,245,0.55)",
                background: pathname === to ? "rgba(201,162,39,0.06)" : "transparent",
                transition: "all 0.2s",
                marginBottom: "2px",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
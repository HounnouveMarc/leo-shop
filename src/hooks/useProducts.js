import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        // 1. Lit la liste des dossiers actifs
        const res = await fetch("/products/index.json");
        if (!res.ok) throw new Error("index.json introuvable");
        const ids = await res.json();

        // 2. Pour chaque id, charge son info.json
        const settled = await Promise.allSettled(
          ids.map(async (id) => {
            const r = await fetch(`/products/${id}/info.json`);
            if (!r.ok) throw new Error(`${id}/info.json introuvable`);
            const data = await r.json();
            return {
              ...data,
              id,
              // images résolues en chemins complets
              images: (data.images || ["1.jpeg"]).map(
                (img) => `/products/${id}/${img}`
              ),
            };
          })
        );

        // 3. Garde uniquement les produits chargés avec succès
        const loaded = settled
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value);

        setProducts(loaded);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { products, loading, error };
}
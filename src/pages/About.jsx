import { MapPin, Phone, Mail, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 max-w-3xl mx-auto px-4 pb-20">
      <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase mb-2">Leo Shop</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-12">À Propos</h1>

      {/* Présentation */}
      <div className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#C9A227]/10 mb-8">
        <h2 className="font-display text-2xl font-semibold text-[#C9A227] mb-4">Notre boutique</h2>
        <p className="text-[#888] leading-relaxed">
          Leo Shop est une boutique spécialisée dans la vente d'iPhones neufs et reconditionnés à Kinshasa.
          Notre mission : vous offrir des produits Apple de qualité à des prix accessibles, avec un service
          client direct et de confiance via WhatsApp.
        </p>
        <p className="text-[#888] leading-relaxed mt-4">
          Chaque produit d'occasion est rigoureusement vérifié avant mise en vente. Nous vous garantissons
          transparence sur l'état du produit et réactivité sur vos commandes.
        </p>
      </div>

      {/* Coordonnées */}
      <div className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#C9A227]/10 mb-8">
        <h2 className="font-display text-2xl font-semibold text-[#C9A227] mb-6">Contact & Localisation</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-[#F5F5F5]/80">
            <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={18} className="text-[#C9A227]" />
            </div>
            <div>
              <p className="text-xs text-[#888] uppercase tracking-wider mb-0.5">Adresse</p>
              <p>Kinshasa, République Démocratique du Congo</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#F5F5F5]/80">
            <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-[#C9A227]" />
            </div>
            <div>
              <p className="text-xs text-[#888] uppercase tracking-wider mb-0.5">WhatsApp / Téléphone</p>
              <a href="https://wa.me/243801145005" className="hover:text-[#C9A227] transition-colors">
                +243 80 114 5005
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#F5F5F5]/80">
            <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-[#C9A227]" />
            </div>
            <div>
              <p className="text-xs text-[#888] uppercase tracking-wider mb-0.5">Email</p>
              <a href="mailto:josuemab23@gmail.com" className="hover:text-[#C9A227] transition-colors">
                josuemab23@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Politique de confidentialité */}
      <div className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#C9A227]/10">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={20} className="text-[#C9A227]" />
          <h2 className="font-display text-2xl font-semibold text-[#C9A227]">Politique de confidentialité</h2>
        </div>
        <p className="text-[#888] leading-relaxed text-sm">
          Le site Leo Shop ne collecte aucune donnée personnelle via formulaire.
          Les demandes sont transmises volontairement par le visiteur via WhatsApp ou courrier électronique.
          Aucun cookie de suivi ni outil d'analyse tiers n'est utilisé sur ce site.
        </p>
      </div>
    </div>
  );
}
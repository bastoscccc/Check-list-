import { useState } from "react";

const sections = [
  {
    id: "securite", title: "1. SÉCURITÉ & FUITE", color: "#ef4444", icon: "⚠️",
    items: [
      { id: "fuite_traitee", label: "La fuite est-elle traitée et stoppée ?", type: "bool", required: true },
      { id: "fuite_notes", label: "Si non, noter le statut :", type: "text" },
      { id: "humidite_active", label: "Zone encore humide / active ?", type: "bool" },
      { id: "taux_humidite", label: "Taux d'humidité relevé (%)", type: "number", note: "Mesurer sur la zone la plus touchée. >20% = zone critique" },
      { id: "taux_humidite_localisation", label: "Localisation du relevé (ex: mur nord chambre)", type: "text" },
    ]
  },
  {
    id: "localisation", title: "2. LOCALISATION & CONTEXTE", color: "#f97316", icon: "📍",
    items: [
      { id: "adresse", label: "Adresse complète", type: "text" },
      { id: "secteur", label: "Secteur / zone géographique", type: "text" },
      { id: "type_bien", label: "Type de bien", type: "select", options: ["Appartement", "Maison", "Local commercial", "Autre"] },
      { id: "etage", label: "Étage d'intervention", type: "text" },
      { id: "hauteur_plafond", label: "Hauteur sous plafond (m)", type: "number" },
      { id: "acces_difficile", label: "Accès difficile / contraintes ?", type: "bool" },
      { id: "acces_notes", label: "Préciser si oui :", type: "text" },
      { id: "assurance", label: "Référence dossier assurance", type: "text" },
    ]
  },
  {
    id: "placo", title: "3. PLACO / CLOISONS", color: "#3b82f6", icon: "🧱",
    items: [
      { id: "placo_touche", label: "Placo/cloisons touchés ?", type: "bool" },
      { id: "placo_surface", label: "Surface estimée (m²)", type: "number" },
      { id: "placo_deformation", label: "Déformation visible ?", type: "bool", note: "Si oui → remplacement obligatoire" },
      { id: "placo_tache", label: "Taches sans déformation ?", type: "bool", note: "Si oui → repeinture possible" },
      { id: "placo_decision", label: "Décision", type: "select", options: ["À valider par le gérant", "Repeinture", "Remplacement partiel", "Remplacement total"] },
      { id: "placo_photos", label: "Photos prises ?", type: "bool", required: true },
    ]
  },
  {
    id: "peinture", title: "4. PEINTURE & ENDUIT", color: "#8b5cf6", icon: "🎨",
    items: [
      { id: "peinture_surface", label: "Surface zones endommagées (m²)", type: "number" },
      { id: "uniformisation", label: "Uniformisation nécessaire ?", type: "bool", note: "À valider par le gérant" },
      { id: "uniformisation_surface", label: "Surface uniformisation (m²)", type: "number" },
      { id: "couleur_existante", label: "Couleur existante identifiable ?", type: "bool" },
      { id: "couleur_notes", label: "Référence couleur si connue :", type: "text" },
    ]
  },
  {
    id: "sol", title: "5. SOL", color: "#10b981", icon: "⬜",
    items: [
      { id: "sol_touche", label: "Sol touché ?", type: "bool" },
      { id: "sol_surface", label: "Surface touchée (m²)", type: "number" },
      { id: "sol_type", label: "Type de sol", type: "select", options: ["Carrelage", "Parquet massif", "Parquet stratifié", "Vinyle / PVC", "Moquette", "Béton ciré", "Autre"] },
      { id: "sol_facture", label: "Facture d'origine disponible ?", type: "bool", note: "Demander au client" },
      { id: "sol_reference", label: "Référence / marque si visible :", type: "text" },
      { id: "sol_photos", label: "Photos détaillées prises ?", type: "bool", required: true },
      { id: "sol_decision", label: "Décision", type: "select", options: ["À valider par le gérant", "Remplacement à l'identique", "Remplacement similaire", "Réparation partielle"] },
    ]
  },
  {
    id: "estimation", title: "6. ESTIMATION CHANTIER", color: "#f59e0b", icon: "⏱️",
    items: [
      { id: "nb_pieces", label: "Nombre de pièces concernées", type: "number" },
      { id: "complexite", label: "Complexité estimée", type: "select", options: ["Simple (1 corps d'état)", "Moyen (2 corps d'état)", "Complexe (3+ corps d'état)"] },
      { id: "technicien_type", label: "Type de technicien nécessaire", type: "select", options: ["Peintre standard", "Peintre finitions haut de gamme", "Plaquiste", "Solier", "Multi-compétences"] },
      { id: "jours_estimes", label: "Durée estimée (jours)", type: "number" },
      { id: "notes_chantier", label: "Notes libres pour le gérant :", type: "textarea" },
    ]
  },
  {
    id: "client", title: "7. PROFIL CLIENT & ALERTES", color: "#ec4899", icon: "👤",
    items: [
      { id: "profil_client", label: "Profil client", type: "select", options: ["Standard", "Exigeant", "Facile"], note: "Exigeant = informer le gérant" },
      { id: "hors_sinistre", label: "Le client mentionne des travaux hors sinistre ?", type: "bool", note: 'Ne jamais s\'engager. Dire : "Je note et j\'en informe mon responsable."' },
      { id: "hors_sinistre_detail", label: "Si oui, détailler :", type: "textarea" },
    ]
  },
  {
    id: "actions", title: "8. ACTIONS REQUISES", color: "#14b8a6", icon: "✅",
    items: [
      { id: "action_appel_gerant", label: "Appeler le gérant avant de partir", type: "bool", note: "Obligatoire si : doute, hors sinistre, chantier complexe" },
      { id: "action_expert", label: "Expert assurance à venir ?", type: "bool" },
      { id: "action_expert_date", label: "Date / contact expert :", type: "text" },
      { id: "action_attente_validation", label: "Attendre validation assurance ?", type: "bool" },
      { id: "action_photos_recap", label: "Photos envoyées au gérant ?", type: "bool", required: true },
    ]
  }
];

const GERANT_PHONE = "33612323923";
const GERANT_EMAIL = "contact@sarlparisi.fr";

function buildSummary(values) {
  const date = new Date().toLocaleDateString("fr-FR");
  return [
    `📋 FICHE DÉGÂT DES EAUX — ${date}`,
    `📍 ${values.adresse || "—"}`,
    `🔖 Réf. assurance : ${values.assurance || "—"}`,
    `💧 Humidité : ${values.taux_humidite ? values.taux_humidite + "%" : "—"}${Number(values.taux_humidite) > 20 ? " ⚠️ CRITIQUE" : ""}`,
    `   Localisation : ${values.taux_humidite_localisation || "—"}`,
    `🧱 Placo : ${values.placo_decision || "—"} (${values.placo_surface || "—"} m²)`,
    `🎨 Peinture : ${values.peinture_surface || "—"} m²`,
    `⬜ Sol : ${values.sol_decision || "—"} — ${values.sol_type || "—"}`,
    `⏱️ Complexité : ${values.complexite || "—"}`,
    `👷 Technicien : ${values.technicien_type || "—"}`,
    `📅 Durée : ${values.jours_estimes || "—"} jour(s)`,
    `👤 Profil client : ${values.profil_client || "—"}`,
    `🔧 Hors sinistre : ${values.hors_sinistre === "Oui" ? "🚨 OUI" : "Non"}`,
    values.hors_sinistre_detail ? `   → ${values.hors_sinistre_detail}` : "",
    `📝 Notes : ${values.notes_chantier || "—"}`,
  ].filter(Boolean).join("\n");
}

export default function ChecklistDDO({ onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("securite");
  const [sent, setSent] = useState({ whatsapp: false, email: false });

  const setValue = (id, val) => setValues(prev => ({ ...prev, [id]: val }));
  const hasAlert = values.hors_sinistre === "Oui" || values.profil_client === "Exigeant" || Number(values.taux_humidite) > 20;
  const completion = Math.round(sections.flatMap(s => s.items).filter(i => i.type !== "text" && i.type !== "textarea" && values[i.id]).length / sections.flatMap(s => s.items).filter(i => i.type !== "text" && i.type !== "textarea").length * 100);

  const sendWhatsApp = () => { window.open(`https://wa.me/${GERANT_PHONE}?text=${encodeURIComponent(buildSummary(values))}`, "_blank"); setSent(s => ({ ...s, whatsapp: true })); };
  const sendEmail = () => { window.open(`mailto:${GERANT_EMAIL}?subject=${encodeURIComponent("Fiche DDO — " + (values.adresse || "Chantier"))}&body=${encodeURIComponent(buildSummary(values))}`, "_blank"); setSent(s => ({ ...s, email: true })); };

  const renderInput = (item) => {
    const base = "w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400";
    if (item.type === "bool") return (
      <div className="flex gap-3 mt-1">
        {["Oui", "Non"].map(opt => (
          <button key={opt} onClick={() => setValue(item.id, opt)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${values[item.id] === opt ? opt === "Oui" ? "bg-amber-400 text-gray-900 border-amber-400" : "bg-gray-600 text-white border-gray-500" : "bg-transparent text-gray-400 border-gray-600"}`}>
            {opt}
          </button>
        ))}
      </div>
    );
    if (item.type === "select") return <select className={base + " mt-1"} value={values[item.id] || ""} onChange={e => setValue(item.id, e.target.value)}><option value="">— Sélectionner —</option>{item.options.map(o => <option key={o} value={o}>{o}</option>)}</select>;
    if (item.type === "textarea") return <textarea className={base + " mt-1 h-20 resize-none"} value={values[item.id] || ""} onChange={e => setValue(item.id, e.target.value)} placeholder="Notes..." />;
    return <input type={item.type === "number" ? "number" : "text"} className={base + " mt-1"} value={values[item.id] || ""} onChange={e => setValue(item.id, e.target.value)} />;
  };

  const currentSection = sections.find(s => s.id === activeSection);
  const currentIndex = sections.findIndex(s => s.id === activeSection);

  if (submitted) return (
    <div className="min-h-screen bg-gray-900 p-6" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div className="max-w-lg mx-auto">
        <button onClick={() => { setSubmitted(false); setActiveSection("securite"); setValues({}); setSent({ whatsapp: false, email: false }); onBack(); }} className="text-gray-400 mb-6 flex items-center gap-2">← Accueil</button>
        <div className="text-center mb-6"><div className="text-5xl mb-3">📋</div><h2 className="text-2xl font-bold text-white">Fiche complétée</h2><p className="text-gray-400 text-sm">{completion}% complété</p></div>
        {hasAlert && <div className="bg-pink-900/30 border border-pink-500/50 rounded-xl p-4 mb-4"><p className="text-pink-400 font-semibold mb-1">🚨 Alertes</p>{Number(values.taux_humidite) > 20 && <p className="text-pink-300 text-sm">• Humidité critique : {values.taux_humidite}%</p>}{values.hors_sinistre === "Oui" && <p className="text-pink-300 text-sm">• Travaux hors sinistre demandés</p>}{values.profil_client === "Exigeant" && <p className="text-pink-300 text-sm">• Client exigeant</p>}</div>}
        <div className="bg-gray-800 rounded-xl p-4 mb-5 font-mono text-xs text-gray-300 whitespace-pre-wrap max-h-64 overflow-y-auto border border-gray-700">{buildSummary(values)}</div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button onClick={sendWhatsApp} className={`py-3 rounded-xl font-bold text-sm ${sent.whatsapp ? "bg-green-700" : "bg-green-500 hover:bg-green-400"} text-white`}>{sent.whatsapp ? "✓ Envoyé" : "💬 WhatsApp"}</button>
          <button onClick={sendEmail} className={`py-3 rounded-xl font-bold text-sm ${sent.email ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-400"} text-white`}>{sent.email ? "✓ Envoyé" : "📧 Email"}</button>
        </div>
        <button onClick={() => { setSubmitted(false); setActiveSection("securite"); setValues({}); setSent({ whatsapp: false, email: false }); }} className="w-full bg-amber-400 text-gray-900 font-bold py-3 rounded-xl text-sm">+ Nouveau chantier</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3"><button onClick={onBack} className="text-gray-400 text-xl">←</button><div><h1 className="font-bold text-lg">Dégât des Eaux</h1><p className="text-gray-400 text-xs">Checklist métreur</p></div></div>
            <div className="flex items-center gap-2">{hasAlert && <span className="text-pink-400 text-xs font-bold bg-pink-500/20 border border-pink-500/50 rounded-lg px-2 py-1">🚨 ALERTE</span>}<div className="text-right"><div className="text-amber-400 font-bold text-xl">{completion}%</div><div className="text-gray-500 text-xs">complété</div></div></div>
          </div>
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-amber-400 rounded-full transition-all" style={{width:`${completion}%`}} /></div>
        </div>
      </div>
      <div className="overflow-x-auto border-b border-gray-700 bg-gray-800/50">
        <div className="flex px-4 gap-1 py-2 min-w-max">
          {sections.map(s => <button key={s.id} onClick={() => setActiveSection(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeSection === s.id ? "text-gray-900 font-bold" : "text-gray-400"}`} style={activeSection === s.id ? {backgroundColor: s.color} : {}}>{s.icon} {s.title.split(". ")[1]}</button>)}
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{backgroundColor: currentSection.color+"20", border:`1px solid ${currentSection.color}40`}}>{currentSection.icon}</div><h2 className="text-lg font-bold" style={{color: currentSection.color}}>{currentSection.title}</h2></div>
        {activeSection === "client" && <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-4 mb-5"><p className="text-pink-300 text-sm font-semibold mb-1">📌 Rappel</p><p className="text-pink-200/80 text-xs italic">"Je note votre demande et j'en informe mon responsable qui vous recontactera."</p></div>}
        <div className="space-y-5">
          {currentSection.items.map(item => (
            <div key={item.id} className={`rounded-xl p-4 border ${item.id === "hors_sinistre" && values.hors_sinistre === "Oui" ? "bg-pink-900/20 border-pink-500/50" : "bg-gray-800 border-gray-700"}`}>
              <label className="text-sm text-gray-200 font-medium">{item.label}{item.required && <span className="text-red-400 text-xs ml-1">*</span>}</label>
              {item.note && <p className="text-xs mt-1 mb-2 px-2 py-1 rounded-lg" style={{backgroundColor: currentSection.color+"15", color: currentSection.color}}>💡 {item.note}</p>}
              {renderInput(item)}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-8 gap-3">
          {currentIndex > 0 ? <button onClick={() => setActiveSection(sections[currentIndex-1].id)} className="flex-1 py-3 rounded-xl border border-gray-600 text-gray-300 text-sm">← Précédent</button> : <div className="flex-1" />}
          {currentIndex < sections.length-1 ? <button onClick={() => setActiveSection(sections[currentIndex+1].id)} className="flex-1 py-3 rounded-xl font-bold text-gray-900 text-sm" style={{backgroundColor: currentSection.color}}>Suivant →</button> : <button onClick={() => setSubmitted(true)} className="flex-1 py-3 rounded-xl bg-amber-400 font-bold text-gray-900 text-sm">✓ Finaliser</button>}
        </div>
      </div>
    </div>
  );
}

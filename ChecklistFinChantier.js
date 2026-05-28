import { useState } from "react";

const sections = [
  {
    id: "infos", title: "1. INFOS CHANTIER", color: "#f97316", icon: "📍",
    items: [
      { id: "technicien", label: "Nom du technicien", type: "text", required: true },
      { id: "adresse", label: "Adresse du chantier", type: "text", required: true },
      { id: "date", label: "Date de fin", type: "text", required: true },
      { id: "type_chantier", label: "Type de chantier", type: "select", options: ["Dégât des eaux", "Rénovation peinture", "Pose sol", "Placo / cloisons", "Multi-corps d'état", "Autre"] },
      { id: "ref_dossier", label: "Référence dossier", type: "text" },
    ]
  },
  {
    id: "placo", title: "2. PLACO & ENDUIT", color: "#3b82f6", icon: "🧱",
    items: [
      { id: "placo_bandes", label: "Bandes d'assemblage invisibles ?", type: "bool", required: true, note: "Vérifier sous lumière rasante" },
      { id: "placo_poncage", label: "Zones de ponçage parfaitement lissées ?", type: "bool", required: true },
      { id: "placo_angles", label: "Angles et arêtes nets ?", type: "bool" },
      { id: "placo_trous", label: "Aucun trou non traité ?", type: "bool" },
      { id: "placo_notes", label: "Remarques :", type: "textarea" },
    ]
  },
  {
    id: "peinture", title: "3. PEINTURE", color: "#8b5cf6", icon: "🎨",
    items: [
      { id: "peinture_raccords", label: "Raccords invisibles ?", type: "bool", required: true, note: "Point critique SAV — angles, plinthes, interrupteurs" },
      { id: "peinture_angles", label: "Angles et plinthes proprement coupés ?", type: "bool", required: true },
      { id: "peinture_interrupteurs", label: "Contours interrupteurs / prises propres ?", type: "bool", required: true },
      { id: "peinture_coulures", label: "Aucune coulure visible ?", type: "bool" },
      { id: "peinture_vitres", label: "Vitres sans trace de peinture ?", type: "bool" },
      { id: "peinture_notes", label: "Remarques :", type: "textarea" },
    ]
  },
  {
    id: "sol", title: "4. SOL", color: "#10b981", icon: "⬜",
    items: [
      { id: "sol_joints", label: "Joints propres et uniformes ?", type: "bool" },
      { id: "sol_decoupe", label: "Découpes propres aux plinthes / seuils ?", type: "bool" },
      { id: "sol_bulles", label: "Aucune bulle ou décollage ?", type: "bool" },
      { id: "sol_plinthes", label: "Plinthes bien fixées ?", type: "bool", note: "Appuyer sur chaque plinthe" },
      { id: "sol_notes", label: "Remarques :", type: "textarea" },
    ]
  },
  {
    id: "nettoyage", title: "5. NETTOYAGE", color: "#ef4444", icon: "🧹",
    items: [
      { id: "nettoyage_protections", label: "Protections sol retirées ?", type: "bool", required: true },
      { id: "nettoyage_poussiere", label: "Poussière de placo éliminée ?", type: "bool", required: true, note: "Vérifier coins, plinthes, fenêtres" },
      { id: "nettoyage_sol", label: "Sol balayé et nettoyé ?", type: "bool", required: true },
      { id: "nettoyage_dechets", label: "Déchets chantier évacués ?", type: "bool", required: true },
      { id: "nettoyage_materiel", label: "Tout le matériel récupéré ?", type: "bool", required: true },
      { id: "nettoyage_notes", label: "Remarques :", type: "textarea" },
    ]
  },
  {
    id: "photos", title: "6. PHOTOS DE FIN", color: "#f59e0b", icon: "📸",
    items: [
      { id: "photo_generale", label: "Vue générale de chaque pièce ?", type: "bool", required: true },
      { id: "photo_raccords", label: "Photo des raccords peinture ?", type: "bool", required: true, note: "Obligatoire — protection en cas de litige" },
      { id: "photo_sol", label: "Photo du sol terminé ?", type: "bool" },
      { id: "photo_details", label: "Photos détails (angles, plinthes) ?", type: "bool" },
      { id: "photo_envoyees", label: "Photos envoyées au gérant ?", type: "bool", required: true },
    ]
  },
  {
    id: "validation", title: "7. VALIDATION FINALE", color: "#14b8a6", icon: "✅",
    items: [
      { id: "val_conforme", label: "Chantier conforme au devis ?", type: "bool", required: true },
      { id: "val_reserve", label: "Réserves à signaler ?", type: "bool" },
      { id: "val_reserve_detail", label: "Détailler les réserves :", type: "textarea" },
      { id: "val_appel_gerant", label: "Appel gérant nécessaire ?", type: "bool", note: "Obligatoire si réserves ou doute" },
      { id: "val_notes", label: "Notes pour le gérant :", type: "textarea" },
    ]
  }
];

const GERANT_PHONE = "33612323923";
const GERANT_EMAIL = "contact@sarlparisi.fr";

function buildSummary(values) {
  return [
    `✅ CHECKLIST FIN DE CHANTIER`,
    `📅 ${values.date || new Date().toLocaleDateString("fr-FR")}`,
    `👷 Technicien : ${values.technicien || "—"}`,
    `📍 ${values.adresse || "—"}`,
    `🔖 Réf. : ${values.ref_dossier || "—"}`,
    ``,
    `PLACO : Bandes=${values.placo_bandes||"—"} | Ponçage=${values.placo_poncage||"—"}`,
    `PEINTURE : Raccords=${values.peinture_raccords||"—"} | Angles=${values.peinture_angles||"—"} | Interrupteurs=${values.peinture_interrupteurs||"—"}`,
    `SOL : Joints=${values.sol_joints||"—"} | Plinthes=${values.sol_plinthes||"—"}`,
    `NETTOYAGE : Protections=${values.nettoyage_protections||"—"} | Poussière=${values.nettoyage_poussiere||"—"} | Déchets=${values.nettoyage_dechets||"—"}`,
    `PHOTOS : Générale=${values.photo_generale||"—"} | Envoyées=${values.photo_envoyees||"—"}`,
    `VALIDATION : Conforme=${values.val_conforme||"—"} | Réserves=${values.val_reserve||"—"}`,
    values.val_reserve_detail ? `Réserves : ${values.val_reserve_detail}` : "",
    values.val_notes ? `Notes : ${values.val_notes}` : "",
  ].filter(Boolean).join("\n");
}

export default function ChecklistFinChantier({ onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("infos");
  const [sent, setSent] = useState({ whatsapp: false, email: false });

  const setValue = (id, val) => setValues(prev => ({ ...prev, [id]: val }));
  const hasReserve = values.val_reserve === "Oui";
  const hasNonConforme = sections.slice(1).some(s => s.items.filter(i => i.type === "bool" && i.required).some(i => values[i.id] === "Non"));
  const hasAlert = hasReserve || hasNonConforme;
  const completion = Math.round(sections.flatMap(s => s.items).filter(i => i.type !== "text" && i.type !== "textarea" && values[i.id]).length / sections.flatMap(s => s.items).filter(i => i.type !== "text" && i.type !== "textarea").length * 100);

  const sendWhatsApp = () => { window.open(`https://wa.me/${GERANT_PHONE}?text=${encodeURIComponent(buildSummary(values))}`, "_blank"); setSent(s => ({ ...s, whatsapp: true })); };
  const sendEmail = () => { window.open(`mailto:${GERANT_EMAIL}?subject=${encodeURIComponent("Fin chantier — " + (values.adresse || ""))}&body=${encodeURIComponent(buildSummary(values))}`, "_blank"); setSent(s => ({ ...s, email: true })); };
  const printPDF = () => { const w = window.open("", "_blank"); w.document.write(`<html><head><title>Fin chantier</title><style>body{font-family:monospace;font-size:13px;padding:30px;line-height:1.6}pre{white-space:pre-wrap}</style></head><body><h1>SARL PARISI — Fin de Chantier</h1><pre>${buildSummary(values)}</pre></body></html>`); w.document.close(); w.print(); };

  const renderInput = (item) => {
    const base = "w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400";
    if (item.type === "bool") return (
      <div className="flex gap-3 mt-1">
        {["Oui", "Non"].map(opt => {
          const sel = values[item.id] === opt;
          const bad = opt === "Non" && sel && item.required;
          return <button key={opt} onClick={() => setValue(item.id, opt)} className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${sel ? bad ? "bg-red-500 text-white border-red-500" : opt === "Oui" ? "bg-green-500 text-white border-green-500" : "bg-gray-600 text-white border-gray-500" : "bg-transparent text-gray-400 border-gray-600"}`}>{opt}</button>;
        })}
      </div>
    );
    if (item.type === "select") return <select className={base + " mt-1"} value={values[item.id] || ""} onChange={e => setValue(item.id, e.target.value)}><option value="">— Sélectionner —</option>{item.options.map(o => <option key={o} value={o}>{o}</option>)}</select>;
    if (item.type === "textarea") return <textarea className={base + " mt-1 h-20 resize-none"} value={values[item.id] || ""} onChange={e => setValue(item.id, e.target.value)} placeholder="Notes..." />;
    return <input type="text" className={base + " mt-1"} value={values[item.id] || ""} onChange={e => setValue(item.id, e.target.value)} />;
  };

  const currentSection = sections.find(s => s.id === activeSection);
  const currentIndex = sections.findIndex(s => s.id === activeSection);

  if (submitted) return (
    <div className="min-h-screen bg-gray-900 p-6" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6"><div className="text-5xl mb-3">{hasAlert ? "⚠️" : "✅"}</div><h2 className="text-2xl font-bold text-white">{hasAlert ? "Chantier avec réserves" : "Chantier validé"}</h2><p className="text-gray-400 text-sm">{completion}% complété</p></div>
        {hasAlert && <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4 mb-4"><p className="text-red-400 font-semibold mb-1">🚨 Points non conformes</p>{hasNonConforme && <p className="text-red-300 text-sm">• Points obligatoires en échec</p>}{hasReserve && <p className="text-red-300 text-sm">• Réserves signalées</p>}</div>}
        <div className="bg-gray-800 rounded-xl p-4 mb-5 font-mono text-xs text-gray-300 whitespace-pre-wrap max-h-64 overflow-y-auto border border-gray-700">{buildSummary(values)}</div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button onClick={sendWhatsApp} className={`py-3 rounded-xl font-bold text-sm ${sent.whatsapp ? "bg-green-700" : "bg-green-500 hover:bg-green-400"} text-white`}>{sent.whatsapp ? "✓ Envoyé" : "💬 WhatsApp"}</button>
          <button onClick={sendEmail} className={`py-3 rounded-xl font-bold text-sm ${sent.email ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-400"} text-white`}>{sent.email ? "✓ Envoyé" : "📧 Email"}</button>
        </div>
        <button onClick={printPDF} className="w-full py-3 rounded-xl bg-gray-600 hover:bg-gray-500 text-white font-bold text-sm mb-3">🖨️ Imprimer / PDF</button>
        <button onClick={() => { setSubmitted(false); setActiveSection("infos"); setValues({}); setSent({ whatsapp: false, email: false }); }} className="w-full bg-amber-400 text-gray-900 font-bold py-3 rounded-xl text-sm">+ Nouveau chantier</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3"><button onClick={onBack} className="text-gray-400 text-xl">←</button><div><h1 className="font-bold text-lg">Fin de Chantier</h1><p className="text-gray-400 text-xs">Autocontrôle technicien</p></div></div>
            <div className="flex items-center gap-2">{hasAlert && <span className="text-red-400 text-xs font-bold bg-red-500/20 border border-red-500/50 rounded-lg px-2 py-1">⚠️ ALERTE</span>}<div className="text-right"><div className="text-amber-400 font-bold text-xl">{completion}%</div><div className="text-gray-500 text-xs">complété</div></div></div>
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
        <div className="space-y-5">
          {currentSection.items.map(item => (
            <div key={item.id} className={`rounded-xl p-4 border ${item.type === "bool" && item.required && values[item.id] === "Non" ? "bg-red-900/20 border-red-500/50" : "bg-gray-800 border-gray-700"}`}>
              <label className="text-sm text-gray-200 font-medium">{item.label}{item.required && <span className="text-red-400 text-xs ml-1">*</span>}</label>
              {item.note && <p className="text-xs mt-1 mb-2 px-2 py-1 rounded-lg" style={{backgroundColor: currentSection.color+"15", color: currentSection.color}}>💡 {item.note}</p>}
              {renderInput(item)}
              {item.type === "bool" && item.required && values[item.id] === "Non" && <p className="text-red-400 text-xs mt-2 font-medium">⚠️ Corriger avant de partir ou appeler le gérant</p>}
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

import { useState } from "react";
import ChecklistDDO from "./ChecklistDDO";
import ChecklistFinChantier from "./ChecklistFinChantier";

export default function App() {
  const [page, setPage] = useState("home");
  if (page === "ddo") return <ChecklistDDO onBack={() => setPage("home")} />;
  if (page === "fin") return <ChecklistFinChantier onBack={() => setPage("home")} />;
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div className="mb-10 text-center">
        <div className="text-5xl mb-4">🏗️</div>
        <h1 className="text-3xl font-bold text-white">SARL Parisi</h1>
        <p className="text-gray-400 mt-2">Outils terrain</p>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <button onClick={() => setPage("ddo")}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 px-6 rounded-2xl text-lg transition-all flex items-center gap-4">
          <span className="text-3xl">💧</span>
          <div className="text-left">
            <div>Dégât des Eaux</div>
            <div className="text-blue-200 text-sm font-normal">Checklist métreur</div>
          </div>
        </button>
        <button onClick={() => setPage("fin")}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-5 px-6 rounded-2xl text-lg transition-all flex items-center gap-4">
          <span className="text-3xl">✅</span>
          <div className="text-left">
            <div>Fin de Chantier</div>
            <div className="text-green-200 text-sm font-normal">Autocontrôle technicien</div>
          </div>
        </button>
      </div>
    </div>
  );
}

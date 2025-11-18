import React from "react";
import { useTarefas } from "./TarefaProvider";

export default React.memo(function TarefaFiltros() {
  const { filtro, setFiltro, busca, setBusca } = useTarefas();

  return (
    <div className="tarefa-filtros">
      <div className="filtro-buttons">
        <button
          onClick={() => setFiltro("todas")}
          disabled={filtro === "todas"}
        >
          Todas
        </button>

        <button
          onClick={() => setFiltro("concluida")}
          disabled={filtro === "concluida"}
        >
          Concluídas
        </button>

        <button
          onClick={() => setFiltro("pendente")}
          disabled={filtro === "pendente"}
        >
          Pendentes
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar tarefa..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
        aria-label="Buscar tarefa"
      />
    </div>
  );
});

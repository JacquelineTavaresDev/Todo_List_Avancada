import React from "react";
import { useTarefas } from "./TarefaProvider";
import TarefaItem from "./TarefaItem";

export default function TarefaList() {
  const { tarefas, totalPendentes, totalConcluidas } = useTarefas();

  return (
    <div className="tarefa-list-container">
      <p>Total pendentes: {totalPendentes} | Total concluídas: {totalConcluidas}</p>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="tarefa-list">
          {tarefas.map(t => <TarefaItem key={t.id} tarefa={t} />)}
        </ul>
      )}
    </div>
  );
}

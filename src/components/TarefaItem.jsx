import React from "react";
import { useTarefas } from "./TarefaProvider";

function TarefaItem({ tarefa }) {
  const { toggleConcluida, removerTarefa } = useTarefas();

  return (
    <li className={tarefa.concluida ? "concluida" : ""}>
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => toggleConcluida(tarefa.id)}
      />
      <strong>{tarefa.titulo}</strong>: {tarefa.descricao}
      <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
    </li>
  );
}

export default React.memo(TarefaItem);

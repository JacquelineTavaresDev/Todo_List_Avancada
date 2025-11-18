import React from "react";
import { useTarefas } from "./TarefaProvider";
import { useInput } from "../hooks/useInput";

export default function TarefaForm() {
  const { adicionarTarefa } = useTarefas();
  const titulo = useInput("");
  const descricao = useInput("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!titulo.valor.trim()) return;

    adicionarTarefa(titulo.valor, descricao.valor || "");

    titulo.reset();
    descricao.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="tarefa-form">
      <input
        id="titulo"
        name="titulo"
        value={titulo.valor}
        onChange={titulo.onChange}
        placeholder="Título da tarefa"
        aria-label="Título da tarefa"
      />
      <input
        id="descricao"
        name="descricao"
        value={descricao.valor}
        onChange={descricao.onChange}
        placeholder="Descrição"
        aria-label="Descrição da tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

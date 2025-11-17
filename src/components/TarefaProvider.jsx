import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TarefaContext = createContext();

export function useTarefas() {
  const ctx = useContext(TarefaContext);
  if (!ctx) throw new Error("useTarefas deve ser usado dentro do TarefaProvider");
  return ctx;
}

export function TarefaProvider({ children }) {
  const [tarefas, setTarefas] = useLocalStorage("tarefas", []);
  const [filtro, setFiltro] = useLocalStorage("filtro", "todas");
  const [busca, setBusca] = useLocalStorage("busca", "");

  const adicionarTarefa = useCallback(
    (titulo, descricao) => {
      const novaTarefa = {
        id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
        titulo,
        descricao,
        concluida: false,
      };
      setTarefas(prev => [...prev, novaTarefa]);
    },
    [tarefas, setTarefas]
  );

  const removerTarefa = useCallback((id) => {
    setTarefas(prev => prev.filter(t => t.id !== id));
  }, [setTarefas]);

  const toggleConcluida = useCallback((id) => {
    setTarefas(prev =>
      prev.map(t => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  }, [setTarefas]);

  const tarefasFiltradas = useMemo(() => {
    return tarefas
      .filter(t =>
        filtro === "concluida"
          ? t.concluida
          : filtro === "pendente"
          ? !t.concluida
          : true
      )
      .filter(t => t.titulo.toLowerCase().includes(busca.toLowerCase()))
      .sort((a, b) => a.id - b.id);
  }, [tarefas, filtro, busca]);

  const totalPendentes = useMemo(
    () => tarefas.filter(t => !t.concluida).length,
    [tarefas]
  );

  const totalConcluidas = useMemo(
    () => tarefas.filter(t => t.concluida).length,
    [tarefas]
  );

  return (
    <TarefaContext.Provider
      value={{
        tarefas: tarefasFiltradas,
        adicionarTarefa,
        removerTarefa,
        toggleConcluida,
        filtro,
        setFiltro,
        busca,
        setBusca,
        totalPendentes,
        totalConcluidas,
      }}
    >
      {children}
    </TarefaContext.Provider>
  );
}
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

  const tarefasNormalizadas = useMemo(() => {
    return (Array.isArray(tarefas) ? tarefas : []).map(t => ({
      id: typeof t.id === "number" ? t.id : 1,
      titulo: t.titulo || "",
      descricao: t.descricao || "",
      concluida: Boolean(t.concluida),
    }));
  }, [tarefas]);

  const adicionarTarefa = useCallback(
    (titulo, descricao) => {
      const novaTarefa = {
        id:
          tarefasNormalizadas.length > 0
            ? Math.max(...tarefasNormalizadas.map(t => t.id)) + 1
            : 1,
        titulo: titulo || "",
        descricao: descricao || "",
        concluida: false,
      };

      setTarefas(prev => [...prev, novaTarefa]);
    },
    [tarefasNormalizadas, setTarefas]
  );

  const removerTarefa = useCallback(
    id => {
      setTarefas(prev => prev.filter(t => t.id !== id));
    },
    [setTarefas]
  );

  const toggleConcluida = useCallback(
    id => {
      setTarefas(prev =>
        prev.map(t =>
          t.id === id ? { ...t, concluida: !t.concluida } : t
        )
      );
    },
    [setTarefas]
  );

  const tarefasFiltradas = useMemo(() => {
    const buscaLower = (busca || "").toLowerCase();

    return tarefasNormalizadas
      .filter(t =>
        filtro === "concluida"
          ? t.concluida
          : filtro === "pendente"
          ? !t.concluida
          : true
      )
      .filter(t =>
        (t.titulo || "").toLowerCase().includes(buscaLower)
      )
      .sort((a, b) => a.id - b.id);
  }, [tarefasNormalizadas, filtro, busca]);

  const totalPendentes = useMemo(
    () => tarefasNormalizadas.filter(t => !t.concluida).length,
    [tarefasNormalizadas]
  );

  const totalConcluidas = useMemo(
    () => tarefasNormalizadas.filter(t => t.concluida).length,
    [tarefasNormalizadas]
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
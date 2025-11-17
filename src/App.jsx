import React from "react";
import { TarefaProvider } from "./components/TarefaProvider";
import TarefaForm from "./components/TarefaForm";
import TarefaFiltros from "./components/TarefaFiltros";
import TarefaList from "./components/TarefaList";
import "./App.css";

function App() {
  return (
    <TarefaProvider>
      <div className="app">
        <h1>To Do List Avançada</h1>
        <TarefaForm />
        <TarefaFiltros />
        <TarefaList />
      </div>
    </TarefaProvider>
  );
}

export default App;

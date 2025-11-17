import { useState, useEffect } from 'react'


export function useLocalStorage(chave, valorInicial){
  const [estado, setEstado] = useState(() => {
    const stored = localStorage.getItem(chave);
    return stored ? JSON.parse(stored) : valorInicial;
  });

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(estado));
  }, [chave, estado]);

  return [estado, setEstado]
}

"use client";

import { Children, createContext, useState } from "react";
import { Types } from "./ts/types";
export const GlobalContext = createContext<Types>({});
type N = { id: number, tarefa: string, completed: boolean };
// Correção da definição da propriedade no GlobalContextProvider
export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tarefas, setTarefas] = useState<N[]>([]);
  const [anotarTarefas, setAnotarTarefas] = useState('');
  
  const [IsThemeDark, setIsThemeDark] = useState(true);
  const [TarefaConcluida, setTarefaConcluida] = useState(false);
  const [ArmazenarTarefa, setArmazenarTarefa] = useState();
  const [anotarTarefasEditada, setAnotarTarefasEditada] = useState(''); 
  
  const excluirTarefas = (id: number) => {
    setTarefas(tarefas.filter((val) => val.id != id));
  }
  
  const MacarTarefaComoConcluida = () => {
    setTarefaConcluida(!TarefaConcluida);
  }

  
   const atualizarTarefa = (ArmazenarTarefa : number) => {
     setTarefas(tarefas.map(
     (val : N) => val.id === ArmazenarTarefa? 

     { ...val, tarefa: anotarTarefasEditada } 
     :
    val
      )
     )
   }


  return (
    <GlobalContext.Provider value={{
      tarefas,
      IsThemeDark,
      anotarTarefas,
      TarefaConcluida,
      anotarTarefasEditada,
      ArmazenarTarefa,
      setAnotarTarefas,
      setTarefas,
      setIsThemeDark,
      setTarefaConcluida,
      setAnotarTarefasEditada,
      setArmazenarTarefa,


      //? Funções
      excluirTarefas,
      MacarTarefaComoConcluida,
      atualizarTarefa,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};


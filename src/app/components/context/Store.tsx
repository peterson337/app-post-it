"use client";

import { Children, createContext, useState } from "react";
import { Types } from "./ts/types";
export const GlobalContext = createContext<Types>({});
type N = { id: number, tarefa: string, completed: boolean };
// Correção da definição da propriedade no GlobalContextProvider
export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tarefas, setTarefas] = useState<N[]>([]);
  const [tarefasFavoritas, setTarefasFavoritas] = useState<N[]>([]);
  
  const [IsThemeDark, setIsThemeDark] = useState(true);
  const [TarefaConcluida, setTarefaConcluida] = useState(false);
  const [ArmazenarTarefa, setArmazenarTarefa] = useState();
  const [anotarTarefasEditada, setAnotarTarefasEditada] = useState(''); 
  const [Filtro, setFiltro] = useState<number>(0);

  const handleChandeTab = (event: React.SyntheticEvent, newValue: number) => {
    setFiltro(newValue)
  }

  const excluirTarefas = (id: number) => {
    const deletarTarefa = tarefas.filter((val) => val.id != id)
    setTarefas(deletarTarefa);
  }
  const excluirTarefasFavorita = (id: number) => {
    const deletarTarefa = tarefasFavoritas.filter((val) => val.id != id)
    setTarefasFavoritas(deletarTarefa);
  }

  const MacarTarefavoritaComoConcluida = (id : number) => {

    const atualizarTarefaFavorita = tarefasFavoritas.map((val) => {
      if (val.id === id) {
       return { ...val, completed: !val.completed }
      }   
      return val;
    })
    setTarefasFavoritas(atualizarTarefaFavorita); 
}

    console.log(tarefas,'tarefas');
    console.log(tarefasFavoritas,'tarefasFavoritas');
  const MacarTarefaComoConcluida = (id : number) => {

        const atualizarTarefa = tarefas.map((val) => {
          if (val.id === id) {
           return { ...val, completed: !val.completed }
          }   
          return val;
        })
        setTarefas(atualizarTarefa); 
  }

  const favoritarTarefa = (id : number) => {
          excluirTarefas(id);

          const favoritarTarefas = {
            id: id,
            tarefa: tarefas.filter((val) => val.id === id)[0].tarefa,
            completed: tarefas.filter((val) => val.id === id)[0].completed,

          }

          setTarefasFavoritas([...tarefasFavoritas, favoritarTarefas]);
  }

  const desfavoritarTarefa = (id : number) => {
    excluirTarefasFavorita(id);

          const desfavoritarTarefas = {
            id: id,
            tarefa: tarefasFavoritas.filter((val) => val.id === id)[0].tarefa,
            completed: tarefasFavoritas.filter((val) => val.id === id)[0].completed,

          }

          setTarefas([...tarefas, desfavoritarTarefas]);
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
   const atualizarTarefaFavorita = (ArmazenarTarefa : number) => {
    setTarefasFavoritas(tarefasFavoritas.map(
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
      TarefaConcluida,
      anotarTarefasEditada,
      ArmazenarTarefa,
      tarefasFavoritas,
      Filtro,
      setTarefasFavoritas,
      setTarefas,
      setIsThemeDark,
      setTarefaConcluida,
      setAnotarTarefasEditada,
      setArmazenarTarefa,


      //? Funções
      excluirTarefas,
      MacarTarefaComoConcluida,
      setFiltro,
      atualizarTarefa,
      favoritarTarefa,
      MacarTarefavoritaComoConcluida,
      atualizarTarefaFavorita,
      excluirTarefasFavorita,
      desfavoritarTarefa,
      handleChandeTab,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};


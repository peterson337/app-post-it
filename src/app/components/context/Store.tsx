"use client";

import { Children, createContext, useState, useEffect } from "react";
import { Types, Tarefas } from "./ts/types";

export const GlobalContext = createContext<Types>({
  IsModalEditarTarefa: false,
  setTarefas: () => {},
  setTarefasFavoritas: () => {},
  setIsModalEditarTarefa: () => {},
  tarefas: [],
  tarefasFavoritas: [],
  anotarTarefas: '',
  setAnotarTarefas: () => {},
  excluirTarefas: () => {},
  TarefaConcluida: false,
  MacarTarefaComoConcluida: () => {},
  anotarTarefasEditada: '',
  setAnotarTarefasEditada: () => {},
  setArmazenarTarefa: () => {},
  Filtro: 0,
  setFiltro: () => {},
  favoritarTarefa: () => {},
  handleChandeTab: () => {},
  ArmazenarTarefa: 0,

  isOpenModal: false, 
  setIsOpenModal: () => {},



  //? Funções

  
  MacarTarefavoritaComoConcluida: () => {},
  atualizarTarefaFavorita: () => {},
  excluirTarefasFavorita: (id: number | null) => {}, // Adicione a definição correta aqui
  desfavoritarTarefa: () => {},
})

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [tarefas, setTarefas] = useState<Tarefas[]>([]);
  const [tarefasFavoritas, setTarefasFavoritas] = useState<Tarefas[]>([]);

  const [ArmazenarTarefa, setArmazenarTarefa] = useState<number>(0);
  const [anotarTarefasEditada, setAnotarTarefasEditada] = useState(''); 
  const [Filtro, setFiltro] = useState<number>(0);

  const [isOpenModal, setIsOpenModal] = useState(false);


  
  useEffect(() => {
    const data = localStorage.getItem('tarefas');
    const dataFavoritas = localStorage.getItem('tarefasFavoritas');    
    const IsThemeDarkLocalStorage = localStorage.getItem('IsThemeDark');
    
    if (data) {
      setTarefas(JSON.parse(data));
    }
     if (dataFavoritas){
      setTarefasFavoritas(JSON.parse(dataFavoritas));

    }
    
  }, []);
  
  const handleChandeTab = (event: React.SyntheticEvent, newValue: number) => {
    setFiltro(newValue)
  }

  const excluirTarefas = (id: number | null) => {
    if (id) {
      const deletarTarefa = tarefas.filter((val) => val.id != id)
      setTarefas(deletarTarefa);
      localStorage.setItem('tarefas', JSON.stringify(deletarTarefa));
      
    }else if(null){
      
      const deletarTarefa = tarefas.filter((val) => val.completed === false)
      setTarefas(deletarTarefa);
      localStorage.setItem('tarefas', JSON.stringify(deletarTarefa));
    }
    
  }
  const excluirTarefasFavorita = (id: number) => {
      const deletarTarefa = tarefasFavoritas.filter((val) => val.id != id)
      setTarefasFavoritas(deletarTarefa);
      localStorage.setItem('tarefasFavoritas', JSON.stringify(deletarTarefa));
  }

  const MacarTarefavoritaComoConcluida = (id : number) => {

    const atualizarTarefaFavorita = tarefasFavoritas.map((val) => {
      if (val.id === id) {
       return { ...val, completed: !val.completed }
      }   
      return val;
    })
    setTarefasFavoritas(atualizarTarefaFavorita); 
    localStorage.setItem('tarefasFavoritas', JSON.stringify(atualizarTarefaFavorita));


}

const MacarTarefaComoConcluida = (id: number) => {
  const atualizarTarefa = tarefas.map((val) => {
      if (val.id === id) {
          return { ...val, completed: !val.completed };
      }   
      return val;
  });

  setTarefas(atualizarTarefa); 
  localStorage.setItem('tarefas', JSON.stringify(atualizarTarefa));
}


  const favoritarTarefa = (id : number) => {
          excluirTarefas(id);

          const favoritarTarefas = {
            id: id,
            tarefa: tarefas.filter((val) => val.id === id)[0].tarefa,
            completed: tarefas.filter((val) => val.id === id)[0].completed,

          }

          setTarefasFavoritas([...tarefasFavoritas, favoritarTarefas] );
        
           localStorage.setItem('tarefasFavoritas', JSON.stringify([...tarefasFavoritas, favoritarTarefas]));

  }

  const desfavoritarTarefa = (id : number) => {
    excluirTarefasFavorita(id);

          const desfavoritarTarefas = {
            id: id,
            tarefa: tarefasFavoritas.filter((val) => val.id === id)[0].tarefa,
            completed: tarefasFavoritas.filter((val) => val.id === id)[0].completed,

          }

          setTarefas([...tarefas, desfavoritarTarefas] );

        localStorage.setItem('tarefas', JSON.stringify([...tarefas, desfavoritarTarefas]));

  }

   const atualizarTarefaFavorita = (ArmazenarTarefa : number) => {
    const atualizarTarefaFavorita = tarefasFavoritas.map((val : Tarefas) => val.id === ArmazenarTarefa? 
    { ...val, tarefa: anotarTarefasEditada } : val)

    setTarefasFavoritas(atualizarTarefaFavorita);

     localStorage.setItem('tarefasFavoritas', JSON.stringify(atualizarTarefaFavorita));

   }


  return (
    <GlobalContext.Provider value={{
      tarefas,
      anotarTarefasEditada,
      ArmazenarTarefa,
      tarefasFavoritas,
      Filtro,
      setFiltro,

      isOpenModal, 
      setIsOpenModal,

      setTarefasFavoritas,
      setTarefas,
      setAnotarTarefasEditada,
      setArmazenarTarefa,

      //? Funções
      excluirTarefas,
      MacarTarefaComoConcluida,
      //atualizarTarefa,
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


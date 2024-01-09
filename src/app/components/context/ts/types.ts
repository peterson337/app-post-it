import { Dispatch, SetStateAction } from 'react';

export type Types = {
    IsModalEditarTarefa?: boolean
    setTarefas: (() => void) | ((atualizarTarefa: Tarefas[]) => void);
    setTarefasFavoritas: Dispatch<SetStateAction<Tarefas[]>>;
    setIsModalEditarTarefa?: (value: boolean) => void;
    tarefas: Tarefas[];
    tarefasFavoritas: Tarefas[];
    anotarTarefas?: string;
    setAnotarTarefas?: (value: string) => void;
    excluirTarefas: (id: number) => void;
    TarefaConcluida?: boolean
    MacarTarefaComoConcluida: (value: number) => void;
    anotarTarefasEditada?: string;
    setAnotarTarefasEditada?: (value: string) => void;
    setArmazenarTarefa: (id: number) => void;
    Filtro?: number;
    setFiltro?: (value: number) => void;
    favoritarTarefa: (id : number) => void;
    handleChandeTab?:  (event: React.SyntheticEvent, newValue: number) => void;
    ArmazenarTarefa: number;
    MacarTarefavoritaComoConcluida: (id: number) => void;
    atualizarTarefaFavorita?: (id: number) => void;
    excluirTarefasFavorita:(id: number) => void;
    desfavoritarTarefa: (id: number) => void;
    isOpenModal: boolean, 
    setIsOpenModal: (value: boolean) => void,

}

export type Tarefas = {
    id: number;
    tarefa: string;
     completed: boolean;
}

export type TarefasDeCompra = {
    id: number;
    tarefa: string;
    completed: boolean;
    preco: number;
    precoTotal: number;

}


export type ListaDeCompra = {
    ListaDeCompra: Tarefas[], 
    setListaDeCompra: Dispatch<SetStateAction<Tarefas[]>>,
    adiconarTarefaDeCompra: string,
    setAdiconarTarefaDeCompra: (value: string) => void,
    precoTotal: number;

}

export interface State {
    adiconarTarefaDeCompra: string;
    precoDoProduto: number;
    precoTotal: number;
    ListaDeCompra: TarefasDeCompra[];
    isOpenModal: boolean;
  }
  
  export interface Action {
    type: string;
    payload?: any; // Pode ser ajustado conforme necessário
  }

  export type Teste = {
         type: string; 
         payload: number; 
  }
  
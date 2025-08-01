import { Dispatch, SetStateAction } from "react";

export type Types = {
  IsModalEditarTarefa?: boolean;
  setTarefas: (() => void) | ((atualizarTarefa: Tarefas[]) => void);
  setTarefasFavoritas: Dispatch<SetStateAction<Tarefas[]>>;
  setIsModalEditarTarefa?: (value: boolean) => void;
  tarefas: Tarefas[];
  tarefasFavoritas: Tarefas[];
  anotarTarefas?: string;
  setAnotarTarefas?: (value: string) => void;
  excluirTarefas: (id: number) => void;
  TarefaConcluida?: boolean;
  MacarTarefaComoConcluida: (value: number) => void;
  anotarTarefasEditada?: string;
  setAnotarTarefasEditada?: (value: string) => void;
  setArmazenarTarefa: (id: number) => void;
  Filtro?: number;
  setFiltro: (value: number) => void;
  favoritarTarefa: (id: number) => void;
  handleChandeTab?: (event: React.SyntheticEvent, newValue: number) => void;
  ArmazenarTarefa: number;
  MacarTarefavoritaComoConcluida: (id: number) => void;
  atualizarTarefaFavorita?: (id: number) => void;
  excluirTarefasFavorita: (id: number) => void;
  desfavoritarTarefa: (id: number) => void;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  isSideBar: boolean;
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
  modoTarefas: ModoTarefa[];
  setModoTarefas: Dispatch<SetStateAction<ModoTarefa[]>>;
  isOpenModalTarefaDinamica: boolean;
  setIsOpenModalTarefaDinamica: Dispatch<SetStateAction<boolean>>;
  useId: null | string | undefined;
  setUserId: Dispatch<SetStateAction<null | string | undefined>>;
};

export type ModoTarefa = {
  id: number;
  nomeGrupoTarefa: string;
  tasks: Tasks[];
};

export type Tasks = {
  id: number;
  nomeTarefa: string;
  completed: boolean;
  color: string;
  colorText: boolean;
};

export type Tarefas = {
  id: number;
  tarefa: string;
  completed: boolean;
};

export type TarefasDeCompra = {
  id: number;
  tarefa: string;
  completed: boolean;
  preco: number;
  precoTotal: number;
};

export interface State {
  adiconarTarefaDeCompra: string;
  isOpenModal: boolean;
}

export interface Action {
  type: string;
  payload?: any; // Pode ser ajustado conforme necessário
}

export type Teste = {
  type: string;
  payload: number;
};

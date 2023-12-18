import { Dispatch, SetStateAction } from 'react';

export type Types = {
    IsThemeDark?: boolean;
    IsModalEditarTarefa?: boolean
    setTarefas: (() => void) | ((atualizarTarefa: Tarefas[]) => void);
    setTarefasFavoritas?: Dispatch<SetStateAction<Tarefas[]>>;
    setIsThemeDark: (value: boolean) => void;
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
}

export type Tarefas = {
    id: number;
    tarefa: string;
     completed: boolean;
}


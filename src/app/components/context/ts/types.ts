export type Types = {
    IsThemeDark: boolean;
    IsModalEditarTarefa: boolean
    setTarefas: () => void;
    setTarefasFavoritas: () => void;
    setIsThemeDark: (value: boolean) => void;
    setIsModalEditarTarefa: (value: boolean) => void;
    tarefas: Tarefas[];
    tarefasFavoritas: Tarefas[];
    anotarTarefas: string;
    setAnotarTarefas: (value: string) => void;
    excluirTarefas (id: number): void;
    TarefaConcluida: boolean
    MacarTarefaComoConcluida: (value: boolean) => void;
    anotarTarefasEditada: string;
    setAnotarTarefasEditada: (value: string) => void;
}

type Tarefas = {
    id: number;
    tarefa: string;
     completed: boolean;
}


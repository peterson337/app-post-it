export type Types = {
    IsThemeDark: boolean;
    IsModalEditarTarefa: boolean
    setTarefas: (tarefas: string) => void;
    setIsThemeDark: (value: boolean) => void;
    setIsModalEditarTarefa: (value: boolean) => void;
    tarefas: Tarefas[];
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
    // completed: boolean;
}


export type  Props = {
    openModalCreateTarefas:(value: boolean) => void;
    closeModalCreateTarefas: (value: boolean) => void;

    openModalEditarTarefas: (value: boolean) => void;
    closeModalEditarTarefas: (value: boolean) => void;

}

export type T = {
    e: {
        value: {
            target: {
                value: string
            }
        }
    }
}
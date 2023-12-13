export type  Props = {
    openModalCreateTarefas?:(value: boolean) => void;
    closeModalCreateTarefas?: () => void | ((value: boolean) => void);

    openModalEditarTarefas?: (value: number) => void;
    closeModalEditarTarefas?: (value: boolean) => void;

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
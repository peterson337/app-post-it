import { Dispatch, SetStateAction } from "react";

export type Props = {
    setISOpenModalCreateTareas: Dispatch<SetStateAction<boolean>> | (() => void);    
};

export type TypesEditarTarefa = {
  openModalEditarTarefas: (value: number) => void;
  closeModalEditarTarefas: () => void;
};


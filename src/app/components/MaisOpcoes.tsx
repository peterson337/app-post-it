import React from "react";
import Button from "@mui/material/Button";
import { SelectFilterTasks } from "./SelectFilterTasks";

export const MaisOpcoes = (props: any) => {
  return (
    <section className="flex flex-row  h-[57px] leading-5">
      <Button
        variant="contained"
        onClick={props.apagarTodasAsTarefasConcluidas}
        className="bg-red-500 hover:bg-red-600 rounded-lg active:bg-red-600 w-72 p-1 md:w-96 md:text-[20px] font-bold"
      >
        Apagar tarefas concluídas
      </Button>
      <SelectFilterTasks
        fecharMenuSuspenso={null}
        filterTasks={props.filterTasks}
        setFilterTasks={props.setFilterTasks}
      />

      <Button
        variant="contained"
        onClick={() => props.apagarTodasAsTarefasConcluidas("desmarcar")}
        className="bg-green-500 hover:bg-green-600 rounded-lg active:bg-green-600 w-72 p-1 md:w-96 md:text-[20px] font-bold"
      >
        Desmarcar as tarefas
      </Button>
    </section>
  );
};

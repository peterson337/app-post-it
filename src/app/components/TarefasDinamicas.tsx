"use client";
import React, { Fragment, useContext, useState } from "react";
import { ModoTarefa } from "./context/ts/types";
import { ModalEditTaksDinamica } from "./ModalEditTaksDinamica";
import { GlobalContext } from "./context/Store";
import { ModalTarefaDinamica } from "./ModalTarefaDinamica";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export const TarefasDinamicas = () => {
  const {
    modoTarefas,
    setModoTarefas,
    Filtro,
    isOpenModalTarefaDinamica,
    setIsOpenModalTarefaDinamica,
  } = useContext(GlobalContext);

  let teste: string = "";

  const [isOpenModalEditTasks, setIsOpenModalEditTasks] = useState(false);
  const [test, setTest] = useState<number>();
  const [newTask, setNewTask] = useState("");
  const finishOrEditTasks = (id: number, idTypetask: number, teste: string) => {
    modoTarefas.map((val) => {
      if (val.id === idTypetask && val.tasks.length > 0) {
        if (teste === "excluir") {
          const teste = val.tasks.findIndex((item) => item.id === id);
          val.tasks.splice(teste, 1);
          setModoTarefas([...modoTarefas]);
          localStorage.setItem(
            "colecaoTarefas",
            JSON.stringify([...modoTarefas])
          );
        } else if (teste === "concluida") {
          const atualizarTarefa = val.tasks.map(
            (item) => item.id === id && (item.completed = !item.completed)
          );
          localStorage.setItem(
            "colecaoTarefas",
            JSON.stringify([...modoTarefas])
          );
          setModoTarefas([...modoTarefas]); //
        } else if (teste === "editar") {
          const editTask = val.tasks.map(
            (item) => item.id === id && (item.nomeTarefa = newTask)
          );
          localStorage.setItem(
            "colecaoTarefas",
            JSON.stringify([...modoTarefas])
          );
          setModoTarefas([...modoTarefas]); //
          setNewTask("");
          setIsOpenModalEditTasks(false);
        }

        // 'editar'
        //  setTarefas(atualizarTarefa);
        //  localStorage.setItem("tarefas", JSON.stringify(atualizarTarefa));
      }
    });
  };

  return (
    <>
      {isOpenModalTarefaDinamica ? (
        <ModalTarefaDinamica
          isOpenModalTarefaDinamica={isOpenModalTarefaDinamica}
          setIsOpenModalTarefaDinamica={setIsOpenModalTarefaDinamica}
        />
      ) : null}

      {modoTarefas.map((val) => {
        return (
          <>
            {Filtro === val.id && (
              <section
                className="md:grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 overflow-auto h-[23rem] md:h-[26rem]
                flex flex-col ml-5"
                key={val.id}
              >
                {val.tasks.map((item) => {
                  const TarefaConcluida = item.completed;

                  return (
                    <section>
                      <Box
                        component="span"
                        sx={{ mx: "2px", transform: "scale(0.9)" }}
                        // draggable
                        // onDragStart={(e: any) => handleDragStart(e, index)}
                        // onDragEnter={(e: any) => handleDragEnter(e, index)}
                        // onDragEnd={handlerSort}
                        className="cursor-grab w-24 active:cursor-grabbing  "
                      >
                        <Card
                          className={`md:w-[25rem] w-80  h-60 p-5 text-2xl bg-[#fef08a] `}
                        >
                          <Typography
                            className={` text-3xl md:text-4xl ${
                              TarefaConcluida
                                ? "line-through text-green-500"
                                : "text-black"
                            }
              w-full break-words  h-36 overflow-auto font-bangers`}
                            color="text.secondary"
                            gutterBottom
                          >
                            {item.nomeTarefa}
                          </Typography>
                          <CardActions className=" flex flex-row justify-between">
                            <button
                              className="hover:bg-gray-300 p-3 hover:rounded-full text-red-500"
                              onClick={() =>
                                finishOrEditTasks(item.id, val.id, "excluir")
                              }
                            >
                              <FaTrash />{" "}
                            </button>
                            <button
                              className="hover:bg-gray-300 p-3 hover:rounded-full text-green-500"
                              onClick={() =>
                                finishOrEditTasks(item.id, val.id, "concluida")
                              }
                            >
                              <FaCheck />{" "}
                            </button>
                            <button
                              className="hover:bg-gray-300 p-3 hover:rounded-full text-blue-500"
                              onClick={() => (
                                setIsOpenModalEditTasks(true),
                                setTest(item.id),
                                setNewTask(item.nomeTarefa)
                              )}
                            >
                              <FaPen />
                            </button>
                          </CardActions>
                        </Card>
                      </Box>
                      {isOpenModalEditTasks && test === item.id ? (
                        <ModalEditTaksDinamica
                          isOpenModalEditTasks={isOpenModalEditTasks}
                          setIsOpenModalEditTasks={setIsOpenModalEditTasks}
                          setNewTask={setNewTask}
                          newTask={newTask}
                          finishOrEditTasks={finishOrEditTasks}
                          item={item}
                          val={val}
                        />
                      ) : null}
                    </section>
                  );
                })}
              </section>
            )}
          </>
        );
      })}
    </>
  );
};

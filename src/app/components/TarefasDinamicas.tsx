"use client";
import React, { Fragment, useContext } from "react";
import { ModoTarefa } from "./context/ts/types";
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

  const excluirTarefas = (id: number, idTypetask: number) => {
    modoTarefas.map((val) => {
      if (val.id === idTypetask && val.tasks.length > 0) {
        const teste = val.tasks.map(
          (item) => item.id === id && val.tasks.splice(0, 1)
        );
        setModoTarefas([...modoTarefas, teste]); //
      }
    });
  };

  const MacarTarefaComoConcluida = (id: number, idTypetask: number) => {
    modoTarefas.map((val) => {
      if (val.id === idTypetask) {
        if (val.tasks.length > 0) {
          const atualizarTarefa = val.tasks.map(
            (item) => item.id === id && (item.completed = !item.completed)
          );
          setModoTarefas([...modoTarefas, atualizarTarefa]); //
        }
      }
      //console.log(atualizarTarefa);
    });

    //  setTarefas(atualizarTarefa);
    //  localStorage.setItem("tarefas", JSON.stringify(atualizarTarefa));
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
              <Fragment key={val.id}>
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
                              onClick={() => excluirTarefas(item.id, val.id)}
                            >
                              <FaTrash />{" "}
                            </button>
                            <button
                              className="hover:bg-gray-300 p-3 hover:rounded-full text-green-500"
                              onClick={() =>
                                MacarTarefaComoConcluida(item.id, val.id)
                              }
                            >
                              <FaCheck />{" "}
                            </button>
                            {/* <button
                    className="hover:bg-gray-300 p-3 hover:rounded-full text-blue-500"
                    onClick={() => openModalEditarTarefas(val.id)}
                  >
                    <FaPen />
                  </button> */}
                          </CardActions>
                        </Card>
                      </Box>
                    </section>
                  );
                })}
              </Fragment>
            )}
          </>
        );
      })}
    </>
  );
};

//! CÓDIGO PARA ARRUMAR DEPOIS
{
  /* */
}

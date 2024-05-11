"use client";
import React, { Fragment, useContext } from "react";
import { ModoTarefa } from "./context/ts/types";
import { GlobalContext } from "./context/Store";
import { ModalTarefaDinamica } from "./ModalTarefaDinamica";

export const TarefasDinamicas = () => {
  const {
    modoTarefas,
    Filtro,
    isOpenModalTarefaDinamica,
    setIsOpenModalTarefaDinamica,
  } = useContext(GlobalContext);

  return (
    <>
      {isOpenModalTarefaDinamica ? (
        <ModalTarefaDinamica
          isOpenModalTarefaDinamica={isOpenModalTarefaDinamica}
          setIsOpenModalTarefaDinamica={setIsOpenModalTarefaDinamica}
        />
      ) : null}

      {modoTarefas.map((item) => {
        return (
          <>
            {Filtro === item.id && (
              <Fragment key={item.id}>
                {item.tasks.map((item) => {
                  return (
                    <section>
                      <p>{item.nomeTarefa}</p>
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
  /* <Box
component="span"
sx={{ mx: "2px", transform: "scale(0.9)" }}
draggable
onDragStart={(e: any) => handleDragStart(e, index)}
onDragEnter={(e: any) => handleDragEnter(e, index)}
onDragEnd={handlerSort}
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
      onClick={() => excluirTarefas(val.id)}
    >
      <FaTrash />{" "}
    </button>
    <button
      className="hover:bg-gray-300 p-3 hover:rounded-full text-green-500"
      onClick={() => MacarTarefaComoConcluida(val.id)}
    >
      <FaCheck />{" "}
    </button>
    <button
      className="hover:bg-gray-300 p-3 hover:rounded-full "
      onClick={() => favoritarTarefa(val.id)}
    >
      <BsBookmarkStar />{" "}
    </button>
    <button
      className="hover:bg-gray-300 p-3 hover:rounded-full text-blue-500"
      onClick={() => openModalEditarTarefas(val.id)}
    >
      <FaPen />
    </button>
  </CardActions>
</Card>
</Box> */
}

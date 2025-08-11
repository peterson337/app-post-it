import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "./context/Store";
import { ListaDeCompra } from "./ListaDeCompra";
import { TarefasDinamicas } from "./TarefasDinamicas";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

export const CardComponent = (props: any) => {
  const { Filtro, setIsSideBar, modoTarefas } = useContext(GlobalContext);

  return (
    <main className="flex justify-center  items-center">
      <section
        className={` bg-[#373737]  md:p-10 
     md:w-full md:h-[51rem] h-[calc(100vh-6rem)]   m-5
     w-96 rounded-xl
     scrollbar-thin scrollbar-thumb-sky-500 
     scrollbar-track-sky-300   scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
     `}
      >
        <button
          onClick={() => setIsSideBar(true)}
          className="text-3xl m-3 md:m-0"
        >
          <TbLayoutSidebarLeftCollapse />
        </button>

        <h1 className=" text-2xl font-bangers text-center mt-5 md:mt-0  md:block">
          {modoTarefas.map((item) => {
            return (
              Filtro === item.id && <p key={item.id}>{item.nomeGrupoTarefa}</p>
            );
          })}
        </h1>

        {Filtro === 2 ? (
          <ListaDeCompra></ListaDeCompra>
        ) : (
          // <p>Nenhuma lista de compra encontrada.</p>
          <div></div>
        )}

        {Filtro != 2 ? (
          <TarefasDinamicas />
        ) : (
          // <p>Nenhuma lista de compra encontrada.</p>
          <div></div>
        )}
      </section>
    </main>
  );
};

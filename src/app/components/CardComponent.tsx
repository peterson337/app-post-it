import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "./context/Store";
import { ListaDeCompra } from "./ListaDeCompra";
import { TarefasDinamicas } from "./TarefasDinamicas";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import ModalReutilizavel from "./ModalReutilizavel";
import useCustomHook from "../hook/useCustomHook";
import { FaKeyboard } from "react-icons/fa";
export const CardComponent = () => {
  const { addedTabSelected } = useCustomHook();
  //prettier-ignore
  const { Filtro, setIsSideBar, modoTarefas, tabs, setFiltro, setTabs } = useContext(GlobalContext);
  const [modalAddTabs, setModalAddTabs] = React.useState(false);
  const evitarAdicionarAbaRepetida = useRef(false);
  const numbers = useRef<string[]>([]);
  const contentModal = useRef("");

  useEffect(() => {
    if (evitarAdicionarAbaRepetida.current) return;

    const tabAtual = modoTarefas.find((item) => item.id === Filtro);

    for (let i = 0; i < 10; i++) numbers.current.push(String(i));

    //prettier-ignore
    addedTabSelected({id: tabAtual?.id || 0, nomeGrupoTarefa: tabAtual?.nomeGrupoTarefa || ""});
    evitarAdicionarAbaRepetida.current = true;
  }, []);

  const closeTabs = () => {
    const tabSelected = tabs.filter((tab) => tab.id !== Filtro);
    const index = tabs.findIndex((tab) => tab.id === Filtro);

    if (tabSelected.length > 0) {
      setTabs(tabSelected);
      setFiltro(tabs[index - 1].id);
    }
  };

  useEffect(() => {
    const changeTab = (e: KeyboardEvent) => {
      if ((e.key === "w" || e.key === "W") && e.altKey) closeTabs();

      if (!numbers.current.includes(e.key)) return;

      if (tabs[+e.key]) setFiltro(tabs[+e.key].id);
    };

    window.addEventListener("keydown", changeTab);

    return () => window.removeEventListener("keydown", changeTab);
  }, [tabs, Filtro]);

  return (
    <main className="flex justify-center  items-center">
      <section
        className={`bg-[#373737] w-[95%] h-[95dvh] mt-5 p-5 rounded-[20px] `}
      >
        <div className="flex flex-row justify-between items-center">
          <button
            onClick={() => setIsSideBar(true)}
            className="text-3xl m-3 md:m-0"
          >
            <TbLayoutSidebarLeftCollapse />
          </button>

          <button
            className="text-3xl"
            onClick={() => {
              setModalAddTabs(true),
                (contentModal.current = "Atalhos de teclado");
            }}
          >
            <FaKeyboard />
          </button>
        </div>

        <section className="flex flex-row justify-center gap-5 items-center mb-3 ">
          <div
            /* prettier-ignore */
            className={`flex flex-row gap-5 ${tabs.length > 1 ? "w-[50%] overflow-auto whitespace-nowrap " : "w-auto"}`}
          >
            {tabs.map((item) => {
              return (
                <h3
                  style={Filtro === item.id ? { color: "#1c84b8" } : {}}
                  className={`text-white md:text-4xl text-2xl font-bangers cursor-pointer ${
                    Filtro === item.id ? "border-b-2 border-[#1c84b8]" : ""
                  }

                    ${tabs.length > 1 ? "mr-5" : "mr-0"}
                    `}
                  onClick={() => setFiltro(item.id)}
                  key={item.id}
                >
                  {item.nomeTab}
                </h3>
              );
            })}
          </div>

          <button
            onClick={() => {
              setModalAddTabs(true), (contentModal.current = "Add Tabs");
            }}
          >
            <FaPlus className="text-2xl" />
          </button>

          <ModalReutilizavel
            isOpenModal={modalAddTabs}
            setIsOpenModal={setModalAddTabs}
            content={contentModal.current}
          />
        </section>

        {Filtro === 2 ? <ListaDeCompra></ListaDeCompra> : <TarefasDinamicas />}
      </section>

      {/* <section
        className={` bg-[#373737]  md:p-10 
     md:w-full md:h-[51rem] h-[calc(100dvh-2rem)]   m-5
     w-96 rounded-xl
     scrollbar-thin scrollbar-thumb-sky-500 
     scrollbar-track-sky-300   scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
     `}
      >
  */}
    </main>
  );
};

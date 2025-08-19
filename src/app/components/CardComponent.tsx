import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "./context/Store";
import { ListaDeCompra } from "./ListaDeCompra";
import { TarefasDinamicas } from "./TarefasDinamicas";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import ModalReutilizavel from "./ModalReutilizavel";
import customHook from "../hook/customHook";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export const CardComponent = () => {
  const { addedTabSelected } = customHook();
  //prettier-ignore
  const { Filtro, setIsSideBar, modoTarefas, tabs, setFiltro } = useContext(GlobalContext);
  const [modalAddTabs, setModalAddTabs] = React.useState(false);
  const evitarAdicionarAbaRepetida = useRef(false);

  useEffect(() => {
    if (evitarAdicionarAbaRepetida.current) return;

    const tabAtual = modoTarefas.find((item) => item.id === Filtro);

    //prettier-ignore
    addedTabSelected({id: tabAtual?.id || 0, nomeGrupoTarefa: tabAtual?.nomeGrupoTarefa || ""});
    evitarAdicionarAbaRepetida.current = true;
  }, []);

  return (
    <main className="flex justify-center  items-center">
      <section
        className={`bg-[#373737] w-[95%] h-[95dvh] mt-5 p-5 rounded-[20px] scrollbar-thin 
          scrollbar-thumb-sky-500 scrollbar-track-sky-300   scrollbar-thumb-rounded-full 
          scrollbar-track-rounded-full`}
      >
        <button
          onClick={() => setIsSideBar(true)}
          className="text-3xl m-3 md:m-0"
        >
          <TbLayoutSidebarLeftCollapse />
        </button>

        <section className="flex flex-row justify-center gap-5 items-center mb-3 ">
          <Box
            sx={{
              maxWidth: { xs: 320, sm: 480 },
            }}
          >
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {tabs.map((item) => {
                return (
                  <Tab
                    //prettier-ignore
                    sx={{ color: "white", fontSize: "20px", borderBottom:  Filtro === item.id ? "2px solid #1c84b8" : "" }}
                    label={item.nomeTab}
                    onClick={() => setFiltro(item.id)}
                    key={item.id}
                  />
                );
              })}
            </Tabs>
          </Box>

          <button onClick={() => setModalAddTabs(true)}>
            <FaPlus className="text-2xl" />
          </button>

          <ModalReutilizavel
            isOpenModal={modalAddTabs}
            setIsOpenModal={setModalAddTabs}
            content={"Add Tabs"}
          />
        </section>

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

      {/* <section
        className={` bg-[#373737]  md:p-10 
     md:w-full md:h-[51rem] h-[calc(100dvh-2rem)]   m-5
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
      </section> */}
    </main>
  );
};

import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "./context/Store";
import { ListaDeCompra } from "./ListaDeCompra";
import { TarefasDinamicas } from "./TarefasDinamicas";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import {
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaKeyboard,
} from "react-icons/fa";
import ModalReutilizavel from "./ModalReutilizavel";
import useCustomHook from "../hook/useCustomHook";
import { motion } from "framer-motion";
export const CardComponent = () => {
  const { addedTabSelected } = useCustomHook();
  //prettier-ignore
  const { Filtro, setIsSideBar, tabs, modoTarefas, setFiltro, setTabs } = useContext(GlobalContext);
  const [modalAddTabs, setModalAddTabs] = React.useState(false);
  const evitarAdicionarAbaRepetida = useRef(false);
  const numbers = useRef<string[]>([]);
  const contentModal = useRef("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setShowArrows(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [tabs]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (evitarAdicionarAbaRepetida.current) return;

    //prettier-ignore
    const firstTask = JSON.parse(localStorage.getItem("colecaoTarefas") || "[]");

    const tabAtual =
      firstTask && firstTask.length > 0
        ? firstTask.find((item: any) => item.id === Filtro)
        : modoTarefas.find((item: any) => item.id === Filtro);

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
      setFiltro(index === 0 ? tabs[index + 1].id : tabs[index - 1].id);
    }
  };

  useEffect(() => {
    const changeTab = (e: KeyboardEvent) => {
      if ((e.key === "w" || e.key === "W") && e.altKey) closeTabs();

      if (e.key === "=" && e.altKey) {
        setModalAddTabs(true);
        contentModal.current = "Add Tabs";
      }

      if (!numbers.current.includes(e.key)) return;

      if (tabs[+e.key] && e.ctrlKey) setFiltro(tabs[+e.key].id);
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
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSideBar(true)}
            className="text-3xl m-3 md:m-0"
          >
            <TbLayoutSidebarLeftCollapse />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="text-3xl"
            onClick={() => {
              (setModalAddTabs(true),
                (contentModal.current = "Atalhos de teclado"));
            }}
          >
            <FaKeyboard />
          </motion.button>
        </div>

        <section className="flex flex-row justify-center gap-5 items-center mb-3 ">
          {showArrows && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScroll("left")}
            >
              <FaChevronLeft className="text-white text-2xl" />
            </motion.button>
          )}

          <div
            ref={scrollRef}
            /* prettier-ignore */
            className={`flex flex-row ${tabs.length > 1 && showArrows === false  && 'justify-center'} gap-5 ${tabs.length > 1 ? "w-[100%] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] " : "w-auto"}`}
          >
            {tabs.map((item) => {
              const isActive = Filtro === item.id;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFiltro(item.id)}
                  className={`cursor-pointer ${
                    tabs.length > 1 ? "mr-5" : "mr-0"
                  }`}
                >
                  <motion.h3
                    animate={{
                      color: isActive ? "#1c84b8" : "#ffffff",
                    }}
                    transition={{
                      duration: 1.3,
                    }}
                    className={`md:text-4xl text-2xl font-bangers ${
                      isActive ? "border-b-2 border-[#1c84b8]" : ""
                    }`}
                  >
                    {item.nomeTab}
                  </motion.h3>
                </motion.div>
              );
            })}
          </div>

          {showArrows && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScroll("right")}
            >
              <FaChevronRight className="text-white text-2xl" />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              (setModalAddTabs(true), (contentModal.current = "Add Tabs"));
            }}
          >
            <FaPlus className="text-2xl" />
          </motion.button>

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

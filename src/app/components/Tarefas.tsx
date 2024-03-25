"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";
import { GlobalContext } from "./context/Store";
import { Modal } from "../components/Modal";
import { CardComponent } from "../components/CardComponent";
import Fab from "@mui/material/Fab";

import { FaPlus } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { MdMenu } from "react-icons/md";

export const Tarefas = () => {
  const {
    Filtro,
    setFiltro,
    handleChandeTab,
    isOpenModal,
    setIsOpenModal,
    isOpenSidebar,
    setIsOpenSidebar,
    sidebarItems,
    setSidebarItems,
  } = useContext(GlobalContext);

  const openModalCreateTarefas = () => setISOpenModalCreateTareas(true);
  const closeModalCreateTarefas = () => setISOpenModalCreateTareas(false);

  const [iSOpenModalCreateTareas, setISOpenModalCreateTareas] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event: any) => {
    if (event.ctrlKey && event.key === "m") {
      setISOpenModalCreateTareas(true);
    } else if (event.ctrlKey && event.key === ",") {
      setIsOpenModal(true);
    }
  };

  const closeSidebar = () => setIsOpenSidebar(false);

  return (
    <main className="md:flex md:flex-col md:h-[100vh] md:justify-between  ">
      {/* Tamanho do mnitor gande 1920 */}

      {iSOpenModalCreateTareas ? (
        <Modal setISOpenModalCreateTareas={setISOpenModalCreateTareas} />
      ) : null}

      {isOpenSidebar ? (
        <Drawer open={isOpenSidebar} onClose={closeSidebar}>
          <Box
            className="bg-[#373737]  h-screen w-64 flex flex-col"
            role="presentation "
          >
            <button
              onClick={() => setIsOpenSidebar(!isOpenSidebar)}
              className="m-5 text-white text-2xl"
            >
              <MdMenu />
            </button>

            <section className="bg-red-500">
              {sidebarItems.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <ListItem
                      className={` text-white cursor-pointer  ${
                        Filtro === item.id ? "bg-sky-500" : ""
                      }`}
                      onClick={() => setFiltro(item.id)}
                    >
                      {item.nomerupoTarefas}
                    </ListItem>
                  </Fragment>
                );
              })}
            </section>
          </Box>
        </Drawer>
      ) : null}

      <CardComponent />

      {Filtro === 0 || Filtro === 2 ? (
        <div
          className="w-full flex justify-end  bottom-2  md:mb-5 md:md:pr-10 
  pr-5 absolute md:relative"
        >
          <Fab
            className={`${Filtro === 0 ? "bg-sky-500" : "bg-green-500"}
     ${Filtro === 0 ? "hover:bg-sky-700" : "hover:bg-green-700"}
     text-white 
     text-2xl
    
    `}
            onClick={
              Filtro === 0 ? openModalCreateTarefas : () => setIsOpenModal(true)
            }
            onKeyPress={handleKeyPress}
            //     onKeyPress={handleKeyPress  as unknown as KeyboardEvent}
          >
            {Filtro === 0 ? <FaPlus /> : <FaCartPlus />}
          </Fab>
        </div>
      ) : null}
    </main>
  );
};

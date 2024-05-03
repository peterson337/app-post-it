"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "./context/Store";
import { Modal } from "../components/Modal";
import { CardComponent } from "../components/CardComponent";
import Fab from "@mui/material/Fab";

import { FaPlus } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
export const Tarefas = () => {
  const {
    Filtro,
    isOpenModal,
    setIsOpenModal,
    handleChandeTab,
    setFiltro,
    isSideBar,
    setIsSideBar,
    modoTarefas,
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

  return (
    <main className="md:flex md:flex-col md:h-[100vh] md:justify-between  ">
      {/* Tamanho do mnitor gande 1920 */}

      {iSOpenModalCreateTareas ? (
        <Modal setISOpenModalCreateTareas={setISOpenModalCreateTareas} />
      ) : null}

      <CardComponent />

      {isSideBar ? (
        <Drawer open={isSideBar} onClose={() => setIsSideBar(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List
              sx={{
                backgroundColor: "#373737",
                height: "100vh",
                color: "white",
              }}
            >
              <>
                <p className=" text-center font-bangers text-2xl md:text-3xl">
                  App post it 😎
                </p>

                <div className="mb-3 mt-3 flex justify-end w-full text-3xl">
                  <button onClick={() => setIsSideBar(false)} className="mr-3">
                    <TbLayoutSidebarLeftExpand />
                  </button>
                </div>

                {modoTarefas.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      onClick={() => {
                        setFiltro(item.id);
                        setIsSideBar(false);
                      }}
                      className={`${
                        Filtro === item.id
                          ? "bg-[#116d96]"
                          : "hover:bg-white/20"
                      } cursor-pointer  mb-3 rounded-lg font-bangers text-2xl	`}
                    >
                      <p>{item.nomeGrupoTarefa}</p>
                    </ListItem>
                  );
                })}
              </>
            </List>
          </Box>
        </Drawer>
      ) : null}

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

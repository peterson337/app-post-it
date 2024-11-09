"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "./context/Store";
import { Modal } from "../components/Modal";
import { CardComponent } from "../components/CardComponent";
import { ModalCreateTypeTask } from "../components/ModalCreateTypeTask";
import Fab from "@mui/material/Fab";
import { FaPlus } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoArrowDown } from "react-icons/io5";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { IoIosSave } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";

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
    isOpenModalTarefaDinamica,
    setIsOpenModalTarefaDinamica,
    setModoTarefas,
  } = useContext(GlobalContext);

  const openModalCreateTarefas = () => setISOpenModalCreateTareas(true);
  const closeModalCreateTarefas = () => setISOpenModalCreateTareas(false);

  const [iSOpenModalCreateTareas, setISOpenModalCreateTareas] = useState(false);
  const [iSOpenModalCreateTypeTask, setiSOpenModalCreateTypeTask] =
    useState(false);
  const [editTitleTask, setEditTitleTask] = useState<null | number>(null);
  const [newTask, setNewTask] = useState("");
  const inputEditListName = useRef<HTMLInputElement>(null);

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
    } else if (event.ctrlKey && event.key === ";") {
      setIsOpenModalTarefaDinamica(true);
    }
  };

  const [anchorEls, setAnchorEls] = useState<{
    [key: number]: HTMLElement | null;
  }>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
    setSelectedId(id);
  };
  const handleClose = (result: String, id: number) => {
    if (result === "excluir") {
      const findFilter = modoTarefas.findIndex((item) => item.id === id);
      modoTarefas.splice(findFilter, 1);
      setModoTarefas([...modoTarefas]);
      localStorage.setItem("colecaoTarefas", JSON.stringify([...modoTarefas]));
      setAnchorEls((prev) => ({ ...prev, [selectedId!]: null }));
    } else if (result === "edit") {
      if (newTask.length === 0) {
        alert("Escreva o nome da sua lista de tarefa para usar este botão");
        return;
      } else {
        modoTarefas.map(
          (item) => item.id === id && (item.nomeGrupoTarefa = newTask)
        );
        setModoTarefas([...modoTarefas]);
        localStorage.setItem(
          "colecaoTarefas",
          JSON.stringify([...modoTarefas])
        );
        setAnchorEls((prev) => ({ ...prev, [selectedId!]: null }));
        setEditTitleTask(null);
      }
    }
  };

  // prettier-ignore
  useEffect(() => {if (editTitleTask !== null && inputEditListName.current) inputEditListName.current.focus();}, [editTitleTask]);

  const inputEditTaskNameList = (item: any) => {
    setEditTitleTask(item.id),
      setAnchorEls((prev) => ({
        ...prev,
        [selectedId!]: null,
      })),
      setNewTask(item.nomeGrupoTarefa);
  };

  const formatNomeGrupoTarefa = (nome: string) =>
    nome.length > 20 ? nome.substring(0, 10) + "..." : nome;

  return (
    <main className="md:flex md:flex-col md:h-[100vh] md:justify-between  ">
      {/* Tamanho do mnitor gande 1920 */}

      <CardComponent
        iSOpenModalCreateTareas={iSOpenModalCreateTareas}
        setISOpenModalCreateTareas={setISOpenModalCreateTareas}
      />

      {isSideBar ? (
        <Drawer open={isSideBar} onClose={() => setIsSideBar(false)}>
          <Box sx={{ width: 270 }} role="presentation">
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

                <div className="mb-3 flex justify-center w-full">
                  <button
                    onClick={() => setiSOpenModalCreateTypeTask(true)}
                    className="bg-sky-500 hover:bg-sky-700 rounded-lg p-3 font-bangers text-[1.3rem]"
                  >
                    Criar uma lista de tarefa
                  </button>
                </div>

                <div className="bg-[#373737] h-[33rem] md:h-[47rem] overflow-auto">
                  {modoTarefas.map((item) => {
                    const validation =
                      item.nomeGrupoTarefa !== "Todas as tarefas" &&
                      item.nomeGrupoTarefa !== "Todas favoritas" &&
                      item.nomeGrupoTarefa !== "Lista de compra 🛒";
                    return (
                      <div
                        className={`flex flex-row ${
                          Filtro === item.id && editTitleTask !== item.id
                            ? "bg-[#116d96]"
                            : editTitleTask === item.id
                            ? "justify-center items-center gap-2"
                            : "hover:bg-white/20"
                        } cursor-pointer  mb-3 rounded-lg`}
                        key={item.id}
                      >
                        {editTitleTask === item.id ? (
                          <>
                            <input
                              ref={inputEditListName}
                              type="text"
                              value={newTask}
                              className="ml-4 h-12 rounded-xl text-black pl-3  border-white bg-white  outline-none border-none w-[11rem]"
                              required
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setNewTask(e.target.value)}
                            />
                          </>
                        ) : (
                          <ListItem
                            onClick={() => {
                              setFiltro(item.id);
                              setIsSideBar(false);
                            }}
                            className={` font-bangers text-2xl`}
                          >
                            <p>{formatNomeGrupoTarefa(item.nomeGrupoTarefa)}</p>
                          </ListItem>
                        )}
                        <></>
                        {validation && (
                          <div className="flex justify-end items-center ml-2 flex-row gap-3 text-2xl mr-4">
                            <Button
                              id="basic-button"
                              aria-controls={
                                anchorEls[item.id] ? "basic-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={
                                anchorEls[item.id] ? "true" : undefined
                              }
                              onClick={(event: any) =>
                                handleClick(event, item.id)
                              }
                              className="bg-black hover:bg-slate-700"
                            >
                              <IoArrowDown className={` text-white`} />
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorEls[item.id]}
                              open={Boolean(anchorEls[item.id])}
                              onClose={() =>
                                setAnchorEls((prev) => ({
                                  ...prev,
                                  [selectedId!]: null,
                                }))
                              }
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              {editTitleTask !== item.id ? (
                                <>
                                  <MenuItem
                                    onClick={() =>
                                      handleClose("excluir", item.id)
                                    }
                                  >
                                    Excluir do grupo de tarefas
                                  </MenuItem>

                                  <MenuItem
                                    onClick={() => inputEditTaskNameList(item)}
                                  >
                                    Editar o nome da lista de tarefas
                                  </MenuItem>
                                </>
                              ) : (
                                <>
                                  <MenuItem
                                    onClick={() => handleClose("edit", item.id)}
                                  >
                                    Salvar o novo nome da lista de tarefa{" "}
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      setEditTitleTask(null),
                                        setAnchorEls((prev) => ({
                                          ...prev,
                                          [selectedId!]: null,
                                        }));
                                    }}
                                  >
                                    Cancelar a edição
                                  </MenuItem>
                                </>
                              )}
                            </Menu>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            </List>
          </Box>
        </Drawer>
      ) : null}

      {iSOpenModalCreateTypeTask ? (
        <ModalCreateTypeTask
          setIsOpenModalCreateTypeTask={setiSOpenModalCreateTypeTask}
          iSOpenModalCreateTypeTask={iSOpenModalCreateTypeTask}
        />
      ) : null}
    </main>
  );
};

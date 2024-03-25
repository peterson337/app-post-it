import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "./context/Store";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { BsBookmarkStar } from "react-icons/bs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ListaDeCompra } from "./ListaDeCompra";

import { ModalEditarTarefa } from "./ModalEditarTarefa";
import { TarefasFavoritas } from "./TarefasFavoritas";
import { DragEvent } from "react"; // Importe o tipo DragEvent
import Button from "@mui/material/Button";

import Drawer from "@mui/material/Drawer";
import { MdMenu } from "react-icons/md";

export const CardComponent = () => {
  const {
    tarefas,
    excluirTarefas,
    setArmazenarTarefa,
    MacarTarefaComoConcluida,
    tarefasFavoritas,
    Filtro,
    setFiltro,
    handleChandeTab,
    setTarefasFavoritas,
    favoritarTarefa,
    setTarefas,
    isOpenSidebar,
    setIsOpenSidebar,
    sidebarItems,
  } = useContext(GlobalContext);

  const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] =
    useState(false);

  const [Searchtarefas, setSearchtarefas] = useState("");

  const [MensaagesseErroPesquisa, setMensaagesseErroPesquisa] = useState<
    null | number
  >(null);

  const closeModalEditarTarefas = () => setISOpenModalEditarTarefas(false);

  const dragListaDeCompra = useRef<number | null>(null);
  const dragOverListaDeCompra = useRef<number | null>(null);

  const openModalEditarTarefas = (id: number) => {
    setISOpenModalEditarTarefas(true);
    setArmazenarTarefa(id);
  };

  const handleDragStart = (e: DragEvent<HTMLElement>, index: number) => {
    dragListaDeCompra.current = index;
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragEnter = (e: DragEvent<HTMLElement>, index: number) => {
    dragOverListaDeCompra.current = index;
    e.preventDefault();
  };

  const handlerSort = () => {
    if (
      dragListaDeCompra.current !== null &&
      dragOverListaDeCompra.current !== null
    ) {
      const ListaDeCompraClone = [...tarefas];
      const temp = ListaDeCompraClone[dragListaDeCompra.current];
      ListaDeCompraClone[dragListaDeCompra.current] =
        ListaDeCompraClone[dragOverListaDeCompra.current];
      ListaDeCompraClone[dragOverListaDeCompra.current] = temp;
      setTarefas(ListaDeCompraClone);
      localStorage.setItem("tarefas", JSON.stringify(ListaDeCompraClone));
    }
  };

  const apagarTodasAsTarefasConcluidas = () => {
    const temTarefaconcluida = tarefas.some((tarefa) => tarefa.completed);

    if (!temTarefaconcluida) {
      alert("Deixe uma ou mais tarefa como concluida para usar este botão ");
      return;
    }

    const deletarTarefa = tarefas.filter((val) => val.completed === false);
    setTarefas(deletarTarefa);
    localStorage.setItem("tarefas", JSON.stringify(deletarTarefa));
  };

  return (
    <main className="flex justify-center  items-center">
      {iSOpenModalEditarTarefas ? (
        <ModalEditarTarefa
          openModalEditarTarefas={openModalEditarTarefas}
          closeModalEditarTarefas={closeModalEditarTarefas}
        />
      ) : null}

      <section
        className={` bg-[#373737]  md:p-10 
     md:w-[90rem] md:h-[35rem] h-[30rem] m-5
     w-96 rounded-xl
     scrollbar-thin scrollbar-thumb-sky-500 
     scrollbar-track-sky-300   scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
     `}
      >
        <div className=" flex flex-row  justify-around">
          <>
            <button onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
              <MdMenu className="text-2xl " />
            </button>

            <h1 className=" text-2xl font-bangers text-center mt-5 md:mt-0  md:mr-96 mr-16">
              {sidebarItems.map((item) => {
                return (
                  <Fragment key={item.id}>
                    {item.id === Filtro ? <p>{item.nomerupoTarefas}</p> : null}
                  </Fragment>
                );
              })}
            </h1>
          </>
        </div>

        {Filtro === 0 && tarefas.length != 0 ? (
          <div className="flex justify-center items-center flex-col md:flex-row gap-3">
            <input
              type="text"
              className="text-black p-2 rounded-full mt-3 outline-none"
              onChange={(e) => setSearchtarefas(e.target.value)}
              value={Searchtarefas}
              placeholder="Pesquise por uma tarefa aqui..."
            />

            <Button
              variant="contained"
              onClick={apagarTodasAsTarefasConcluidas}
              className="bg-red-500 hover:bg-red-600 rounded-lg active:bg-red-600 w-72 p-2 md:w-96
               md:text-[20px] font-bold"
            >
              Apagar tarefas concluidas
            </Button>
          </div>
        ) : null}

        {Filtro === 1 ? (
          <section className="flex flex-col ">
            {tarefasFavoritas.length === 0 ? (
              <p
                className=" text-red-500 text-[22px] md:text-2xl font-bold m-3 md:text-center
          "
              >
                Não existem tarefas favoritas 😞
              </p>
            ) : (
              <TarefasFavoritas></TarefasFavoritas>
            )}
          </section>
        ) : null}

        {Filtro === 0 ? (
          <div>
            {tarefas.length === 0 ? (
              <p
                className="md:text-center text-red-500 md:text-2xl font-bold
           text-start text-[22px] m-3"
              >
                Não existem tarefas salvas 😞
              </p>
            ) : (
              <section
                className={`grid  grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 p-2 
              overflow-auto   h-72 mt-3
              scrollbar-thin scrollbar-thumb-sky-500 
    scrollbar-track-sky-300   scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
    
    `}
              >
                {tarefas.map((val, index) => {
                  const TarefaConcluida = val.completed;
                  const isMatchingSearch = val.tarefa
                    .toLowerCase()
                    .includes(Searchtarefas.toLowerCase());

                  return (
                    <section
                      key={val.id}
                      className="grid  grid-cols-1 xl:grid-cols-3 lg:grid-cols-2  
                     
                     "
                    >
                      {isMatchingSearch || Searchtarefas.length === 0 ? (
                        <Box
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
                              {val.tarefa}
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
                        </Box>
                      ) : /* id === val.id? 'Nenhuma tarefa encontrada.' : */

                      null}
                    </section>
                  );
                })}
              </section>
            )}
          </div>
        ) : null}

        {Filtro === 2 ? (
          <ListaDeCompra></ListaDeCompra>
        ) : (
          // <p>Nenhuma lista de compra encontrada.</p>
          <div></div>
        )}
      </section>
    </main>
  );
};

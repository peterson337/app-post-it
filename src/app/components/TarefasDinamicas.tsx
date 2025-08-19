"use client";
import React, {
  useContext,
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ModoTarefa } from "./context/ts/types";
import { ModalEditTaksDinamica } from "./ModalEditTaksDinamica";
import { GlobalContext } from "./context/Store";
import { ModalTarefaDinamica } from "./ModalTarefaDinamica";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import { RiDraggable } from "react-icons/ri";
import { AiOutlineFontColors } from "react-icons/ai";
//
//! Três ponts vertical
import { MdMoreVert } from "react-icons/md";
//
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { style } from "./../style/style";
import { StyledMenu } from "./StyledMenu";
import { SelectFilterTasks } from "./SelectFilterTasks";
import { FaArrowDown } from "react-icons/fa";
import { MaisOpcoes } from "./MaisOpcoes";
import { FaPlus } from "react-icons/fa";

import Fab from "@mui/material/Fab";
import { Tasks as Tarefas } from "../components/context/ts/types";
import TextField from "@mui/material/TextField";
import useCustomHook from "../hook/useCustomHook";

export type Tasks = {
  id: number;
  nomeTarefa: string;
  completed: boolean;
  color: string;
  colorText: boolean;
};

interface TaskCardProps {
  item: Tasks;
  finishOrEditTasks: (item: number, val: number, action: string) => void;
  setNewTask: Dispatch<SetStateAction<string>>;
  setIsOpenModalEditTasks: Dispatch<SetStateAction<boolean>>;
  setTest: Dispatch<SetStateAction<number | null>>;
  val: ModoTarefa;
  id: number;
  isOpenModalEditTasks: boolean;
  test: number | null;
  newTask: string;
  setModoTarefas: Dispatch<SetStateAction<ModoTarefa[]>>;
  modoTarefas: ModoTarefa[];
}

const TaskCard = ({
  item,
  finishOrEditTasks,
  setNewTask,
  setIsOpenModalEditTasks,
  setTest,
  val,
  id,
  isOpenModalEditTasks,
  test,
  newTask,
  setModoTarefas,
  modoTarefas,
}: TaskCardProps) => {
  const TarefaConcluida = item.completed;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const inputColorRef = React.useRef("");
  const inputColorValue = inputColorRef.current;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: item.color || "#fef08a",
    color: item.colorText ? "black" : "white",
  };

  const styleP = {
    color: item.completed ? "#22c55e" : item.colorText ? "black" : "white",
  };

  const styleI = {
    color: item.colorText ? "black" : "white",
  };

  const changeColorPostIt = (
    e: string,
    postId: number,
    grupTasksId: number,
    colorText?: boolean
  ) => {
    modoTarefas.map((val) => {
      if (val.id === grupTasksId)
        val.tasks.map(
          (item) =>
            item.id === postId &&
            (e === ""
              ? (item.colorText = colorText as any)
              : ((item.color = e), (inputColorRef.current = e)))
        );
      setModoTarefas([...modoTarefas]);
    });

    localStorage.setItem("colecaoTarefas", JSON.stringify([...modoTarefas]));
  };

  const [anchorEls, setAnchorEls] = useState<{
    [key: number]: HTMLElement | null;
  }>({});

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Box sx={{ transform: "scale(0.9)" }}>
      <Card
        className={`md:w-[25rem] w-80 h-60 p-5 text-2xl rounded-[20px]`}
        ref={setNodeRef}
        style={style}
      >
        <Typography
          className={`text-3xl md:text-4xl ${
            TarefaConcluida
              ? "line-through text-green-500"
              : `${item.colorText}`
          } w-full break-words h-36 overflow-auto font-bangers`}
          color="text.secondary"
          gutterBottom
          style={styleP}
        >
          {item.nomeTarefa}
        </Typography>
        <CardActions className="flex flex-row justify-between">
          <Tooltip title="Deletar tarefa">
            <button
              className="hover:bg-gray-300 p-3 hover:rounded-full text-red-500"
              onClick={() => finishOrEditTasks(item.id, val.id, "excluir")}
            >
              <FaTrash />
            </button>
          </Tooltip>
          <Tooltip title="Marca tarefa como concluída">
            <Checkbox
              className="hover:bg-gray-300 p-3 hover:rounded-full text-black"
              checked={TarefaConcluida}
              onClick={() => finishOrEditTasks(item.id, val.id, "concluida")}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              style={styleP}
            ></Checkbox>
          </Tooltip>

          <Tooltip title="Editar tarefa">
            <button
              className="hover:bg-gray-300 p-3 hover:rounded-full text-blue-500"
              onClick={() => {
                setIsOpenModalEditTasks(true);
                setTest(item.id);
                setNewTask(item.nomeTarefa);
              }}
            >
              <FaPen />
            </button>
          </Tooltip>

          <Tooltip title="Mudar o post it de lugar">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing"
            >
              <RiDraggable />
            </button>
          </Tooltip>

          <div className="flex justify-end items-center ml-2 flex-row gap-3  mr-4">
            <Tooltip title="Mais opções">
              <Button
                id="basic-button"
                aria-controls={anchorEls[item.id] ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEls[item.id] ? "true" : undefined}
                onClick={(event: any) => {
                  setAnchorEls((prev) => ({
                    ...prev,
                    [id]: event.currentTarget,
                  })),
                    setSelectedId(id);
                }}
                className="text-2xl"
                style={styleI}
              >
                <MdMoreVert />
              </Button>
            </Tooltip>
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
              <div className="flex flex-col p-2 gap-3">
                <MenuItem className="">
                  <input
                    type="color"
                    onChange={(e) =>
                      changeColorPostIt(e.target.value, item.id, val.id)
                    }
                    value={
                      inputColorValue === "" ? item.color : inputColorValue
                    }
                    className="border-none rounded-full"
                  />
                </MenuItem>

                <MenuItem
                  className=""
                  onClick={() =>
                    changeColorPostIt(
                      "",
                      item.id,
                      val.id,
                      !item.colorText
                    ) as unknown as React.MouseEventHandler<HTMLButtonElement>
                  }
                >
                  <button className="text-2xl">
                    <AiOutlineFontColors />
                  </button>
                </MenuItem>
              </div>
            </Menu>
          </div>
        </CardActions>
      </Card>
      {isOpenModalEditTasks && test === item.id ? (
        <ModalEditTaksDinamica
          isOpenModalEditTasks={isOpenModalEditTasks}
          setIsOpenModalEditTasks={setIsOpenModalEditTasks}
          setNewTask={setNewTask}
          newTask={newTask}
          finishOrEditTasks={finishOrEditTasks}
          item={item}
          val={val}
        />
      ) : null}
    </Box>
  );
};

export const TarefasDinamicas = () => {
  const {
    modoTarefas,
    setModoTarefas,
    Filtro,
    isOpenModalTarefaDinamica,
    setIsOpenModalTarefaDinamica,
  } = useContext(GlobalContext);

  const { formatString } = useCustomHook();

  const [isOpenModalEditTasks, setIsOpenModalEditTasks] = useState(false);
  const [test, setTest] = useState<number | null>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [isOpenSnacker, setIsOpenSnacker] = useState(false);
  //prettier-ignore
  const [filterTasks, setFilterTasks] = React.useState<boolean | string>("null");
  const [tasksFiltered, setTasksFiltered] = React.useState([]);
  const [textFilter, setTextFilter] = React.useState("");

  useEffect(() => {
    //prettier-ignore
    const storedTextFilter = sessionStorage.getItem(`textFilter-${String(Filtro)}`);

    if (storedTextFilter) setTextFilter(storedTextFilter);
    else setTextFilter("");

    window.addEventListener("beforeunload", () => {
      for (const item of modoTarefas) {
        sessionStorage.removeItem(`textFilter-${String(item.id)}`);
        localStorage.removeItem(`filterTasks`);
      }
    });
  }, [Filtro]);

  const finishOrEditTasks = (
    id: number,
    idTypetask: number,
    action: string
  ) => {
    modoTarefas.map((val) => {
      if (val.id === idTypetask && val.tasks.length > 0) {
        if (action === "excluir") {
          const index = val.tasks.findIndex((item) => item.id === id);
          val.tasks.splice(index, 1);
          setModoTarefas([...modoTarefas]);
          localStorage.setItem(
            "colecaoTarefas",
            JSON.stringify([...modoTarefas])
          );
        } else if (action === "concluida") {
          val.tasks.map(
            (item) => item.id === id && (item.completed = !item.completed)
          );
          localStorage.setItem(
            "colecaoTarefas",
            JSON.stringify([...modoTarefas])
          );
          setModoTarefas([...modoTarefas]);
        } else if (action === "editar") {
          if (newTask.length === 0)
            setIsOpenSnacker(true), setAlert("Adicione uma tarefa");
          else {
            val.tasks.map(
              (item) => item.id === id && (item.nomeTarefa = newTask)
            );
            localStorage.setItem(
              "colecaoTarefas",
              JSON.stringify([...modoTarefas])
            );
            setModoTarefas([...modoTarefas]);
            setNewTask("");
            setIsOpenModalEditTasks(false);
          }
        }
      }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    modoTarefas.map((val) => {
      if (val.id === Filtro) {
        const activeIndex = val.tasks.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = val.tasks.findIndex((item) => item.id === over.id);
        const newTasks = arrayMove(val.tasks, activeIndex, overIndex);
        val.tasks.splice(overIndex, 0, val.tasks.splice(activeIndex, 1)[0]);
        return { ...val, tasks: newTasks };
      }
      return val;
    });
    setModoTarefas([...modoTarefas]);

    localStorage.setItem("colecaoTarefas", JSON.stringify(modoTarefas));
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filtrarTarefas = () => {
    modoTarefas.filter((item) => {
      if (item.id === Filtro) {
        if (filterTasks !== "null") {
          const tasksFiltered = item.tasks.filter(
            (item) => item.completed === (filterTasks as unknown as boolean)
          );
          setTasksFiltered(tasksFiltered as any);
        } else {
          setTasksFiltered(item.tasks as any);
        }
      }
    });
  };
  React.useEffect(() => {
    filtrarTarefas();
  }, [modoTarefas, filterTasks, Filtro]);

  const apagarTodasAsTarefasConcluidas = (params?: string) => {
    modoTarefas.map((val) => {
      if (val.id === Filtro) {
        const temTarefaconcluida = val.tasks.some((item) => item.completed);

        if (!temTarefaconcluida)
          setAlert("Sem tarefas concluidas"), setIsOpenSnacker(true);
        setModoTarefas((prev) =>
          prev.map((val) => {
            if (val.id === Filtro) {
              const updatedTasks =
                params === "desmarcar"
                  ? val.tasks.map((item) => ({ ...item, completed: false }))
                  : val.tasks.filter((item) => !item.completed);

              return { ...val, tasks: updatedTasks };
            }
            return val;
          })
        ),
          localStorage.setItem("colecaoTarefas", JSON.stringify(modoTarefas));
      }
    });
  };

  const tasksByTextFilter = tasksFiltered.filter((item: Tarefas) =>
    formatString(item.nomeTarefa).includes(formatString(textFilter))
  );

  const armazenarFiltro = (text: string) => {
    setTextFilter(text);
    //prettier-ignore
    sessionStorage.setItem(`textFilter-${String(Filtro)}`, text);
  };

  return (
    <>
      {isOpenModalTarefaDinamica && (
        <ModalTarefaDinamica
          isOpenModalTarefaDinamica={isOpenModalTarefaDinamica}
          setIsOpenModalTarefaDinamica={setIsOpenModalTarefaDinamica}
          setAlert={setAlert}
          setIsOpenSnacker={setIsOpenSnacker}
        />
      )}

      <Snackbar
        open={isOpenSnacker}
        autoHideDuration={3000}
        onClose={() => setIsOpenSnacker(false)}
      >
        <Alert variant="filled" severity="error">
          {"Marque pelo menos uma tarefa como concluída para usar este botão"}
        </Alert>
      </Snackbar>

      <section className="flex flex-col md:flex-row justify-center items-center gap-3 mb-2 md:mb-1">
        {/* Mobile */}
        <div className="lg:opacity-0">
          <Button
            variant="contained"
            className="bg-sky-500"
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableElevation
            onClick={handleClick}
            endIcon={<FaArrowDown />}
          >
            Mais opções
          </Button>

          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem disableRipple>
              <Button
                variant="contained"
                onClick={() => {
                  apagarTodasAsTarefasConcluidas();
                  handleClose(); // Fechar o menu após clicar
                }}
                className="bg-red-500 hover:bg-red-600 rounded-lg active:bg-red-600 w-72 p-2 md:w-96 md:text-[20px] font-bold"
              >
                Apagar tarefas concluidas
              </Button>
            </MenuItem>
            <MenuItem disableRipple>
              <Button
                variant="contained"
                onClick={() => {
                  apagarTodasAsTarefasConcluidas("desmarcar");
                  handleClose(); // Fechar o menu após clicar
                }}
                className="bg-green-500 hover:bg-green-600 rounded-lg active:bg-green-600 w-72 p-1 md:w-96 md:text-[20px] font-bold"
              >
                Desmarcar as tarefas
              </Button>
            </MenuItem>
            <MenuItem disableRipple>
              <SelectFilterTasks
                fecharMenuSuspenso={handleClose}
                filterTasks={filterTasks}
                setFilterTasks={setFilterTasks}
              />
            </MenuItem>

            <MenuItem>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Filtrar tarefas"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  outline: "none",
                  border: "none",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                      outline: "none",
                    },
                  },
                }}
                value={textFilter}
                onChange={(e) => armazenarFiltro(e.target.value)}
              />
            </MenuItem>
          </StyledMenu>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex w-full  justify-center items-center  flex-row gap-4 ">
          <MaisOpcoes
            apagarTodasAsTarefasConcluidas={apagarTodasAsTarefasConcluidas}
            fecharMenuSuspenso={handleClose}
            filterTasks={filterTasks}
            setFilterTasks={setFilterTasks}
            defaultValue={"string"}
            setTextFilter={setTextFilter}
            textFilter={textFilter}
            Filtro={Filtro}
          />
        </div>
      </section>

      <div
        className="h-[calc(100dvh-15rem)]  overflow-auto scrollbar-thin 
          scrollbar-thumb-sky-500 scrollbar-track-sky-300   scrollbar-thumb-rounded-full 
          scrollbar-track-rounded-full "
      >
        {modoTarefas.map((val: ModoTarefa) => (
          <Fragment key={val.id}>
            {Filtro === val.id && (
              <section>
                {tasksFiltered.length > 0 ? (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={tasksFiltered.map((item: any) => item.id)}
                    >
                      <section
                        className={`
                           md:grid md:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]
                           flex flex-col justify-center items-center gap-3
                          `}
                      >
                        {tasksByTextFilter.length > 0 ? (
                          tasksByTextFilter.map((item: any) => (
                            <TaskCard
                              key={item.id}
                              item={item}
                              finishOrEditTasks={finishOrEditTasks}
                              setNewTask={setNewTask}
                              setIsOpenModalEditTasks={setIsOpenModalEditTasks}
                              setTest={setTest}
                              val={val}
                              id={item.id}
                              isOpenModalEditTasks={isOpenModalEditTasks}
                              test={test}
                              newTask={newTask}
                              setModoTarefas={setModoTarefas}
                              modoTarefas={modoTarefas}
                            />
                          ))
                        ) : (
                          <h3
                            className="text-red-500 text-2xl mt-3 font-bold m-[auto] text-center md:mx-auto 
                        h-[calc(100vh-30rem)] w-[calc(100dvw-10rem)] "
                          >
                            Nenhuma tarefa encontrada.
                          </h3>
                        )}
                      </section>
                    </SortableContext>
                  </DndContext>
                ) : (
                  <div className="md:flex md:justify-center">
                    <p className="text-red-500 md:text-2xl font-bold text-start text-[22px] mt-3">
                      {filterTasks === true
                        ? " Nenhuma tarefa foi marcada como concluída 😞"
                        : " Não existem tarefas salvas 😞"}
                    </p>
                  </div>
                )}
              </section>
            )}
          </Fragment>
        ))}
      </div>

      <section className="w-[100%] flex justify-end mt-3 ">
        <Fab
          className={`bg-sky-500 hover:bg-sky-600  text-white   absolute bottom-3 right-10`}
          onClick={() => setIsOpenModalTarefaDinamica(true)}
        >
          <FaPlus />
        </Fab>
      </section>
    </>
  );
};

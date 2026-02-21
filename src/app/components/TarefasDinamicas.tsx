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
import { motion, AnimatePresence } from "framer-motion";
import Fab from "@mui/material/Fab";
import { Tasks as Tarefas } from "../components/context/ts/types";
import TextField from "@mui/material/TextField";
import useCustomHook from "../hook/useCustomHook";
import { useRouter } from "next/navigation";
import ModalReutilizavel from "@/app/components/ModalReutilizavel";
import { IoCopy } from "react-icons/io5";

export type Tasks = {
  id: number;
  nomeTarefa: string;
  completed: boolean;
  color: string;
  colorText: boolean;
  link?: string;
  nomeLink?: string;
  linkColor?: string;
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
  keyWords: string[];
  styleCard: { color: string; colorText: boolean };
  setStyleCard: Dispatch<SetStateAction<{ color: string; colorText: boolean }>>;
}

type KeyWords = {
  id: number;
  keyword: Set<string>;
};

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
  keyWords,
  styleCard,
  setStyleCard,
}: TaskCardProps) => {
  const TarefaConcluida = item.completed;

  const handleCopyTaskName = async () => {
    const text = item.nomeTarefa ?? "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      alert(
        "Não foi possível copiar automaticamente. Copie manualmente o texto.",
      );
    }
  };

  //prettier-ignore
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const textInputModalIndexarLink = React.useRef("");
  const textInputModalNomeLink = React.useRef("");
  const textInputModalLinkColor = React.useRef("");

  const inputColorRef = React.useRef("");
  const inputColorValue = inputColorRef.current;

  const [isOpenModalReutilizavel, setisOpenModalReutilizavel] = useState(false);

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
    colorText?: boolean,
  ) => {
    modoTarefas.map((val) => {
      if (val.id === grupTasksId)
        val.tasks.map(
          (item) =>
            item.id === postId &&
            (e === ""
              ? (item.colorText = colorText as any)
              : ((item.color = e), (inputColorRef.current = e))),
        );
      setModoTarefas([...modoTarefas]);
    });

    localStorage.setItem("colecaoTarefas", JSON.stringify([...modoTarefas]));
  };

  const [anchorEls, setAnchorEls] = useState<{
    [key: number]: HTMLElement | null;
  }>({});

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const indexarLinkTarefaSelecionada = () => {
    if (textInputModalIndexarLink.current === "") return;
    item.link = textInputModalIndexarLink.current;
    item.nomeLink = textInputModalNomeLink.current || textInputModalIndexarLink.current;
    item.linkColor = textInputModalLinkColor.current;
    setModoTarefas([...modoTarefas]);
    setisOpenModalReutilizavel(false);
    localStorage.setItem("colecaoTarefas", JSON.stringify([...modoTarefas]));
  };

  return (
    <>
      <ModalReutilizavel
        isOpenModal={isOpenModalReutilizavel}
        setIsOpenModal={setisOpenModalReutilizavel}
        content="Childreen"
      >
        <section className="flex flex-col gap-4 p-4">
          <h3 className="text-2xl">Indexar link na tarefa selecionada</h3>
          <TextField
            id="outlined-basic"
            label="Nome do Link"
            variant="outlined"
            autoFocus={true}
            defaultValue={item.nomeLink}
            onChange={(e) => (textInputModalNomeLink.current = e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="URL do Link"
            variant="outlined"
            placeholder="Insira um link"
            defaultValue={item.link}
            onChange={(e) =>
              (textInputModalIndexarLink.current = e.target.value)
            }
          />
          <div className="flex flex-row items-center gap-2">
            <Typography>Cor do Link:</Typography>
            <input
              type="color"
              defaultValue={item.linkColor || "#1d4ed8"}
              onChange={(e) => (textInputModalLinkColor.current = e.target.value)}
              className="cursor-pointer w-10 h-10 rounded-full cursor-pointer border-none p-0 overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full"
            />
          </div>

          <div className="flex flex-row gap-4 w-full justify-end">
            <Button
              variant="contained"
              onClick={() => setisOpenModalReutilizavel(false)}
              color="error"
            >
              Fechar
            </Button>

            <Button variant="contained" onClick={indexarLinkTarefaSelecionada}>
              Indexar
            </Button>
          </div>
        </section>
      </ModalReutilizavel>
      <Box sx={{ transform: "scale(0.9)" }}>
        <Card
          className={`md:w-[25rem] w-80 h-60 p-5 text-2xl rounded-[20px]`}
          ref={setNodeRef}
          style={style}
        >
          <div className="flex flex-row justify-between">
            <Typography
              className={`text-3xl md:text-4xl ${
                TarefaConcluida
                  ? "line-through text-green-500"
                  : `${item.colorText}`
              } w-full break-words h-36 overflow-auto font-bangers
            `}
              color="text.secondary"
              gutterBottom
              style={styleP}
            >
              {item.nomeTarefa}

              {item.link && (
                <a
                  href={item.link}
                  className={`hover:underline ml-5`}
                  style={{ color: item.linkColor ? item.linkColor : "#1d4ed8" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.nomeLink}
                </a>
              )}
            </Typography>
          </div>

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
                    (setAnchorEls((prev) => ({
                      ...prev,
                      [id]: event.currentTarget,
                    })),
                      setSelectedId(id));
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
                  <Button
                    className={`
                    w-full p-2 rounded-lg bg-sky-600 text-white text-center cursor-pointer hover:bg-sky-700 relative
                    `}
                  >
                    <h3>Mudar cor do post it</h3>

                    <label
                      htmlFor="inputColor"
                      className="cursor-pointer w-full  h-full p-3 absolute"
                    />
                  </Button>
                  <input
                    id="inputColor"
                    type="color"
                    onChange={(e) =>
                      changeColorPostIt(e.target.value, item.id, val.id)
                    }
                    value={
                      inputColorValue === "" ? item.color : inputColorValue
                    }
                    className="w-0 h-0 absolute opacity-0"
                  />

                  <Button
                    className={`w-full p-2 rounded-lg bg-green-600 text-white text-center cursor-pointer hover:bg-green-700`}
                    onClick={() =>
                      changeColorPostIt(
                        "",
                        item.id,
                        val.id,
                        !item.colorText,
                      ) as unknown as React.MouseEventHandler<HTMLButtonElement>
                    }
                  >
                    Mudar cor do texto
                  </Button>

                  <Button
                    className={`w-full p-2 rounded-lg bg-indigo-800 text-white text-center cursor-pointer hover:bg-indigo-900`}
                    onClick={() => setisOpenModalReutilizavel(true)}
                  >
                    Indexar o link na tarefa
                  </Button>

                  <Button
                    className={`w-full p-2 rounded-lg bg-red-600 text-white text-center cursor-pointer hover:bg-red-700`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopyTaskName();
                    }}
                  >
                    Copiar o texto da tarefa
                  </Button>
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
            keyWords={keyWords}
            styleCard={styleCard}
            setStyleCard={setStyleCard}
          />
        ) : null}
      </Box>
    </>
  );
};

export const TarefasDinamicas = () => {
  const router = useRouter();

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
  const [tasksFiltered, setTasksFiltered] = React.useState<Tasks[]>([]);
  const [textFilter, setTextFilter] = React.useState("");
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [styleCard, setStyleCard] = useState({
    color: "#fef08a",
    colorText: true,
  });
  //prettier-ignore
  const [isShowButtonsAfterFinishTasks, setIsShowButtonsAfterFinishTasks] = useState(false);

  const prevTaskIdsRef = React.useRef<Set<number> | null>(null);
  const addedTaskTimeoutRef = React.useRef<number | null>(null);
  const [lastAddedTaskId, setLastAddedTaskId] = useState<number | null>(null);

  const finishOrEditTasks = (
    id: number,
    idTypetask: number,
    action: string,
  ) => {
    modoTarefas.map((val) => {
      if (val.id === idTypetask && val.tasks.length > 0) {
        if (action === "excluir") {
          const index = val.tasks.findIndex((item) => item.id === id);
          val.tasks.splice(index, 1);
          setModoTarefas([...modoTarefas]);
          localStorage.setItem(
            "colecaoTarefas",
            JSON.stringify([...modoTarefas]),
          );
          ShowButtonsAfterFinishTasks();
        } else if (action === "concluida") {
          val.tasks.map(
            (item) => item.id === id && (item.completed = !item.completed),
          );
          localStorage.setItem(
            "colecaoTarefas",
            JSON.stringify([...modoTarefas]),
          );
          setModoTarefas([...modoTarefas]);
          ShowButtonsAfterFinishTasks();
        } else if (action === "editar") {
          if (newTask.length === 0)
            (setIsOpenSnacker(true), setAlert("Adicione uma tarefa"));
          else {
            val.tasks.map((item) => {
              if (item.id === id) {
                item.nomeTarefa = newTask;
                item.color = styleCard.color;
                item.colorText = styleCard.colorText;
              }
            });
            localStorage.setItem(
              "colecaoTarefas",
              JSON.stringify([...modoTarefas]),
            );
            setModoTarefas([...modoTarefas]);
            setNewTask("");
            setIsOpenModalEditTasks(false);
            setStyleCard({ color: "#fef08a", colorText: true });
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
          (item) => item.id === active.id,
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
    }),
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
            (item) => item.completed === (filterTasks as unknown as boolean),
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

        if (!temTarefaconcluida) {
          setAlert("Sem tarefas concluidas");
          setIsOpenSnacker(true);
          return;
        }

        (setModoTarefas((prev) =>
          prev.map((val) => {
            if (val.id === Filtro) {
              const updatedTasks =
                params === "desmarcar"
                  ? val.tasks.map((item) => ({ ...item, completed: false }))
                  : val.tasks.filter((item) => !item.completed);

              return { ...val, tasks: updatedTasks };
            }
            return val;
          }),
        ),
          localStorage.setItem("colecaoTarefas", JSON.stringify(modoTarefas)));
        setIsShowButtonsAfterFinishTasks(false);
      }
    });
  };

  const tasksByTextFilter = React.useMemo(() => {
    //prettier-ignore
    return tasksFiltered.filter((item: Tarefas) => formatString(item.nomeTarefa).includes(formatString(textFilter)));
  }, [tasksFiltered, textFilter, tasksFiltered, modoTarefas]);

  React.useEffect(() => {
    //prettier-ignore
    const tasksCurrentTab = modoTarefas.find((item) => item.id === Filtro)?.tasks ?? [];

    const currentIds: number[] = tasksCurrentTab.map((t) => t.id);

    const prev = prevTaskIdsRef.current;
    if (!prev) {
      prevTaskIdsRef.current = new Set<number>(currentIds);
      return;
    }

    let addedId: number | null = null;
    for (const id of currentIds) {
      if (!prev.has(id)) addedId = id;
    }

    prevTaskIdsRef.current = new Set<number>(currentIds);

    if (addedId !== null) {
      setLastAddedTaskId(addedId);

      if (addedTaskTimeoutRef.current !== null) {
        window.clearTimeout(addedTaskTimeoutRef.current);
      }

      addedTaskTimeoutRef.current = window.setTimeout(() => {
        setLastAddedTaskId(null);
        addedTaskTimeoutRef.current = null;
      }, 900);
    }
  }, [modoTarefas, Filtro]);

  React.useEffect(() => {
    return () => {
      if (addedTaskTimeoutRef.current !== null) {
        window.clearTimeout(addedTaskTimeoutRef.current);
      }
    };
  }, []);

  //console.log(isShowMessage.current);

  const ShowButtonsAfterFinishTasks = () => {
    //prettier-ignore
    setIsShowButtonsAfterFinishTasks(tasksByTextFilter.every((item: Tarefas) => item.completed));
  };

  const armazenarFiltro = (text: string) => {
    setTextFilter(text);
    //prettier-ignore
    sessionStorage.setItem(`textFilter-${String(Filtro)}`, text);
  };

  useEffect(() => {
    //prettier-ignore
    const validarSeUsuarioTemTarefas = (modoTarefas.find((item) => item.id === Filtro)?.tasks.length ?? 0) > 0;

    if (validarSeUsuarioTemTarefas) {
      //prettier-ignore
      const listSelected = modoTarefas.find((item) => item.id === Filtro);

      //prettier-ignore
      const keyWords = listSelected?.tasks.map((item) => item.nomeTarefa.match(/\([^)]*\)/)?.[0])

      if ((keyWords ?? []).length > 0) {
        //prettier-ignore
        const nameTasks = (keyWords ?? []).filter(Boolean);

        const formatWordKeys = nameTasks.map((item) => item?.toUpperCase());

        const removeDuplicate = new Set(formatWordKeys);

        const finalKeys: string[] = [];
        
        Array.from(removeDuplicate).forEach((key) => {if (key) !key.includes("-") && finalKeys.push(key)});

        setKeyWords(finalKeys);
      } else setKeyWords([]);
    } else setKeyWords([]);
  }, [Filtro, modoTarefas]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "d" || e.key === "D") && e.shiftKey) {
        apagarTodasAsTarefasConcluidas();
        if (filterTasks === true) setFilterTasks(false);
      }

      //prettier-ignore
      if ((e.key === "f" || e.key === "F") && e.shiftKey) {
        apagarTodasAsTarefasConcluidas("desmarcar");
       if(filterTasks === true) setFilterTasks(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modoTarefas, tasksByTextFilter, tasksFiltered]);

  React.useEffect(() => {
    if (tasksByTextFilter.length > 0) ShowButtonsAfterFinishTasks();

    // if (
    //   filterTasks != "Tarefas não concluídas" &&
    //   tasksByTextFilter.length === 0
    // ) {
    //   setIsShowButtonsAfterFinishTasks(false);
    // }
  }, [tasksByTextFilter]);

  return (
    <>
      {isOpenModalTarefaDinamica && (
        <ModalTarefaDinamica
          isOpenModalTarefaDinamica={isOpenModalTarefaDinamica}
          setIsOpenModalTarefaDinamica={setIsOpenModalTarefaDinamica}
          setAlert={setAlert}
          setIsOpenSnacker={setIsOpenSnacker}
          keyWords={keyWords}
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
                type="search"
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
      <AnimatePresence mode="wait">
        <motion.div
          key={`${Filtro}-${filterTasks}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.9 }}
        >
          <div
            className="h-[calc(100dvh-15rem)]  overflow-auto scrollbar-thin 
          scrollbar-thumb-sky-500 scrollbar-track-sky-300   scrollbar-thumb-rounded-full 
          scrollbar-track-rounded-full "
          >
            {modoTarefas.map((val: ModoTarefa) => (
              <Fragment key={val.id}>
                {Filtro === val.id && (
                  <section>
                    {filterTasks !== true && isShowButtonsAfterFinishTasks ? (
                      <div className="flex flex-col md:flex-row justify-center items-center gap-3 flex-wrap mt-5 md:mt-0 ">
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
                        <Button
                          variant="contained"
                          onClick={() => {
                            apagarTodasAsTarefasConcluidas("desmarcar");
                            handleClose(); // Fechar o menu após clicar
                          }}
                          className="bg-green-500 hover:bg-green-600 rounded-lg active:bg-green-600 w-72 p-2 md:w-96 md:text-[20px] font-bold"
                        >
                          Desmarcar as tarefas
                        </Button>

                        <Button
                          variant="contained"
                          onClick={() => setFilterTasks(true)}
                          className="bg-cyan-600 hover:bg-cyan-700 rounded-lg active:bg-cyan-700 w-72 p-2 md:w-96 md:text-[20px] font-bold"
                        >
                          Mostrar os post it
                        </Button>
                      </div>
                    ) : tasksFiltered.length > 0 ? (
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
                              <AnimatePresence initial={false}>
                                {tasksByTextFilter.map((item: any) => (
                                  <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98, y: 8 }}
                                    animate={
                                      item.id === lastAddedTaskId
                                        ? {
                                            opacity: 1,
                                            scale: [1, 1.03, 1],
                                            y: [0, -2, 0],
                                          }
                                        : {
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            boxShadow:
                                              "0px 0px 0px rgba(0,0,0,0)",
                                          }
                                    }
                                    exit={{ opacity: 0, scale: 0.98, y: -8 }}
                                    transition={{
                                      duration:
                                        item.id === lastAddedTaskId
                                          ? 0.45
                                          : 0.18,
                                    }}
                                  >
                                    <TaskCard
                                      item={item}
                                      finishOrEditTasks={finishOrEditTasks}
                                      setNewTask={setNewTask}
                                      setIsOpenModalEditTasks={
                                        setIsOpenModalEditTasks
                                      }
                                      setTest={setTest}
                                      val={val}
                                      id={item.id}
                                      isOpenModalEditTasks={
                                        isOpenModalEditTasks
                                      }
                                      test={test}
                                      newTask={newTask}
                                      setModoTarefas={setModoTarefas}
                                      modoTarefas={modoTarefas}
                                      keyWords={keyWords}
                                      styleCard={styleCard}
                                      setStyleCard={setStyleCard}
                                    />
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            ) : (
                              <AnimatePresence>
                                <motion.h3
                                  key="no-tasks-message"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-red-500 text-2xl mt-3 font-bold m-[auto] text-center md:mx-auto 
                        h-[calc(100vh-30rem)] w-[calc(100dvw-10rem)] "
                                >
                                  Nenhuma tarefa encontrada.
                                </motion.h3>
                              </AnimatePresence>
                            )}
                          </section>
                        </SortableContext>
                      </DndContext>
                    ) : (
                      <motion.h3
                        key="no-tasks-message"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-red-500 text-2xl mt-3 font-bold m-[auto] text-center md:mx-auto 
            h-[calc(100vh-30rem)] w-[calc(100dvw-10rem)] "
                      >
                        <div className="md:flex md:justify-center">
                          <p className="text-red-500 md:text-2xl font-bold text-start text-[22px] mt-3">
                            {filterTasks === true
                              ? " Nenhuma tarefa foi marcada como concluída 😞"
                              : " Não existem tarefas salvas 😞"}
                          </p>
                        </div>
                      </motion.h3>
                    )}
                  </section>
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="absolute bottom-3 right-10"
      >
        <Fab
          className={`bg-sky-500 hover:bg-sky-600  text-white`}
          onClick={() => setIsOpenModalTarefaDinamica(true)}
        >
          <FaPlus />
        </Fab>
      </motion.div>
    </>
  );
};

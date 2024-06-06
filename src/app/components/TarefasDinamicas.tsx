"use client";
import React, {
  useContext,
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
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

export type Tasks = {
  id: number;
  nomeTarefa: string;
  completed: boolean;
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
}: TaskCardProps) => {
  const TarefaConcluida = item.completed;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box component="span" sx={{ mx: "2px", transform: "scale(0.9)" }}>
      <Card
        className="md:w-[25rem] w-80 h-60 p-5 text-2xl bg-[#fef08a]"
        ref={setNodeRef}
        style={style}
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <Typography
            className={`text-3xl md:text-4xl ${
              TarefaConcluida ? "line-through text-green-500" : "text-black"
            } w-full break-words h-36 overflow-auto font-bangers`}
            color="text.secondary"
            gutterBottom
          >
            {item.nomeTarefa}
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
          <Tooltip title="Marca tarefa com concluída">
            <Checkbox
              className="hover:bg-gray-300 p-3 hover:rounded-full text-black"
              defaultChecked={TarefaConcluida}
              onClick={() => finishOrEditTasks(item.id, val.id, "concluida")}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
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

  const [isOpenModalEditTasks, setIsOpenModalEditTasks] = useState(false);
  const [test, setTest] = useState<number | null>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [isOpenSnacker, setIsOpenSnacker] = useState(false);

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

  const apagarTodasAsTarefasConcluidas = () => {
    modoTarefas.map((val) => {
      if (val.id === Filtro) {
        const temTarefaconcluida = val.tasks.some((item) => item.completed);

        if (!temTarefaconcluida)
          setAlert("Sem tarefas concluidas"), setIsOpenSnacker(true);

        setModoTarefas((prev) =>
          prev.map((val) => {
            const newTasks = val.tasks.filter((item) => !item.completed);
            return { ...val, tasks: newTasks };
          })
        ),
          localStorage.setItem("colecaoTarefas", JSON.stringify(modoTarefas));
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
        <Button
          variant="contained"
          onClick={apagarTodasAsTarefasConcluidas}
          className="bg-red-500 hover:bg-red-600 rounded-lg active:bg-red-600 w-72 p-2 md:w-96 md:text-[20px] font-bold"
        >
          Apagar tarefas concluidas
        </Button>
      </section>

      {modoTarefas.map((val: ModoTarefa) => (
        <Fragment key={val.id}>
          {Filtro === val.id && (
            <section>
              {val.tasks.length > 0 ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={val.tasks.map((item) => item.id)}>
                    <section className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 overflow-auto h-[16rem] md:h-[24rem] ml-5">
                      {val.tasks.map((item) => (
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
                        />
                      ))}
                    </section>
                  </SortableContext>
                </DndContext>
              ) : (
                <div className="w-[80rem] md:flex md:justify-center">
                  <p className="text-red-500 md:text-2xl font-bold text-start text-[22px] m-3">
                    Não existem tarefas salvas 😞
                  </p>
                </div>
              )}
            </section>
          )}
        </Fragment>
      ))}
    </>
  );
};

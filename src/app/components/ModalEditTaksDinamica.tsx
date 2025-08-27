import React from "react";
import { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { style } from ".././style/style";
import { GlobalContext } from "./context/Store";
type T = {
  isOpenModalEditTasks: boolean;
  setIsOpenModalEditTasks: Dispatch<SetStateAction<boolean>>;
  newTask: string;
  setNewTask: Dispatch<SetStateAction<string>>;
  finishOrEditTasks: (id: number, idTypetask: number, teste: string) => void;
  item: any;
  val: any;
  keyWords: string[];
  styleCard: {
    color: string;
    colorText: boolean;
  };
  setStyleCard: Dispatch<
    SetStateAction<{
      color: string;
      colorText: boolean;
    }>
  >;
};

export const ModalEditTaksDinamica = ({
  isOpenModalEditTasks,
  setIsOpenModalEditTasks,
  newTask,
  setNewTask,
  finishOrEditTasks,
  item,
  val,
  keyWords,
  styleCard,
  setStyleCard,
}: T) => {
  //prettier-ignore
  const {modoTarefas, Filtro } = React.useContext(GlobalContext);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const cardInformation = (val: string) => {
    //prettier-ignore
    return modoTarefas.find((item) => item.id === Filtro)?.tasks.find((item) => item.nomeTarefa.includes(`${val}`));
  };

  const keyWordSelected = (item: string) => {
    const validation = newTask.match(/\([^)]*\)/);
    const cardInformationConst = cardInformation(item);
    //prettier-ignore
    const removerPalavraChaveAntiga = newTask.split(" ").filter((item, index) => index !== 0).join(" ");
    //prettier-ignore
    setNewTask(`${item} ${validation? removerPalavraChaveAntiga : newTask}`);
    setStyleCard({
      color: cardInformationConst?.color || "#fef08a",
      colorText: cardInformationConst?.colorText ?? false,
    });

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <Modal
      open={isOpenModalEditTasks}
      onClose={() => setIsOpenModalEditTasks(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded-xl w-[22rem] md:w-96">
        <div className="flex flex-col  justify-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar tarefa
          </Typography>

          <div>
            <div className="flex flex-row gap-1 overflow-x-auto w-full mb-4">
              {keyWords.length > 0 &&
                keyWords.map((val) => {
                  const styleButtons = cardInformation(val);

                  return (
                    <Button
                      sx={{
                        backgroundColor: styleButtons?.color,
                        color: styleButtons?.colorText ? "black" : "white",
                      }}
                      key={val}
                      variant="contained"
                      className="mt-2 mr-2"
                      //prettier-ignore
                      onClick={() => {keyWordSelected(val)}}
                    >
                      {val.length > 8 ? `${val.slice(0, 7)}...` : val}
                    </Button>
                  );
                })}
            </div>
          </div>

          <TextField
            inputRef={inputRef}
            autoFocus
            value={newTask}
            id="outlined-basic"
            label="Escreva o nome para editar a sua tarefa"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTask(e.target.value)
            }
            onKeyPress={(e: React.KeyboardEvent) =>
              e.key === "Enter" && finishOrEditTasks(item.id, val.id, "editar")
            }
          />
        </div>

        <div className="mt-3 flex flex-row gap-3 justify-end">
          <Button
            color="error"
            variant="contained"
            className="bg-red-500 hover:bg-red-700 rounded-lg"
            onClick={() => setIsOpenModalEditTasks(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={() => finishOrEditTasks(item.id, val.id, "editar")}
            className="bg-sky-500 hover:bg-sky-700 rounded-lg"
          >
            Salvar tarefa
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

import React from "react";
import { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { style } from ".././style/style";

type T = {
  isOpenModalEditTasks: boolean;
  setIsOpenModalEditTasks: Dispatch<SetStateAction<boolean>>;
  newTask: string;
  setNewTask: Dispatch<SetStateAction<string>>;
  finishOrEditTasks: (id: number, idTypetask: number, teste: string) => void;
  item: any;
  val: any;
};

export const ModalEditTaksDinamica = ({
  isOpenModalEditTasks,
  setIsOpenModalEditTasks,
  newTask,
  setNewTask,
  finishOrEditTasks,
  item,
  val,
}: T) => {
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

          <TextField
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

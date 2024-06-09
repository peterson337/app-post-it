"use client";
import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { style } from ".././style/style";
import { Dispatch, SetStateAction } from "react";
import { GlobalContext } from "./context/Store";

type T = {
  isOpenModalTarefaDinamica: boolean;
  setIsOpenModalTarefaDinamica: Dispatch<SetStateAction<boolean>>;
  setIsOpenSnacker: Dispatch<SetStateAction<boolean>>;
  setAlert: Dispatch<SetStateAction<string>>;
};
export const ModalTarefaDinamica = ({
  isOpenModalTarefaDinamica,
  setIsOpenModalTarefaDinamica,
  setIsOpenSnacker,
  setAlert,
}: T) => {
  const [taks, setTaks] = useState("");

  const { setModoTarefas, modoTarefas, Filtro } = useContext(GlobalContext);

  const salvarTarefa = () => {
    if (taks === "") {
      setIsOpenSnacker(true);
      setAlert("Sem tarefas concluidas");
      return;
    } else {
      const obj = {
        nomeTarefa: taks,
        id: new Date().getTime(),
        completed: false,
        color: "#fef08a",
        colorText: true,
      };
      modoTarefas.map((val) => val.id === Filtro && val.tasks.push(obj));
      setModoTarefas([...modoTarefas]);
      setIsOpenModalTarefaDinamica(false);
      setTaks("");
      localStorage.setItem("colecaoTarefas", JSON.stringify([...modoTarefas]));
    }
  };

  return (
    <Modal
      open={isOpenModalTarefaDinamica}
      onClose={() => setIsOpenModalTarefaDinamica(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded-xl w-[22rem] md:w-96">
        <div className="flex flex-col  justify-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tarefas
          </Typography>

          <TextField
            autoFocus
            value={taks}
            id="outlined-basic"
            label="Escreva o nome da tarefa"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTaks(e.target.value)
            }
            onKeyPress={(e: React.KeyboardEvent) =>
              e.key === "Enter" && salvarTarefa()
            }
          />
        </div>

        <div className="mt-3 flex flex-row gap-3 justify-end">
          <Button
            className="bg-red-500 hover:bg-red-700 rounded-lg"
            variant="contained"
            onClick={() => setIsOpenModalTarefaDinamica(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            autoFocus
            onClick={salvarTarefa}
            className="bg-sky-500 hover:bg-sky-700 rounded-lg"
          >
            Salvar tarefa
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

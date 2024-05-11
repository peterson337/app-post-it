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
};
export const ModalTarefaDinamica = ({
  isOpenModalTarefaDinamica,
  setIsOpenModalTarefaDinamica,
}: T) => {
  const [taks, setTaks] = useState("");

  const { setModoTarefas, modoTarefas, Filtro } = useContext(GlobalContext);

  const salvarTarefa = () => {
    const obj = {
      nomeTarefa: taks,
      id: Math.floor(Math.random() * 1000),
    };
    modoTarefas.map((item) => {
      if (item.id === Filtro) {
        item.tasks.push(obj);
        setModoTarefas([...modoTarefas]);
      }
    });
  };

  return (
    <Modal
      open={isOpenModalTarefaDinamica}
      onClose={() => setIsOpenModalTarefaDinamica(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Tarefas
        </Typography>

        <TextField
          value={taks}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => setTaks(e.target.value)}
        />

        <div>
          <Button
            color="error"
            variant="contained"
            onClick={() => setIsOpenModalTarefaDinamica(false)}
          >
            Cancelar
          </Button>

          <Button variant="contained" onClick={salvarTarefa}>
            Salvar tarefa
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

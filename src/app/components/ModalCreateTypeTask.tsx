"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { GlobalContext } from "./context/Store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type T = {
  setIsOpenModalCreateTypeTask: Dispatch<SetStateAction<boolean>>;
  iSOpenModalCreateTypeTask: boolean;
};

export const ModalCreateTypeTask = ({
  setIsOpenModalCreateTypeTask,
  iSOpenModalCreateTypeTask,
}: T) => {
  const { setModoTarefas, modoTarefas } = useContext(GlobalContext);

  const [nomeDoNovoTipoDeTarefa, setNomeDoNovoTipoDeTarefa] = useState("");

  const salvarNovoTipoDeTarefa = () => {
    const obj = {
      nomeGrupoTarefa: nomeDoNovoTipoDeTarefa,
      id: new Date().getTime(),
      tasks: [],
    };

    setModoTarefas([...modoTarefas, obj]);
  };

  return (
    <Modal
      open={iSOpenModalCreateTypeTask}
      onClose={() => setIsOpenModalCreateTypeTask(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Criar um novo tipo de tarefa
        </Typography>

        <TextField
          value={nomeDoNovoTipoDeTarefa}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => setNomeDoNovoTipoDeTarefa(e.target.value)}
        />

        <div>
          <Button
            color="error"
            variant="contained"
            onClick={() => setIsOpenModalCreateTypeTask(false)}
          >
            Cancelar
          </Button>

          <Button variant="contained" onClick={salvarNovoTipoDeTarefa}>
            Criar novo tipo de tarefa
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

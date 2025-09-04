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
  keyWords: string[];
};
export const ModalTarefaDinamica = ({
  isOpenModalTarefaDinamica,
  setIsOpenModalTarefaDinamica,
  setIsOpenSnacker,
  setAlert,
  keyWords,
}: T) => {
  const [taks, setTaks] = useState("");

  const { setModoTarefas, modoTarefas, Filtro } = useContext(GlobalContext);

  const first = React.useRef<HTMLInputElement>(null);
  const cardColor = React.useRef({
    color: null as string | null,
    colorText: null as boolean | null,
  });

  React.useEffect(() => {
    setTimeout(() => first.current?.focus(), 0);
  }, []);

  const salvarTarefa = () => {
    if (taks === "") {
      return;
    } else {
      const obj = {
        nomeTarefa: taks,
        id: new Date().getTime(),
        completed: false,
        color: cardColor.current.color || "#fef08a",
        colorText: cardColor.current.colorText ?? true,
      };
      modoTarefas.map((val) => val.id === Filtro && val.tasks.push(obj));
      setModoTarefas([...modoTarefas]);
      setIsOpenModalTarefaDinamica(false);
      setTaks("");
      localStorage.setItem("colecaoTarefas", JSON.stringify([...modoTarefas]));
    }

    cardColor.current = {
      color: null,
      colorText: null,
    };
  };

  const keyWordSelected = (val: string) => {
    if (!taks.includes(val)) {
      const text = `${val} ${taks}`;
      setTaks(taks !== "" ? text : `${val} `);
    } else {
      //prettier-ignore
      setTaks(taks.split(" ").filter((item) => item !== val).join(" "));
    }

    first.current?.focus();
    const card = cardInformation(val);

    cardColor.current = {
      color: card?.color ?? "#fef08a",
      colorText: card?.colorText ?? true,
    };
  };

  const cardInformation = (val: string) => {
    return modoTarefas
      .find((item) => item.id === Filtro)
      ?.tasks.find((item) =>
        item.nomeTarefa.toUpperCase().includes(`${val.toUpperCase()}`)
      );
  };

  return (
    <Modal
      open={isOpenModalTarefaDinamica}
      onClose={() => setIsOpenModalTarefaDinamica(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded-xl w-[22rem] md:w-96 outline-none">
        <div className="flex flex-col  justify-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Criar Tarefas
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
            inputRef={first}
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

import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { GlobalContext } from "./context/Store";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import useCustomHook from "../hook/useCustomHook";

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
};

import TextField from "@mui/material/TextField";

export default function Modal(props: Props) {
  const { isOpenModal, setIsOpenModal, content } = props;
  const { modoTarefas, setFiltro, tabs } = React.useContext(GlobalContext);
  const { addedTabSelected } = useCustomHook();
  const textInputRef = React.useRef("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [isOpenModal]);

  const changeTab = (e: KeyboardEvent) => {
    //prettier-ignore
    if (content === "Add Tabs" && e.key === "Enter" && e.ctrlKey) addTabs();
  };

  React.useEffect(() => {
    window.addEventListener("keydown", changeTab);

    return () => window.removeEventListener("keydown", changeTab);
  }, [content, modoTarefas, tabs]);

  const atalhoDeTeclado = [
    {
      instrução: "Criar ou atualizar o backup selecionado",
      atalho: "Alt + S",
    },

    {
      instrução: "Criar uma nova lista de tarefa",
      atalho: "Alt + A",
    },

    {
      instrução: "Criar uma nova tarefa",
      atalho: "Ctrl + M",
    },

    {
      instrução: "Criar uma nova lista de compra",
      atalho: "Ctrl + ,",
    },

    {
      instrução: "Números para trocar de aba",
      atalho: "Ctrl + 0 até 9",
    },

    {
      instrução: "Excluir aba selecionada",
      atalho: "Alt + W",
    },

    {
      instrução: "Abrir modal de adicionar aba",
      atalho: "Alt + =",
    },

    {
      instrução: "Adicionar nova aba",
      atalho: "ctrl + enter",
    },

    {
      instrução: "Apagar todas as tarefas concluídas",
      atalho: "shift + d",
    },

    {
      instrução: "Desmarcar todas as tarefas concluídas",
      atalho: "shift + f",
    },
  ];

  const options = modoTarefas.map((item) => item.nomeGrupoTarefa);

  const addTabs = () => {
    //prettier-ignore
    const tab = modoTarefas.find((item) => item.nomeGrupoTarefa === textInputRef.current);

    if (tab) {
      const tabSelected = addedTabSelected(tab);
      setFiltro(tab.id);

      if (tabSelected) setIsOpenModal(false);
      else alert("Esta aba ja foi adicionada.");
    } else {
      alert("Esta lista de tarefas não existe.");
    }
  };

  return (
    <Dialog onClose={() => setIsOpenModal(false)} open={isOpenModal}>
      {content === "Add Tabs" ? (
        <section className="flex flex-col justify-center items-center">
          <DialogTitle className="text-center">Adicionar abas</DialogTitle>

          <Autocomplete
            options={options}
            sx={{
              width: {
                xs: "80%",
                sm: "50%",
                md: "70%",
              },
            }}
            onChange={(_event, value) => (textInputRef.current = value || "")}
            renderInput={(params) => (
              <TextField
                inputRef={inputRef}
                {...params}
                label="Name abas"
                onChange={(e) => (textInputRef.current = e.target.value)}
              />
            )}
          />

          <div className="flex flex-row flex-wrap gap-5 p-5 justify-center items-center md:j ">
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsOpenModal(false)}
            >
              Fechar modal
            </Button>
            <Button variant="contained" onClick={addTabs}>
              Adicionar aba selecionada
            </Button>
          </div>
        </section>
      ) : (
        content === "Atalhos de teclado" && (
          <section className="flex flex-col justify-center items-center p-3">
            <h3 className="text-3xl border-b-2 pb-3 mb-3 border-black w-full text-center">
              Atalhos de teclado
            </h3>

            <div className="h-auto max-h-96 overflow-x-clip overflow-y-auto">
              {atalhoDeTeclado.map((item, index) => (
                <p key={index} className="text-2xl">
                  {item.instrução}:{" "}
                  <span className="text-red-500 text-2xl">{item.atalho}</span>
                </p>
              ))}
            </div>

            <div className="border-t-2 pt-3 mt-3 border-black w-full flex justify-center ">
              <Button
                variant="contained"
                color="error"
                onClick={() => setIsOpenModal(false)}
              >
                Fechar modal
              </Button>
            </div>
          </section>
        )
      )}
    </Dialog>
  );
}

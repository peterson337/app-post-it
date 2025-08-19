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
  const { modoTarefas } = React.useContext(GlobalContext);
  const { addedTabSelected } = useCustomHook();
  const textInputRef = React.useRef("");

  const options = modoTarefas.map((item) => item.nomeGrupoTarefa);

  const addTabs = () => {
    //prettier-ignore
    const tab = modoTarefas.find((item) => item.nomeGrupoTarefa === textInputRef.current);

    if (tab) {
      const tabSelected = addedTabSelected(tab);

      if (tabSelected) setIsOpenModal(false);
      else alert("Esta aba ja foi adicionada.");
    } else {
      alert("Esta lista de tarefas não existe.");
    }
  };

  return (
    <Dialog onClose={() => setIsOpenModal(false)} open={isOpenModal}>
      {content === "Add Tabs" && (
        <section className="flex flex-col justify-center items-center">
          <DialogTitle className="text-center">Adicionar abas</DialogTitle>

          <Autocomplete
            options={options}
            sx={{ width: 300 }}
            onChange={(_event, value) => (textInputRef.current = value || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Name abas"
                onChange={(e) => (textInputRef.current = e.target.value)}
              />
            )}
          />

          <div className="flex flex-row gap-5 p-5 ">
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
      )}
    </Dialog>
  );
}

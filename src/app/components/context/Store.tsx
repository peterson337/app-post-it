"use client";

import { Children, createContext, useState, useEffect } from "react";
import { Types, Tarefas, ModoTarefa, Tabs } from "./ts/types";
import api from "../../../service/api";

export type Tasks = {
  id: number;
  nomeTarefa: string;
  completed: boolean;
  color: string;
  colorText: boolean;
  idListTask?: number;
};

export const GlobalContext = createContext<Types>({
  IsModalEditarTarefa: false,
  setTarefas: () => {},
  setTarefasFavoritas: () => {},
  setIsModalEditarTarefa: () => {},
  tarefas: [],
  tarefasFavoritas: [],
  anotarTarefas: "",
  setAnotarTarefas: () => {},
  excluirTarefas: () => {},
  TarefaConcluida: false,
  MacarTarefaComoConcluida: () => {},
  anotarTarefasEditada: "",
  setAnotarTarefasEditada: () => {},
  setArmazenarTarefa: () => {},
  Filtro: 0,
  setFiltro: () => {},
  favoritarTarefa: () => {},
  handleChandeTab: () => {},
  ArmazenarTarefa: 0,

  isOpenModal: false,
  setIsOpenModal: () => {},

  //? Funções

  MacarTarefavoritaComoConcluida: () => {},
  atualizarTarefaFavorita: () => {},
  excluirTarefasFavorita: (id: number | null) => {}, // Adicione a definição correta aqui
  desfavoritarTarefa: () => {},
  isSideBar: false,
  setIsSideBar: () => {},
  modoTarefas: [],
  setModoTarefas: () => {},
  isOpenModalTarefaDinamica: false,
  setIsOpenModalTarefaDinamica: () => {},
  useId: null,
  setUserId: () => {},
  tabs: [],
  setTabs: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tarefas, setTarefas] = useState<Tarefas[]>([]);
  const [tarefasFavoritas, setTarefasFavoritas] = useState<Tarefas[]>([]);

  const [ArmazenarTarefa, setArmazenarTarefa] = useState<number>(0);
  const [anotarTarefasEditada, setAnotarTarefasEditada] = useState("");
  const [Filtro, setFiltro] = useState<number>(0);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalTarefaDinamica, setIsOpenModalTarefaDinamica] =
    useState(false);
  const [isSideBar, setIsSideBar] = useState(false);

  //prettier-ignore
  const getNameTask = JSON.parse(localStorage.getItem("colecaoTarefas") as string || "[]")?.[0]?.nomeGrupoTarefa;

  const nameTask = getNameTask || "Tarefas de Trabalho";

  const [modoTarefas, setModoTarefas] = useState<ModoTarefa[]>([
    {
      id: 0,
      nomeGrupoTarefa: nameTask,
      tasks: [],
    },

    {
      id: 2,
      nomeGrupoTarefa: "Lista de compra 🛒",
      tasks: [],
    },
  ]);

  const [tabs, setTabs] = useState<Tabs[]>([]);

  const [useId, setUserId] = useState<null | string | undefined>(null);

  useEffect(() => {
    const data = localStorage.getItem("tarefas");
    const dataFavoritas = localStorage.getItem("tarefasFavoritas");
    const recuperarColecaoTarefa = localStorage.getItem("colecaoTarefas");
    const userId = localStorage.getItem("userId");

    if (data) {
      setTarefas(JSON.parse(data));
    }
    if (dataFavoritas) {
      setTarefasFavoritas(JSON.parse(dataFavoritas));
    }
    if (recuperarColecaoTarefa) {
      setModoTarefas(JSON.parse(recuperarColecaoTarefa));
    }

    if (userId) {
      setUserId(userId as string);
    }
  }, []);

  const handleChandeTab = (event: React.SyntheticEvent, newValue: number) => {
    setFiltro(newValue);
  };

  const excluirTarefas = (id: number | null) => {
    const deletarTarefa = tarefas.filter((val) =>
      id ? val.id != id : val.completed === false
    );
    setTarefas(deletarTarefa);
    localStorage.setItem("tarefas", JSON.stringify(deletarTarefa));
  };
  const excluirTarefasFavorita = (id: number) => {
    const deletarTarefa = tarefasFavoritas.filter((val) => val.id != id);
    setTarefasFavoritas(deletarTarefa);
    localStorage.setItem("tarefasFavoritas", JSON.stringify(deletarTarefa));
  };

  const MacarTarefavoritaComoConcluida = (id: number) => {
    const atualizarTarefaFavorita = tarefasFavoritas.map((val) => {
      if (val.id === id) {
        return { ...val, completed: !val.completed };
      }
      return val;
    });
    setTarefasFavoritas(atualizarTarefaFavorita);
    localStorage.setItem(
      "tarefasFavoritas",
      JSON.stringify(atualizarTarefaFavorita)
    );
  };

  const MacarTarefaComoConcluida = (id: number) => {
    const atualizarTarefa = tarefas.map((val) => {
      if (val.id === id) {
        return { ...val, completed: !val.completed };
      }
      return val;
    });

    setTarefas(atualizarTarefa);
    localStorage.setItem("tarefas", JSON.stringify(atualizarTarefa));
  };

  const favoritarTarefa = (id: number) => {
    excluirTarefas(id);

    const favoritarTarefas = {
      id: id,
      tarefa: tarefas.filter((val) => val.id === id)[0].tarefa,
      completed: tarefas.filter((val) => val.id === id)[0].completed,
    };

    setTarefasFavoritas([...tarefasFavoritas, favoritarTarefas]);

    localStorage.setItem(
      "tarefasFavoritas",
      JSON.stringify([...tarefasFavoritas, favoritarTarefas])
    );
  };

  const desfavoritarTarefa = (id: number) => {
    excluirTarefasFavorita(id);

    const desfavoritarTarefas = {
      id: id,
      tarefa: tarefasFavoritas.filter((val) => val.id === id)[0].tarefa,
      completed: tarefasFavoritas.filter((val) => val.id === id)[0].completed,
    };

    setTarefas([...tarefas, desfavoritarTarefas]);

    localStorage.setItem(
      "tarefas",
      JSON.stringify([...tarefas, desfavoritarTarefas])
    );
  };

  const atualizarTarefaFavorita = (ArmazenarTarefa: number) => {
    const atualizarTarefaFavorita = tarefasFavoritas.map((val: Tarefas) =>
      val.id === ArmazenarTarefa
        ? { ...val, tarefa: anotarTarefasEditada }
        : val
    );

    setTarefasFavoritas(atualizarTarefaFavorita);

    localStorage.setItem(
      "tarefasFavoritas",
      JSON.stringify(atualizarTarefaFavorita)
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        tarefas,
        anotarTarefasEditada,
        ArmazenarTarefa,
        tarefasFavoritas,
        Filtro,
        setFiltro,
        isSideBar,
        setIsSideBar,
        isOpenModal,
        setIsOpenModal,
        modoTarefas,
        setModoTarefas,
        setTarefasFavoritas,
        setTarefas,
        setAnotarTarefasEditada,
        setArmazenarTarefa,
        isOpenModalTarefaDinamica,
        setIsOpenModalTarefaDinamica,
        //? Funções
        excluirTarefas,
        MacarTarefaComoConcluida,
        //atualizarTarefa,
        favoritarTarefa,
        MacarTarefavoritaComoConcluida,
        atualizarTarefaFavorita,
        excluirTarefasFavorita,
        desfavoritarTarefa,
        handleChandeTab,
        useId,
        setUserId,
        tabs,
        setTabs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

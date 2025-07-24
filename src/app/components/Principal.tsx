"use client";
import React from "react";
import { Header } from "../components/Header";
import { Tarefas } from "../components/Tarefas";
import { GlobalContext } from "./context/Store";
interface Props {
  userId: string | null | undefined;
}

export const Principal = (props: Props) => {
  const { userId } = props;

  const { setUserId } = React.useContext(GlobalContext);

  React.useEffect(() => {
    const excluirListaPadrao = localStorage.getItem("tarefas");

    if (excluirListaPadrao) {
      localStorage.removeItem("tarefas");
    }

    setUserId(userId);
  }, []);

  return (
    <main className="text-white">
      <Tarefas />
    </main>
  );
};

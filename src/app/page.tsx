"use client";

import React from "react";
import Image from "next/image";
import { Principal } from "./components/Principal";
export default function Home() {
  React.useEffect(() => {
    const excluirListaPadrao = localStorage.getItem("tarefas");

    if (excluirListaPadrao) {
      localStorage.removeItem("tarefas");
      
    }

  }, [])
  

  return (
    <main>
      <Principal />
    </main>
  );
}

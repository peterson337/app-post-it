"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Types, TarefasDeCompra } from "./context/ts/types";
import { List } from "./List";
import { GlobalContext } from "./context/Store";
import { Calculadora } from "./Calculadora";
import Fab from "@mui/material/Fab";
import { FaCartPlus } from "react-icons/fa";

type T = number;

export const ListaDeCompra = () => {
  const [adiconarTarefaDeCompra, setAdiconarTarefaDeCompra] = useState("");

  const [precoTotal, setPrecoTotal] = useState<number>(0);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      adcionarTarefa();
    }
  };

  const [ListaDeCompra, setListaDeCompra] = useState<TarefasDeCompra[]>([]);

  const { Filtro, isOpenModal, setIsOpenModal } = useContext(GlobalContext);

  const refInputNumber = useRef<HTMLInputElement | null>(null);

  const adcionarTarefa = () => {
    const preco: any = refInputNumber.current;

    if (adiconarTarefaDeCompra.length === 0) {
      alert("Escreva uma tarefa para salvar.");
      return;
    } else if (isNaN(preco as unknown as T)) {
      alert("Por favor, insira um valor válido para o produto.");
      return;
    }

    const novoPrecoTotal = precoTotal + preco;

    setPrecoTotal(novoPrecoTotal);

    const obj = {
      tarefa: adiconarTarefaDeCompra,
      id: new Date().getTime(),
      completed: false,
      preco: preco,
      precoTotal: novoPrecoTotal,
    };

    setListaDeCompra([...ListaDeCompra, obj]);

    setAdiconarTarefaDeCompra("");

    localStorage.setItem(
      "listaDeCompra",
      JSON.stringify([...ListaDeCompra, obj])
    );

    localStorage.setItem("precoTotal", JSON.stringify(novoPrecoTotal));
  };

  const valorInput = (e: HTMLInputElement) => (refInputNumber.current = e);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isOpenModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [isOpenModal]);

  return (
    <main className="p-3">
      {isOpenModal ? (
        <section
          className={
            "fixed z-10 inset-0 flex justify-center items-center transition-colors visible bg-black/50 "
          }
        >
          <div
            className={`bg-white rounded-lg flex flex-col gap-3 justify-center items-center text-center
         shadow p-6 transition-all max-w-md fixed z-50 text-black 
            ${
              isOpenModal ? " scale-100 opacity-100" : " scale-1100 opacity-0"
            } `}
          >
            <h2 className="md:text-3xl text-2xl font-bangers ">
              Criar lista de compra
            </h2>
            <input
              type="text"
              value={adiconarTarefaDeCompra}
              className="text-black border-[#ccc] border p-2 rounded-full outline-none"
              placeholder="Escreva o nome do produto"
              onChange={(e) => setAdiconarTarefaDeCompra(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <input
              type="number"
              ref={refInputNumber}
              onChange={(e) =>
                valorInput(
                  e.target.valueAsNumber as unknown as HTMLInputElement
                )
              }
              onKeyDown={handleKeyPress}
              className="text-black border-[#ccc] border p-2 rounded-full outline-none"
              placeholder="Insira o preço do produto"
            />

            <div className="flex flex-row gap-3">
              <button
                className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full"
                onClick={() => setIsOpenModal(false)}
              >
                Fechar modal
              </button>

              <button
                className="bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-full"
                onClick={adcionarTarefa}
              >
                Adcionar tarefa
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <List
        ListaDeCompra={ListaDeCompra}
        setListaDeCompra={setListaDeCompra}
        precoTotal={precoTotal}
        setPrecoTotal={setPrecoTotal}
      />

      <section className="w-[100%] flex justify-end mt-3">
        <Fab
          className={`bg-green-500 hover:bg-green-700  text-white relative  mr-3 md:mr-0 
              ${
                ListaDeCompra.length === 0 ? "xl:top-[590px] top-[250px]" : ""
              } `}
          onClick={() => setIsOpenModal(true)}
        >
          <FaCartPlus />
        </Fab>
      </section>
    </main>
  );
};

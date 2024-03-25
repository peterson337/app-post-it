//!  Use client
"use client";

//!  Importações
import React, { useState, useEffect, Fragment, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FaTrash } from "react-icons/fa";

//!  Typescript
type T = { isOpenModal: boolean; closeModal: () => void };

//!  Style
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backGroundColor: "black",
};

type NumericOrStringArray<T> = Array<number | string>;

type Historico = {
  primeiroNumero: string;
  sinal: string;
  segundoNumero: string;
  resultadoFinal: number;
  id: number;
};

export const ModalCalculator = ({ isOpenModal, closeModal }: T) => {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [sinal, setSinal] = useState<null | string>(null);
  const [numeros, setNumeros] = useState<NumericOrStringArray<number | string>>(
    []
  );
  const [historicoDaCalculadora, setHistoricoDaCalculadora] = useState<
    Historico[]
  >([]);
  const [showHistorico, setShowHistorico] = useState(false);

  useEffect(() => {
    const numbers = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "+",
      "-",
      "*",
      "/",
      "=",
    ];
    setNumeros(numbers);

    const recuperarHistoricoString = sessionStorage.getItem("caluladora");
    const recuperarHistorico = JSON.parse(recuperarHistoricoString as string);
    recuperarHistoricoString
      ? setHistoricoDaCalculadora(recuperarHistorico)
      : null;
  }, []);

  const calcular = (item: number | string) => {
    if (!sinal) {
      if (
        item === "+" ||
        item === "-" ||
        item === "*" ||
        item === "/" ||
        item === "="
      ) {
        !firstNumber
          ? alert(
              "Por favor, insira um número primeiro e depois insira um sinal."
            )
          : setSinal(item);
      } else {
        setFirstNumber((prev) => prev + item);
      }
    } else if (sinal) {
      if (item === "+" || item === "-" || item === "*" || item === "/") {
        setSinal(item);
      } else if (item === "=") {
        if (!secondNumber) {
          return;
        } else if (
          sinal === "+" ||
          sinal === "-" ||
          sinal === "/" ||
          sinal === "*"
        ) {
          const num1 = parseFloat(firstNumber);
          const num2 = parseFloat(secondNumber);

          const resultFinal: any =
            sinal === "+"
              ? num1 + num2
              : sinal === "-"
              ? num1 - num2
              : sinal === "/"
              ? num1 / num2
              : sinal === "*"
              ? num1 * num2
              : alert("Não foi possível fazer o calculo.");

          const numberToString = resultFinal.toString();
          setFirstNumber(numberToString);
          setSinal(null);
          setSecondNumber("");

          const obj = {
            primeiroNumero: firstNumber,
            sinal: sinal,
            segundoNumero: secondNumber,
            resultadoFinal: numberToString,
            id: new Date().getTime(),
          };
          setHistoricoDaCalculadora([
            ...historicoDaCalculadora,
            obj,
          ] as Historico[]);
          sessionStorage.setItem(
            "caluladora",
            JSON.stringify([...historicoDaCalculadora, obj])
          );
        }
      } else {
        setSecondNumber((prev) => prev + item);
      }
    }
  };

  const recuprarNumero = (item: Historico) => {
    setShowHistorico(!showHistorico);
    setSinal(item.sinal);
    setSecondNumber(item.segundoNumero);
    setFirstNumber(item.primeiroNumero);
  };

  const apagarOsNumeros = () => {
    setFirstNumber("");
    setSinal(null);
    setSecondNumber("");
  };

  const apagarUmNumero = () => {
    secondNumber
      ? setSecondNumber(secondNumber.slice(0, -1))
      : sinal
      ? setSinal(null)
      : firstNumber
      ? setFirstNumber(firstNumber.slice(0, -1))
      : null;
  };

  const apagarHistorico = () => {
    setHistoricoDaCalculadora([]);
    sessionStorage.removeItem("caluladora");
  };
  return (
    <>
      <Modal
        open={isOpenModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-[#2e2e2e] text-white ">
          <button onClick={() => setShowHistorico(!showHistorico)}>
            <MdHistory className="text-4xl outline-0	" />
          </button>

          {!showHistorico ? (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-center pb-3 mb-3 text-4xl border-b border-[#ccc] w-60 overflow-auto"
              >
                {firstNumber ? firstNumber : 0} {sinal ? sinal : null}{" "}
                {secondNumber ? secondNumber : null}
              </Typography>

              <section className=" grid md:grid-cols-3 grid-cols-4	">
                <button
                  className="md:m-3 md:p-5 m-3 p-3   rounded-xl  bg-sky-500 hover:bg-sky-700"
                  onClick={apagarOsNumeros}
                >
                  C
                </button>
                <button
                  className="md:m-3 md:p-5 m-3 p-3 rounded-xl bg-red-600 hover:bg-red-700"
                  onClick={apagarUmNumero}
                >
                  <FaDeleteLeft />
                </button>
                {numeros.map((item) => {
                  return (
                    <Fragment key={item}>
                      <button
                        className="md:m-3 md:p-5 m-3 p-3 rounded-xl  bg-slate-800 hover:bg-slate-900"
                        onClick={() => calcular(item)}
                      >
                        {item}
                      </button>
                    </Fragment>
                  );
                })}
              </section>
            </>
          ) : (
            <>
              {historicoDaCalculadora?.length === 0 ? (
                <div className=" h-80 ">
                  <p className="text-center text-3xl">Sem histórico</p>
                </div>
              ) : (
                <Fragment>
                  <h2 className=" text-4xl mb-3 pb-3 border-b border-[#ccc]">
                    Histórico
                  </h2>

                  <section className="  h-80 md:h-96 w-64 overflow-auto mb-4">
                    {historicoDaCalculadora.map((item: Historico) => {
                      return (
                        <section key={item.id}>
                          <div>
                            <button
                              className=" text-3xl mb-3 pb-3 border-b border-[#ccc] w-56 "
                              onClick={() => recuprarNumero(item)}
                            >
                              {item.primeiroNumero}
                              {item.sinal} {item.segundoNumero} ={" "}
                              {item.resultadoFinal}
                            </button>
                          </div>
                        </section>
                      );
                    })}
                  </section>

                  <button onClick={apagarHistorico}>
                    <FaTrash />
                  </button>
                </Fragment>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

// Fix Profile Page formatting

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
type T = { isOpenModal: Boolean; closeModal: () => void };

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

export const ModalCalculator = ({ isOpenModal, closeModal }: T) => {
  const [firstNumber, setFirstNumber] = useState<null | number>(0);
  const [secondNumber, setSecondNumber] = useState<null | number>(null);
  const [sinal, setSinal] = useState<null | string>(null);
  const [numeros, setNumeros] = useState<NumericOrStringArray<number | string>>(
    []
  );
  const [historicoDaCalculadora, setHistoricoDaCalculadora] = useState([]);
  const [showHistorico, setShowHistorico] = useState(false);

  useEffect(() => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "*", "/", "="];
    setNumeros(numbers);
  }, []);

  const calcular = (item: number | string) => {
    if (!firstNumber) {
      if (
        item === "+" ||
        item === "-" ||
        item === "*" ||
        item === "/" ||
        item === "="
      ) {
        alert("Por favor insira um sinal");
      } else {
        setFirstNumber(item as number);
      }
    } else {
      if (!sinal) {
        if (item === "+" || item === "-" || item === "*" || item === "/") {
          setSinal(item);
        } else {
          alert("Por favor insira um sinal ou sinal inserido não é válido");
        }
      } else {
        if (!secondNumber) {
          if (
            item === "+" ||
            item === "-" ||
            item === "*" ||
            item === "/" ||
            item === "="
          ) {
            alert("Por favor insira um número");
          } else {
            setSecondNumber(item as number);
          }
        } else if (item === "=") {
          if (sinal === "+") {
            setFirstNumber(firstNumber + secondNumber);
            setSinal(null);
            setSecondNumber(null);
          } else if (sinal === "-") {
            setFirstNumber(firstNumber - secondNumber);
            setSinal(null);
            setSecondNumber(null);
          } else if (sinal === "*") {
            setFirstNumber(firstNumber * secondNumber);
            setSinal(null);
            setSecondNumber(null);
          } else if (sinal === "/") {
            setFirstNumber(firstNumber / secondNumber);
            setSinal(null);
            setSecondNumber(null);
          }
          const obj = {
            primeiroNumero: firstNumber,
            sinal: sinal,
            segundoNumero: secondNumber,
            resultadoFinal: firstNumber + secondNumber,
            id: new Date().getTime(),
          };
          setHistoricoDaCalculadora([...historicoDaCalculadora, obj]);
        }
      }
    }
  };

  console.log(historicoDaCalculadora);

  const apagarOsNumeros = () => {
    setFirstNumber(null);
    setSinal(null);
    setSecondNumber(null);
  };

  const apagarUmNumero = () => {
    secondNumber
      ? setSecondNumber(null)
      : sinal
      ? setSinal(null)
      : firstNumber
      ? setFirstNumber(null)
      : null;
  };

  const recuprarNumero = (item) => {
    setSinal(item.sinal);
    setSecondNumber(item.segundoNumero);
    setFirstNumber(item.primeiroNumero);
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
            <MdHistory />
          </button>

          {!showHistorico ? (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-center pb-3 mb-3 text-4xl border-b border-[#ccc]"
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
                <p className="text-center text-3xl">Sem histórico</p>
              ) : (
                <Fragment>
                  <h2 className=" text-4xl mb-3 pb-3 border-b border-[#ccc]">
                    Histórico
                  </h2>
                  {historicoDaCalculadora.map((item) => {
                    return (
                      <section className=" overscroll-auto	">
                        <button
                          className=" text-3xl mb-3 pb-3 border-b border-[#ccc] w-56"
                          onClick={() => recuprarNumero(item)}
                        >
                          {item.primeiroNumero} {item.sinal}{" "}
                          {item.segundoNumero} = {item.resultadoFinal}
                        </button>
                      </section>
                    );
                  })}

                  <button onClick={() => setHistoricoDaCalculadora([])}>
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

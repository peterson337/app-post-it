"use client";

import React, { useState } from "react";
import { MdCalculate } from "react-icons/md";
import { ModalCalculator } from "./ModalCalculator";

export const Calculadora = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => setIsOpenModal(false);

  return (
    <>
      <section className="  justify-end items-end mb-3 cursor-pointer">
        <MdCalculate
          className=" text-5xl bg-sky-500 rounded-xl"
          onClick={() => setIsOpenModal(true)}
        />

        {isOpenModal ? (
          <ModalCalculator isOpenModal={isOpenModal} closeModal={closeModal} />
        ) : null}
      </section>
    </>
  );
};

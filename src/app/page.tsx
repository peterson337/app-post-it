"use client";

import React from "react";
import Image from "next/image";
import { Principal } from "./components/Principal";
import Login from "./components/Login";
export default function Home() {
  const [isCloseTelaLogin, setIsCloseTelaLogin] = React.useState(false);

  return (
    <main>
      {isCloseTelaLogin ? (
        <Principal />
      ) : (
        <Login setIsCloseTelaLogin={setIsCloseTelaLogin} />
      )}
    </main>
  );
}

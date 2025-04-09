"use client";
import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import api from "../../service/api";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";

export default function Login({
  setIsCloseTelaLogin,
}: {
  setIsCloseTelaLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const obj = React.useRef({
    userName: "",
    senha: "",
  });

  const [isLogin, setIsLogin] = React.useState(false);
  const [isSenhaVisivel, setIsSenhaVisivel] = React.useState(false);

  const criarConta = async () => {
    try {
      const res = await api.post("/createUser", obj.current);

      if ((res.status = 200)) alert("Conta criada com sucesso!");

      setIsCloseTelaLogin(true);

      // obj.current.userName = "";
      // obj.current.senha = "";
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const login = async () => {
    try {
      const res = await api.post("/login", obj.current);
      alert(res.data.message);
      setIsCloseTelaLogin(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <>
      <section
        style={{ color: "white" }}
        className="flex justify-center items-center h-screen"
      >
        <div
          className="bg-[#373737] flex flex-col p-5 rounded-2xl"
          style={{ width: "20rem" }}
        >
          <h2 className="text-center text-2xl">App post it 😎</h2>

          <h2 className="text-center text-2xl">
            {isLogin ? "Login" : "Crie a sua conta"}
          </h2>

          <div className="flex flex-col gap-2">
            <h3>Digite seu nome</h3>
            <input
              type="text"
              placeholder="seu nome"
              className="p-3 bg-black rounded-full outline-none"
              onChange={(e) => (obj.current.userName = e.target.value)}
            />

            <br />
            <h3>Digite sua senha</h3>

            <div className="inline-flex gap-3">
              <input
                type={isSenhaVisivel ? "text" : "password"}
                placeholder="sua senha"
                className="p-3 bg-black rounded-full outline-none"
                onChange={(e) => (obj.current.senha = e.target.value)}
              />

              <button onClick={() => setIsSenhaVisivel((prev) => !prev)}>
                {isSenhaVisivel ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <Button
              variant="contained"
              className="bg-sky-500"
              onClick={isLogin ? login : criarConta}
            >
              {isLogin ? "Logar" : "Crie a sua conta"}
            </Button>

            <p
              className="cursor-pointer text-center  hover:text-sky-700"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {!isLogin
                ? "Ja possui uma conta? clique aqui"
                : "Não possui uma conta? clique aqui"}
            </p>

            <p
              className="cursor-pointer text-center  hover:text-sky-700"
              onClick={() => setIsCloseTelaLogin(true)}
            >
              Você pode usar o app post it sem criar conta ou logar clique aqui
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

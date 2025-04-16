"use client";
import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import api from "../../service/api";
import { GlobalContext } from "./context/Store";
import { useRouter } from "next/navigation";

export default function Login() {
  const { setUserId } = React.useContext(GlobalContext);
  const router = useRouter();

  const obj = React.useRef({
    userName: "",
  });

  const [isLogin, setIsLogin] = React.useState(true);

  const criarConta = async () => {
     //prettier-ignore
    if (obj.current.userName !== "pessoal" && obj.current.userName !== "trabalho") {
      alert("Você não está autorizado para criar um usuário.");
      return;
    }

    try {
      const res = await api.post("/createUser", obj.current);

      if ((res.status = 200)) alert("Conta criada com sucesso!");
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
      setUserId(res.data.id);
      localStorage.setItem("userId", res.data.id);
      router.push("/");
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

            <Button
              variant="contained"
              className="bg-sky-500"
              onClick={isLogin ? login : criarConta}
            >
              {isLogin ? "Logar" : "Crie o seu usuário"}
            </Button>

            <p
              className="cursor-pointer text-center  hover:text-sky-700"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {!isLogin
                ? "Ja possui um usuário? clique aqui"
                : "Não possui um usuário? clique aqui"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

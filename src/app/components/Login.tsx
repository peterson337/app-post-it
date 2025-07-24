import React from "react";
import Button from "@mui/material/Button";
import { Params } from "../components/ts/loginTypes";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { redirect } from "next/navigation";

export default async function Login(props: Params) {
  "use server";
  const { params } = props;

  if (params.slug === "logout") {
    ("use server");
    const cookieStore = cookies();
    cookieStore.delete("userID");
    // redirect("/");
  }

  const logout = async () => {
    "use server";
    const res = await fetch("http://localhost:3000/api/", {
      method: "GET",
    });
    console.log(res);
  };

  const login = async (formData: FormData) => {
    "use server";
    const cookieStore = cookies();
    const obj = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      password: formData.get("password"),
      validation: formData.get("validation"),
    };

    const validation =
      obj.validation === "login"
        ? signInWithEmailAndPassword(
            auth,
            String(obj.email),
            String(obj.password)
          )
        : createUserWithEmailAndPassword(
            auth,
            String(obj.email),
            String(obj.password)
          );

    try {
      const userCredential = await validation;
      cookieStore.set("userID", userCredential.user.uid, {
        secure: true,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
      });
    } catch (error) {}

    if (cookieStore.get("userID")) redirect("/");
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
          {/* <h2 className="text-center text-2xl">App post it 😎</h2> */}

          <h2 className="text-center text-2xl border-b-2 border-white mb-5 pb-5">
            {params.slug === "login" ? "Login" : "Crie a sua conta"}
          </h2>

          <div>
            <form action={login} className="flex flex-col gap-2">
              <h3>Digite seu email</h3>
              <input
                type="text"
                placeholder="Email"
                className="p-3 bg-black rounded-full outline-none"
                name="email"
                required={true}
              />

              <h3>Digite sua senha</h3>
              <input
                type="text"
                placeholder="Senha"
                className="p-3 bg-black rounded-full outline-none"
                name="password"
                required={true}
              />

              <input
                type="text"
                placeholder="Senha"
                className="hidden"
                name="validation"
                required={true}
                value={params.slug === "login" ? "login" : "criarUsuario"}
                readOnly
              />

              <Button variant="contained" className="bg-sky-500" type="submit">
                {params.slug === "login" ? "Logar" : "Crie o seu usuário"}
              </Button>
            </form>

            <br />

            <Link
              className="cursor-pointer text-center  hover:text-sky-700"
              href={
                params.slug === "login" ? "/pages/criarUsuario" : "/pages/login"
              }
            >
              {params.slug === "login"
                ? "Ja possui um usuário? clique aqui"
                : "Não possui um usuário? clique aqui"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

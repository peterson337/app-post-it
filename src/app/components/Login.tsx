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

export default async function Login(props: Params) {
  "use server";
  const { params } = props;

  const criarConta = async () => {};

  const login = async (formData: FormData) => {
    "use server";
    const cookieStore = await cookies();
    const obj = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      password: formData.get("password"),
      validation: formData.get("validation"),
    };

    console.log(obj.validation);

    const validation =
      obj.validation === "login"
        ? signInWithEmailAndPassword(auth, obj.email, obj.password)
        : createUserWithEmailAndPassword(auth, obj.email, obj.password);
    //prettier-ignore
    validation.then((userCredential) => {
        const user = userCredential.user;
        console.log("ID: ", user.uid);

        cookieStore.set({
          name: "userId",
          value: JSON.stringify(user.uid),
          httpOnly: true,
          path: "/",
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });

    // try {
    //   const res = await api.post("/login", obj.current);
    //   alert(res.data.message);
    //   setUserId(res.data.id);
    //   localStorage.setItem("userId", res.data.id);
    //   router.push("/");
    // } catch (error) {
    //   if (axios.isAxiosError(error) && error.response) {
    //     alert(error.response.data.error);
    //   } else {
    //     console.error("An unexpected error occurred:", error);
    //   }
    // }
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
            {params.slug === "login" ? "Login" : "Crie a sua conta"}
          </h2>

          <div className="flex flex-col gap-2">
            <form action={login}>
              <h3>Digite seu email</h3>
              <input
                type="text"
                placeholder="Email"
                className="p-3 bg-black rounded-full outline-none"
                name="email"
              />

              <h3>Digite sua senha</h3>
              <input
                type="text"
                placeholder="Senha"
                className="p-3 bg-black rounded-full outline-none"
                name="password"
              />

              <input
                type="text"
                placeholder="Senha"
                className="hidden"
                name="validation"
                value={params.slug === "login" ? "login" : "criarUsuario"}
              />

              <Button variant="contained" className="bg-sky-500" type="submit">
                {params.slug === "login" ? "Logar" : "Crie o seu usuário"}
              </Button>
            </form>

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

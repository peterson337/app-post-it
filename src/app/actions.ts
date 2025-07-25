"use server";
import { cookies } from "next/headers";

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete("userID");
}

export async function recuperarIdUser() {
  const cookieStore = cookies();
  return cookieStore.get("userID")?.value;
}

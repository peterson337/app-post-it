"use server";
import { cookies } from "next/headers";

export async function actions() {
  const cookieStore = cookies();

  cookieStore.delete("userID");
}

import React from "react";
import Image from "next/image";
import { Principal } from "./components/Principal";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();

  return (
    <main>
      <Principal userId={cookieStore.get("userID")?.value} />
    </main>
  );
}

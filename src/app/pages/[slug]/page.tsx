import React from "react";
import Image from "next/image";
import Login from "../../components/Login";
import { Params } from "../../components/ts/loginTypes";

export default function Page(params: Params) {
  return (
    <main>
      <Login params={{ slug: params.params.slug, searchParams: "" }} />
    </main>
  );
}

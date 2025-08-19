import React from "react";
import { GlobalContext } from "../components/context/Store";

type Obj = {
  id: number;
  nomeGrupoTarefa: string;
};

function useCustomHook() {
  const { setTabs, tabs } = React.useContext(GlobalContext);
  const addedTabSelected = (obj: Obj) => {
    const tabExists = tabs.filter((tab) => tab.nomeTab === obj.nomeGrupoTarefa);

    if (tabExists.length === 0) {
      //prettier-ignore
      setTabs((prevTabs) => [...prevTabs, { id: obj.id, nomeTab: obj.nomeGrupoTarefa }]);

      return true;
    } else return false;
  };

  //prettier-ignore
  // const formatString = (params : string) => params.toLocaleLowerCase().split("").filter((item) => item !== "").join("");

  const formatString = (params : string) => {

    console.log(params.toLocaleLowerCase().split("").filter((item) => item !== "").join(""));

    return params.toLocaleLowerCase().split("").filter((item) => item !== "").join("")
  };

  return {
    addedTabSelected,
    formatString,
  };
}

export default useCustomHook;

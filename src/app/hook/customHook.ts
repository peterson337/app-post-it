import React from "react";
import { GlobalContext } from "../components/context/Store";

type Obj = {
  id: number;
  nomeGrupoTarefa: string;
};

function customHook() {
  const { setTabs, tabs } = React.useContext(GlobalContext);
  const addedTabSelected = (obj: Obj) => {
    const tabExists = tabs.filter((tab) => tab.nomeTab === obj.nomeGrupoTarefa);

    console.log(tabExists);

    if (tabExists.length === 0) {
      //prettier-ignore
      setTabs((prevTabs) => [...prevTabs, { id: obj.id, nomeTab: obj.nomeGrupoTarefa }]);

      return true;
    } else return false;
  };

  return {
    addedTabSelected,
  };
}

export default customHook;

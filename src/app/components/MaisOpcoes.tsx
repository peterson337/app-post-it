"use client";
import React from "react";
import Button from "@mui/material/Button";
import { SelectFilterTasks } from "./SelectFilterTasks";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const MaisOpcoes = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const armazenarFiltro = (text: string) => {
    props.setTextFilter(text);

    sessionStorage.setItem(`textFilter-${String(props.Filtro)}`, text);
  };

  return (
    <>
      <SelectFilterTasks
        fecharMenuSuspenso={null}
        filterTasks={props.filterTasks}
        setFilterTasks={props.setFilterTasks}
      />

      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Filtrar tarefas"
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          outline: "none",
          border: "none",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
              outline: "none",
            },
          },
        }}
        value={props.textFilter}
        onChange={(e) => armazenarFiltro(e.target.value)}
      />

      <Button
        id="basic-button"
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Mais opções
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={
          {
            list: {
              "aria-labelledby": "basic-button",
            },
          } as any
        }
      >
        <MenuItem onClick={handleClose}>
          <Button
            variant="contained"
            onClick={props.apagarTodasAsTarefasConcluidas}
            className="bg-red-500 hover:bg-red-600 rounded-lg active:bg-red-600 w-72 p-1 md:w-96 md:text-[20px] font-bold"
          >
            Apagar tarefas concluídas
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            variant="contained"
            onClick={() => props.apagarTodasAsTarefasConcluidas("desmarcar")}
            className="bg-green-500 hover:bg-green-600 rounded-lg active:bg-green-600 w-72 p-1 md:w-96 md:text-[20px] font-bold"
          >
            Desmarcar as tarefas
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
export const SelectFilterTasks = ({
  fecharMenuSuspenso,
  filterTasks,
  setFilterTasks,
  defaultValue,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Todas as tarefas");

  const handleChange = (event: SelectChangeEvent<typeof filterTasks>) => {
    const result = event.target.value;
    setValue(result);

    setFilterTasks(
      result === "Tarefas concluídas"
        ? true
        : result === "Tarefas não concluídas"
        ? false
        : result === "Todas as tarefas" && "null"
    );
    fecharMenuSuspenso && fecharMenuSuspenso();
  };

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  return (
    <>
      {/* <InputLabel id="demo-controlled-open-select-label" 
        className={` ${fecharMenuSuspenso? '' : ''}`}
        >
          Todas as tarefas
        </InputLabel> */}
      <Select
        className={`bg-white w-64`}
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={
          defaultValue === "Selecione um opção" ? "Selecione um opção" : value
        }
        label="Todas as tarefas"
        onChange={handleChange}
        sx={{
          borderRadius: "20px",
          outline: "none",
          border: "none",
          "&.MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent", // remove a borda azul
            },
          },
        }}
      >
        <MenuItem value={"Todas as tarefas"}>Todas as tarefas</MenuItem>
        <MenuItem value={"Tarefas concluídas"}>Tarefas concluídas</MenuItem>
        {/* props.defaultValue */}
        <MenuItem value={"Tarefas não concluídas"}>
          Tarefas não concluídas
        </MenuItem>

        <MenuItem value={"Selecione um opção"} className="hidden">
          Selecione um opção
        </MenuItem>
      </Select>
    </>
  );
};

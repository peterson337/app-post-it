import React,{useState,useEffect, useContext} from 'react'

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  {GlobalContext}  from "./context/Store";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
export const CardComponent = (val: any) => {

  const openModalCreateTarefas = () => setISOpenModalCreateTareas(true)
  const closeModalCreateTarefas = () => setISOpenModalCreateTareas(false)

  const openModalEditarTarefas = (id : number) => 
  {setISOpenModalEditarTarefas(true); setArmazenarTarefa(id)}

  const closeModalEditarTarefas = () => setISOpenModalEditarTarefas(false)


  const [iSOpenModalCreateTareas, setISOpenModalCreateTareas] = useState(false);
  const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] = useState(false);
  const {
    tarefas,
    TarefaConcluida,
    excluirTarefas,
    setArmazenarTarefa,
    MacarTarefaComoConcluida,
} = useContext(GlobalContext);

  return (
    tarefas.map((val) => {
      return(
        <Box
        component="span"
        sx={{ mx: '2px', transform: 'scale(0.8)'}}
          className='flex flex-row '
        key={val.id}
      >
         <Card className='w-60 h-32 p-3 '>
    <Typography className={`${TarefaConcluida? 'line-through text-green-500' : 'text-black'}
     w-full break-words h-16 overflow-auto`}
     sx={{ fontSize: 20 }}
     color="text.secondary" gutterBottom>
    {val.tarefa}
    </Typography>
  <CardActions className=''>
    <Button size="small" onClick={() => excluirTarefas(val.id)}><FaTrash /> </Button>
    <Button size="small" onClick={MacarTarefaComoConcluida}><FaCheck /> </Button>
    <button  onClick={() => openModalEditarTarefas(val.id)}><FaPen /></button>
  </CardActions>
    </Card>
        
      </Box>
        )
    })
  )
}

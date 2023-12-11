'use client';
import React, {useContext, useState} from 'react'
import  {GlobalContext}  from "./context/Store";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { BsBookmarkStar } from "react-icons/bs";
import { ModalEditarTarefa } from "./ModalEditarTarefa";
export const TarefasFavoritas = () => {
    const {
   
        excluirTarefasFavorita,
        MacarTarefavoritaComoConcluida,
        tarefasFavoritas,
        desfavoritarTarefa,
        atualizarTarefaFavorita,
    } = useContext(GlobalContext);

            const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] = useState(false);

  return (
    <div className='grid  grid-cols-1 md:grid-cols-3'> 
        {/* {
            iSOpenModalEditarTarefas?
            <ModalEditarTarefa/>

            :

            null
        } */}
         {
            
         tarefasFavoritas.map((val) => {
        const TarefaConcluida = val.completed;

           return(

            <Box
        component="span"
        sx={{ mx: '2px', transform: 'scale(0.8)'}}
          className=''
        key={val.id}
      >
         <Card className='md:w-[33rem] w-60 h-60 p-5 bg-yellow-200 text-2xl'>
    <Typography className={`text-2xl ${TarefaConcluida? 'line-through text-green-500' : 'text-black'}
     w-full break-words h-36 overflow-auto`}
     sx={{ fontSize: 20 }}
     color="text.secondary" gutterBottom>
    {val.tarefa}
    </Typography>
  <CardActions className=' flex flex-row justify-between'>
    <button
    className='hover:bg-gray-300 p-3 hover:rounded-full text-red-500'
      onClick={() => excluirTarefasFavorita(val.id)}><FaTrash /> </button>
    <button
    className='hover:bg-gray-300 p-3 hover:rounded-full text-green-500'
      onClick={() => MacarTarefavoritaComoConcluida(val.id)}><FaCheck /> </button>
    <button
    className='hover:bg-gray-300 p-3 hover:rounded-full '
      onClick={() => desfavoritarTarefa(val.id)}><BsBookmarkStar /> </button>
     {/* <button
    className='hover:bg-gray-300 p-2 hover:rounded-full text-blue-500'
      onClick={() => setISOpenModalEditarTarefas(true)}><FaPen /></button>  */}

      {/*  onClick={() => atualizarTarefaFavorita(val.id)} */}
  </CardActions>
    </Card>
        
            </Box>   
    
              )
         })
       }

       {/* 
         
       */}
    </div>
  )
}

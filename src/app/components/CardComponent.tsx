import React,{useState,useEffect, useContext} from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import  {GlobalContext}  from "./context/Store";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { BsBookmarkStar } from "react-icons/bs";
import Fab from '@mui/material/Fab';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { ModalEditarTarefa } from "./ModalEditarTarefa";
import { TarefasFavoritas } from "./TarefasFavoritas";

export const CardComponent = (val: any) => {
  
  const {
    tarefas,
    excluirTarefas,
    setArmazenarTarefa,
    MacarTarefaComoConcluida,
    tarefasFavoritas,
    setTarefasFavoritas,
    favoritarTarefa,
} = useContext(GlobalContext);

const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] = useState(false);

const closeModalEditarTarefas = () => setISOpenModalEditarTarefas(false);

  const openModalEditarTarefas = (id : number) => {
    setISOpenModalEditarTarefas(true);
    setArmazenarTarefa(id);
    }

    
    return (
      <main className='flex justify-center  items-center'>
            {
      iSOpenModalEditarTarefas?
      <ModalEditarTarefa
      openModalEditarTarefas={openModalEditarTarefas}
      closeModalEditarTarefas={closeModalEditarTarefas}
      />
      :
      null
    }
 
    <section className='bg-slate-300 p-10 
     md:w-[90rem] md:h-[30rem] h-96 m-5 overflow-auto 
     w-72
     '>


      <section className='flex flex-row '>
        {
          tarefasFavoritas.length === 0 ?
          null
          :

          <section className='' >
            <h2 className='text-center text-2xl'>Tarefas favoritas</h2> 
            <div className=''>

            <TarefasFavoritas></TarefasFavoritas>
            </div>
          </section>
        }

      </section>

      <h2 className='text-center text-2xl'>Tarefas do dia 😎</h2> 
     { 


      tarefas.length === 0 ?
      <p className='text-center text-red-500 text-2xl font-bold'>Não existem tarefas 😞</p>

      :
 <section className='grid  grid-cols-1 md:grid-cols-5'>

   {tarefas.map((val) => {
      const TarefaConcluida = val.completed;
      return(
 
      <Box
      component="span"
      sx={{ mx: '2px', transform: 'scale(0.8)'}}
      className=' '
      key={val.id}
    >
       <Card className='w-60 h-32 p-3 bg-yellow-200 '>
  <Typography className={`${TarefaConcluida? 'line-through text-green-500' : 'text-black'}
   w-full break-words h-16 overflow-auto`}
   sx={{ fontSize: 20 }}
   color="text.secondary" gutterBottom>
  {val.tarefa}
  </Typography>
<CardActions className=' flex flex-row justify-between'>
  <button
  className='hover:bg-gray-300 p-2 hover:rounded-full text-red-500'
    onClick={() => excluirTarefas(val.id)}><FaTrash /> </button>
  <button
  className='hover:bg-gray-300 p-2 hover:rounded-full text-green-500'
    onClick={() => MacarTarefaComoConcluida(val.id)}><FaCheck /> </button>
  <button
  className='hover:bg-gray-300 p-2 hover:rounded-full '
    onClick={() => favoritarTarefa(val.id)}><BsBookmarkStar /> </button>
  <button
  className='hover:bg-gray-300 p-2 hover:rounded-full text-blue-500'
    onClick={() => openModalEditarTarefas(val.id)}><FaPen /></button>
</CardActions>
  </Card>
      
    </Box>
      )
    })}
 </section>
}
    </section>
      </main>
  )
}

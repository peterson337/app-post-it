'use client';
import React, {useContext, useState, useRef} from 'react'
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
import { DragEvent } from 'react'; // Importe o tipo DragEvent

export const TarefasFavoritas = () => {
    const {
   
        excluirTarefasFavorita,
        MacarTarefavoritaComoConcluida,
        tarefasFavoritas,
        desfavoritarTarefa,
        atualizarTarefaFavorita,
        setTarefasFavoritas,
    } = useContext(GlobalContext);

          const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] = useState(false);

          const dragListaDeCompra = useRef<number | null>(null);
          const dragOverListaDeCompra = useRef<number | null>(null); 

            const handleDragStart = (e: DragEvent<HTMLElement>, index: number) => {
              dragListaDeCompra.current = index;
              e.dataTransfer.setData('text/plain', String(index));
            };
          
            const handleDragEnter = (e: DragEvent<HTMLElement>, index: number) => {
              dragOverListaDeCompra.current = index;
              e.preventDefault();
            };
        
            const handlerSort = () => {
              if (dragListaDeCompra.current !== null && dragOverListaDeCompra.current !== null) {
                const ListaDeCompraClone = [...tarefasFavoritas];
                const temp = ListaDeCompraClone[dragListaDeCompra.current];
                ListaDeCompraClone[dragListaDeCompra.current] = ListaDeCompraClone[dragOverListaDeCompra.current];
                ListaDeCompraClone[dragOverListaDeCompra.current] = temp;
                setTarefasFavoritas(ListaDeCompraClone);

                localStorage.setItem('tarefasFavoritas', JSON.stringify(ListaDeCompraClone));
        
              }
            };
        

  return (
    <div className='grid  grid-cols-1 xl:grid-cols-3 lg:grid-cols-2'> 
        {/* {
            iSOpenModalEditarTarefas?
            <ModalEditarTarefa/>

            :

            null
        } */}
         {
            
         tarefasFavoritas.map((val, index) => {
        const TarefaConcluida = val.completed;

           return(

            <Box
        component="span"
        sx={{ mx: '2px', transform: 'scale(0.8)'}}
          className='cursor-grab'
        key={val.id}
        draggable
        onDragStart={(e : any) => handleDragStart(e, index)}
        onDragEnter={(e : any) => handleDragEnter(e, index)}
        onDragEnd={handlerSort}
      >
      
         <Card className='md:w-[25rem] w-80  h-60 p-5  bg-yellow-200 text-2xl'>
    <Typography className={`md:text-4xl text-3xl ${TarefaConcluida? 'line-through text-green-500' : 'text-black'}
     w-full break-words h-36 overflow-auto font-bangers`}
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

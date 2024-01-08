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
import Button from '@mui/material/Button';

import { DragEvent } from 'react'; // Importe o tipo DragEvent

export const TarefasFavoritas = () => {
    const {
   
        excluirTarefasFavorita,
        MacarTarefavoritaComoConcluida,
        tarefasFavoritas,
        desfavoritarTarefa,
        atualizarTarefaFavorita,
        setTarefasFavoritas,
        Filtro,
    } = useContext(GlobalContext);

          const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] = useState(false);
            const [Searchtarefas, setSearchtarefas] = useState('');


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
            
            const apagarTodasAsTarefasConcluidas = () => {
              const temTarefaconcluida = tarefasFavoritas.some((tarefa) => tarefa.completed);

              if (!temTarefaconcluida) {
                alert('Deixe uma ou mais tarefa como concluida para usar este botão ');
                return;
              }

              const deletarTarefa = tarefasFavoritas.filter((val) => val.completed === false)
              setTarefasFavoritas(deletarTarefa);
              localStorage.setItem('tarefasFavoritas', JSON.stringify(deletarTarefa));
  
      }

  return (
    <main>
     { Filtro === 1 && tarefasFavoritas.length != 0?
          <div className='flex justify-center items-center flex-col gap-3'>
        <input type="text" className='text-black p-2 rounded-full mt-3 outline-none' 
        onChange={(e) => setSearchtarefas(e.target.value)} value={Searchtarefas}
        placeholder='Pesquise por uma tarefa aqui...'
         />

              <Button variant="contained" onClick={apagarTodasAsTarefasConcluidas}
              className='bg-red-500 hover:bg-red-600 rounded-lg active:bg-red-600 w-72 p-2 md:w-96
               md:text-[20px] font-bold'
                >Apagar tarefas concluidas</Button>

        </div>

        :
        null
}    

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
        const isMatchingSearch = val.tarefa.toLowerCase().includes(Searchtarefas.toLowerCase());


           return(
            <section key={val.id} className='grid  grid-cols-1 xl:grid-cols-3 lg:grid-cols-2'>
            { isMatchingSearch?
              <Box
        component="span"
        sx={{ mx: '2px', transform: 'scale(0.8)'}}
          className='cursor-grab'
        
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

            :

            null
            }  

            </section>
              )
         })
       }

       {/* 
         
       */}
    </div>
    </main>
  )
}

import React,{useState,useEffect, useContext, useRef} from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import  {GlobalContext}  from "./context/Store";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { BsBookmarkStar } from "react-icons/bs";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ListaDeCompra } from "./ListaDeCompra"

import { ModalEditarTarefa } from "./ModalEditarTarefa";
import { TarefasFavoritas } from "./TarefasFavoritas";
import { DragEvent } from 'react'; // Importe o tipo DragEvent

export const CardComponent = () => {
  
  const {
    tarefas,
    excluirTarefas,
    setArmazenarTarefa,
    MacarTarefaComoConcluida,
    tarefasFavoritas,
    Filtro, 
    setFiltro,
    handleChandeTab,
    setTarefasFavoritas,
    favoritarTarefa,
    IsThemeDark,
    setTarefas,
} = useContext(GlobalContext);

const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] = useState(false);

const closeModalEditarTarefas = () => setISOpenModalEditarTarefas(false);

const dragListaDeCompra = useRef<number | null>(null);
const dragOverListaDeCompra = useRef<number | null>(null); 


  const openModalEditarTarefas = (id : number) => {
    setISOpenModalEditarTarefas(true);
    setArmazenarTarefa(id);
    }


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
        const ListaDeCompraClone = [...tarefas];
        const temp = ListaDeCompraClone[dragListaDeCompra.current];
        ListaDeCompraClone[dragListaDeCompra.current] = ListaDeCompraClone[dragOverListaDeCompra.current];
        ListaDeCompraClone[dragOverListaDeCompra.current] = temp;
        setTarefas(ListaDeCompraClone);
        localStorage.setItem('tarefas', JSON.stringify(ListaDeCompraClone));

      }
    };


    
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
 
    <section className={`${IsThemeDark? 'bg-[#373737]' : 'bg-[#edf2fc]'}  md:p-10 
     md:w-[90rem] md:h-[30rem] h-80 m-5 overflow-auto 
     w-96 rounded-xl`}>

      <Tabs value={Filtro} onChange={handleChandeTab} aria-label="basic tabs example"
      className='mt-3'
      >
          <Tab label="Todas as tarefas" className={`font-bangers md:text-2xl 
          ${IsThemeDark? 'text-white' : 'text-black'}`} />

          <Tab label="favoritos"  className={`font-bangers md:text-2xl 
          ${IsThemeDark? 'text-white' : 'text-black'}`} />

          <Tab label="Lista de compras"  className={`font-bangers md:text-2xl 
          ${IsThemeDark? 'text-white' : 'text-black'}`} />
          
        </Tabs>
{       Filtro === 1?
      <section className='flex flex-col '>

        {
          tarefasFavoritas.length === 0 ?
          <p className=' text-red-500 text-[22px] md:text-2xl font-bold m-3 md:text-center
          '>
            Não existem tarefas favoritas 😞
          </p>
          :

            <TarefasFavoritas></TarefasFavoritas>
          
        }

      </section>

      :
      null
}


     { 

      Filtro === 0?
      <div>
  {
          tarefas.length === 0 ?

          <p className='md:text-center text-red-500 md:text-2xl font-bold
           text-start text-[22px] m-3'>
            Não existem tarefas salvas 😞</p>

          :

          <section  
          className='grid  grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 
          '
 
          >
            
            {tarefas.map((val, index) => {
                const TarefaConcluida = val.completed;
                return(
          
                <Box
                component="span"
                sx={{ mx: '2px', transform: 'scale(0.9)'}}
                
                key={val.id}
                draggable
                onDragStart={(e : any) => handleDragStart(e, index)}
                onDragEnter={(e : any) => handleDragEnter(e, index)}
                onDragEnd={handlerSort}
                className='cursor-grab'
              >
                <Card className={`md:w-[25rem] w-80  h-60 p-5 text-2xl ${IsThemeDark? 'bg-[#fef08a]' : 'bg-[#fef08a]'}
                `}
                 >

            <Typography
            className={` text-3xl md:text-4xl ${TarefaConcluida? 'line-through text-green-500' : 'text-black'}
            w-full break-words  h-36 overflow-auto font-bangers`}
            
            color="text.secondary" gutterBottom>
            {val.tarefa}
            </Typography>
          <CardActions className=' flex flex-row justify-between'>
            <button
            className='hover:bg-gray-300 p-3 hover:rounded-full text-red-500'
              onClick={() => excluirTarefas(val.id)}><FaTrash /> </button>
            <button
            className='hover:bg-gray-300 p-3 hover:rounded-full text-green-500'
              onClick={() => MacarTarefaComoConcluida(val.id)}><FaCheck /> </button>
            <button
            className='hover:bg-gray-300 p-3 hover:rounded-full '
              onClick={() => favoritarTarefa(val.id)}><BsBookmarkStar /> </button>
            <button
            className='hover:bg-gray-300 p-3 hover:rounded-full text-blue-500'
              onClick={() => openModalEditarTarefas(val.id)}><FaPen /></button>
          </CardActions>
            </Card>
                
              </Box>
                )
              })}
          </section>
  }
</div>

:

null

}

{
  Filtro === 2?
  <ListaDeCompra></ListaDeCompra>
  // <p>Nenhuma lista de compra encontrada.</p>
  :
  <div>

  </div>
}
    </section>
      </main>
  )
}

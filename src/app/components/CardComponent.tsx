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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ModalEditarTarefa } from "./ModalEditarTarefa";
import { TarefasFavoritas } from "./TarefasFavoritas";

export const CardComponent = (val: any) => {
  
  const {
    tarefas,
    excluirTarefas,
    setArmazenarTarefa,
    MacarTarefaComoConcluida,
    tarefasFavoritas,
    //  Filtro,
    //  setFiltro,
    setTarefasFavoritas,
    favoritarTarefa,
} = useContext(GlobalContext);

const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] = useState(false);

const closeModalEditarTarefas = () => setISOpenModalEditarTarefas(false);

 const [Filtro, setFiltro] = useState<number>(0);
 const handleChandeTab = (event: React.SyntheticEvent, newValue: number) => {
   setFiltro(newValue)
 }

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

      <Tabs value={Filtro} onChange={handleChandeTab} aria-label="basic tabs example">
          <Tab label="Todas as tarefas" />
          <Tab label="tarefas favoritas"  />
        </Tabs>
{       Filtro === 1?
      <section className='flex flex-col '>

        {
          tarefasFavoritas.length === 0 ?
          <p className=' text-red-500 text-2xl font-bold mt-3'> <span className=' flex flex-row items-center gap-4'>
            Adicione uma tarefa nos favoritos clicando no 
          seguinte botão: <BsBookmarkStar></BsBookmarkStar></span></p>
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

          <p className='text-center text-red-500 text-2xl font-bold'>Não existem tarefas salvas 😞</p>

          :

          <section  className='grid  grid-cols-1 md:grid-cols-3'>
            
            {tarefas.map((val) => {
                const TarefaConcluida = val.completed;
                return(
          
                <Box
                component="span"
                sx={{ mx: '2px', transform: 'scale(0.8)'}}
                className=' '
                key={val.id}
              >
                <Card className='w-96 h-60 p-3 bg-yellow-200'>
            <Typography className={`${TarefaConcluida? 'line-through text-green-500' : 'text-black'}
            w-full break-words h-40 overflow-auto`}
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
</div>

:

null

}
    </section>
      </main>
  )
}

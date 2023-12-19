'use client'
import React,{useState,useEffect, useContext} from 'react'
import  {GlobalContext}  from "./context/Store";
import { Modal } from "../components/Modal";
import { CardComponent } from "../components/CardComponent";
import { FaPlus } from "react-icons/fa";
import Fab from '@mui/material/Fab';


export const Tarefas = () => {


    const {
      tarefas,
      tarefasFavoritas,
      excluirTarefas,
      setArmazenarTarefa,
      MacarTarefaComoConcluida,
  } = useContext(GlobalContext);

  const openModalCreateTarefas = () => setISOpenModalCreateTareas(true)
  const closeModalCreateTarefas = () => setISOpenModalCreateTareas(false)

  const [iSOpenModalCreateTareas, setISOpenModalCreateTareas] = useState(false);

  return (
    <main className='flex flex-col h-[100vh] justify-between '>



  {iSOpenModalCreateTareas?
   <Modal
   setISOpenModalCreateTareas={setISOpenModalCreateTareas}
 />
   : null}

     
        <CardComponent/>
       
      

<div className='w-full flex justify-end'>
<Fab 
    color="primary" 
    sx={{mx: '20px', my: '95px',}}
    onClick={openModalCreateTarefas}
  >
    <FaPlus />
  </Fab>

</div>


  
    </main>
  )
}

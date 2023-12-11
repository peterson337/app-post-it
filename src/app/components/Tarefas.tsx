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
  openModalCreateTarefas={openModalCreateTarefas}
  closeModalCreateTarefas={closeModalCreateTarefas}
 />
   : null}

     
        <CardComponent/>
       
      

<div className='w-full flex justify-end'>
      <Fab
      aria-label="add"
      className='mr-2 mb-24 bg-sky-500 hover:bg-sky-700'
      onClick={openModalCreateTarefas} 
      >
      <FaPlus/>
      </Fab>

</div>


  
    </main>
  )
}

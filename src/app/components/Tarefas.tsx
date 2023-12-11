'use client'
import React,{useState,useEffect, useContext} from 'react'
import  {GlobalContext}  from "./context/Store";
import { Modal } from "../components/Modal";
import { CardComponent } from "../components/CardComponent";
import { ModalEditarTarefa } from "./ModalEditarTarefa";
import { FaPlus } from "react-icons/fa";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
export const Tarefas = () => {


    const {
      tarefas,
      TarefaConcluida,
      excluirTarefas,
      setArmazenarTarefa,
      MacarTarefaComoConcluida,
  } = useContext(GlobalContext);

  const openModalCreateTarefas = () => setISOpenModalCreateTareas(true)
  const closeModalCreateTarefas = () => setISOpenModalCreateTareas(false)

  const openModalEditarTarefas = (id : number) => 
  {setISOpenModalEditarTarefas(true); setArmazenarTarefa(id)}

  const closeModalEditarTarefas = () => setISOpenModalEditarTarefas(false)


  const [iSOpenModalCreateTareas, setISOpenModalCreateTareas] = useState(false);
  const [iSOpenModalEditarTarefas, setISOpenModalEditarTarefas] = useState(false);

  return (
    <main className='flex flex-col h-screen justify-between '>

      {
        iSOpenModalEditarTarefas?
        <ModalEditarTarefa
        openModalEditarTarefas={openModalEditarTarefas}
        closeModalEditarTarefas={closeModalEditarTarefas}
        />
        :
        null
      }

  {iSOpenModalCreateTareas?
   <Modal
  openModalCreateTarefas={openModalCreateTarefas}
  closeModalCreateTarefas={closeModalCreateTarefas}
 />
   : null}

      {
        tarefas.length === 0 ?
        <p>Não existem tarefas</p>

        :
        <CardComponent/>
       
      }

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

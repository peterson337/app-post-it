'use client'
import React,{useState,useEffect, useContext} from 'react'
import  {GlobalContext}  from "./context/Store";
import { Modal } from "../components/Modal";
import { CardComponent } from "../components/CardComponent";
import { FaPlus } from "react-icons/fa";
import Fab from '@mui/material/Fab';


export const Tarefas = () => {


    const {Filtro} = useContext(GlobalContext);

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
       
      

{   Filtro === 0? 
  <div className='w-full flex justify-end 
                mb-10
                '>
<Fab 
    className='bg-sky-500 hover:bg-sky-700 text-white 
    md:mb-24 md:mr-10   
    mb-32 mr-5'
    onClick={openModalCreateTarefas}
  >
    <FaPlus />
  </Fab>

</div>

:

null
}


  
    </main>
  )
}

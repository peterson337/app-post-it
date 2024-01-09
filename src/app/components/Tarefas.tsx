'use client'
import React,{useState,useEffect, useContext, useRef} from 'react'
import  {GlobalContext}  from "./context/Store";
import { Modal } from "../components/Modal";
import { CardComponent } from "../components/CardComponent";
import Fab from '@mui/material/Fab';

import { FaPlus } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";



export const Tarefas = () => {


    const {Filtro, isOpenModal, setIsOpenModal,} = useContext(GlobalContext);

  const openModalCreateTarefas = () => setISOpenModalCreateTareas(true)
  const closeModalCreateTarefas = () => setISOpenModalCreateTareas(false)

  const [iSOpenModalCreateTareas, setISOpenModalCreateTareas] = useState(false);

  useEffect(() => {
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  const handleKeyPress = (event: any) => {
    if (event.ctrlKey && event.key === 'm') {
      setISOpenModalCreateTareas(true);
      
    }else if(event.ctrlKey && event.key === ','){
      setIsOpenModal(true);

    }
  };
  
  return (
    <main className='flex flex-col
      h-[450px] lg:h-screen  justify-between  '>



  {iSOpenModalCreateTareas?
   <Modal
   setISOpenModalCreateTareas={setISOpenModalCreateTareas}
 />
   : null}

     
        <CardComponent/>
       
      

{   Filtro === 0 || Filtro === 2? 
  <div className='w-full flex justify-end 
                '>
<Fab 
    className={`${Filtro === 0 ? 'bg-sky-500' : 'bg-green-500'}
     ${Filtro === 0 ? 'hover:bg-sky-700' : 'hover:bg-green-700'}
     text-white 
     text-2xl
    xl:mb-28 md:mr-10   
     mr-5`}
    onClick={Filtro === 0 ? openModalCreateTarefas : () => setIsOpenModal(true)}
    onKeyPress={handleKeyPress}
    //     onKeyPress={handleKeyPress  as unknown as KeyboardEvent}

  >
 {  Filtro === 0? <FaPlus /> : <FaCartPlus />  }
  </Fab>

</div>

:

null
}


  
    </main>
  )
}

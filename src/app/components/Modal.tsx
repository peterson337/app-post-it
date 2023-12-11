'use client';
import React, {useContext, useState} from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {Props, T} from "./ts/types";
import  {GlobalContext}  from "./context/Store";


export const Modal = ( {openModalCreateTarefas, closeModalCreateTarefas} : Props) => {

    const [anotarTarefas, setAnotarTarefas] = useState('');
    
    const {
        tarefas,

        setTarefas,
    } = useContext(GlobalContext);
    
    const salvarTarefa = () => {
        // anotarTarefas.length === 0?
        // alert('Por favor escreva alguma coisa para salvar uma tarefa');
        // :
        const obj = {
            tarefa: anotarTarefas,
            id: tarefas.length + 1,
             completed: false
        }
        setTarefas([...tarefas, obj])
        // setAnotarTarefas('');
        // closeModalCreateTarefas();
    }

  return (
    <Dialog  
    onClose={closeModalCreateTarefas} 
    open={openModalCreateTarefas}
    className='flex flex-col justify-center items-center text-center p-12'
    >
        <section className='p-4'>
    <DialogTitle className='border-b border-black mb-2'>Criar tarefa</DialogTitle>

    <TextField id="standard-basic" label="Standard" variant="standard"
     onChange={(e : T) => setAnotarTarefas(e.target.value)} value={anotarTarefas}
     />

    
    <div className='flex flex-row m-3 gap-3'>

        <Button variant="contained" className='bg-red-500 hover:bg-red-700'
         onClick={closeModalCreateTarefas}
        >
        Cancelar
        </Button>

        <Button variant="contained" className='bg-sky-500 hover:bg-sky-700'
         onClick={salvarTarefa}>
        Criar tarefa
        </Button>
        
    </div>

        </section>
  
  
  </Dialog>
  )
}

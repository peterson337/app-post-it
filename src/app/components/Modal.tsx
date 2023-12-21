'use client';
import React, {useContext, useState} from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {Props} from "./ts/types";
import  {GlobalContext}  from "./context/Store";


export const Modal: React.FC<Props> = ( {setISOpenModalCreateTareas} : Props) => {

    const [anotarTarefas, setAnotarTarefas] = useState('');
    
    const {
        tarefas,
        setTarefas,
    } = useContext(GlobalContext);
    
    const salvarTarefa = () => {
    
         if (!anotarTarefas.trim()) {
             alert('Por favor escreva alguma coisa para salvar uma tarefa');
             return;
            
         }

        const obj = {
            tarefa: anotarTarefas,
            id: new Date().getTime(),
            completed: false
        }
        setTarefas([...tarefas, obj]);

        localStorage.setItem('tarefas', JSON.stringify([...tarefas, obj]));

         setAnotarTarefas('');
         setISOpenModalCreateTareas(false);
        
    }

  return (
    <Dialog  
    onClose={() => setISOpenModalCreateTareas(false)} 
    open={typeof setISOpenModalCreateTareas === 'function' ? true : setISOpenModalCreateTareas}
    className='flex flex-col justify-center items-center text-center p-12'
    >
        <section className='p-4 md:p-8'>
    <DialogTitle className='font-bangers text-2xl md:text-3xl'>
        Criar tarefa
    </DialogTitle>



        <TextField
          fullWidth 
          id="standard-basic"
          label="Tarefa"
          variant="standard"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnotarTarefas(e.target.value)}
          value={anotarTarefas}
          required // Adicione esta linha para tornar o campo obrigatório
        />

    
    <div className='flex flex-row m-3 gap-3'>

        <Button variant="contained"
         className='bg-red-500 hover:bg-red-700 h-12 font-bangers text-2xl'
         onClick={() => setISOpenModalCreateTareas(false)}
        >
        Cancelar
        </Button>

        <Button variant="contained"
         className='bg-sky-500 hover:bg-sky-700 h-12 w-40 font-bangers text-2xl'
         onClick={salvarTarefa}>
        Salvar tarefa
        </Button>
        
    </div>

        </section>
  
  
  </Dialog>
  )
}

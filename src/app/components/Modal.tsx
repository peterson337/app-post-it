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
        <section className='p-4'>
    <DialogTitle className='border-b border-black mb-2'>Criar tarefa</DialogTitle>



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

        <Button variant="contained" className='bg-red-500 hover:bg-red-700'
         onClick={() => setISOpenModalCreateTareas(false)}
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

import React, {useContext, useEffect} from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {Props, T} from "./ts/types";
import  {GlobalContext}  from "./context/Store";
export const ModalEditarTarefa = ({openModalEditarTarefas, closeModalEditarTarefas}: Props ) => {
useEffect(() => {
    const teste = tarefas.find((val) => {
        if (val.id === ArmazenarTarefa) {
          setAnotarTarefasEditada(val.tarefa);
          
        }
      
      });
}, [])

    const {
        tarefas,
        anotarTarefasEditada,
        setAnotarTarefasEditada,
        ArmazenarTarefa,
        setTarefas,
        atualizarTarefa,
    } = useContext(GlobalContext);
  return (

     <Dialog  
     onClose={closeModalEditarTarefas} 
     open={openModalEditarTarefas}
     className='flex flex-col justify-center items-center text-center p-12'
     >
         <section className='p-4'>
     <DialogTitle className='border-b border-black mb-2'>Editar Tarefa</DialogTitle>

     <TextField id="standard-basic" label="Standard" variant="standard"
      onChange={(e : T) => setAnotarTarefasEditada(e.target.value)} value={anotarTarefasEditada}
      />

     <div className='flex flex-row m-3 gap-3'>
         <Button variant="contained" className='bg-red-500 hover:bg-red-700' 
         onClick={closeModalEditarTarefas}
         >Cancelar</Button>
         <Button variant="contained" className='bg-sky-500 hover:bg-sky-700'
          onClick={() => atualizarTarefa(ArmazenarTarefa)}>
            Salvar tarefa editada
        </Button>
     </div>

         </section>
  
  
  </Dialog>
  )
}

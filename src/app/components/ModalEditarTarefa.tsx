'use client';
import React, {useContext, useEffect, useState} from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {TypesEditarTarefa} from "./ts/types";
import  {GlobalContext}  from "./context/Store";
export const ModalEditarTarefa: React.FC<TypesEditarTarefa> = ({openModalEditarTarefas, closeModalEditarTarefas}
  :
   TypesEditarTarefa ) => {

  const [teste, setTeste] = useState('');
  const {
      tarefas,
      ArmazenarTarefa,
      setTarefas,
  } = useContext(GlobalContext);

            useEffect(() => {
                      tarefas.find((val) => {
                    if (val.id === ArmazenarTarefa) {
                      setTeste(val.tarefa);
                      
                    }
                  
                  });
            }, [])

const atualizarTarefa = (ArmazenarTarefa : number) => {
  if (!teste.trim()) {
    alert('Por favor escreva alguma coisa para salvar uma tarefa');
    return;
   
}

  const atualizarTarefa = tarefas.map(
    (val) => val.id === ArmazenarTarefa? { ...val, tarefa: teste } : val
    )

    setTarefas(atualizarTarefa);
  localStorage.setItem('tarefas', JSON.stringify(atualizarTarefa));
  closeModalEditarTarefas();
  
}
  return (

     <Dialog  
     onClose={closeModalEditarTarefas} 
     open={typeof openModalEditarTarefas === 'function' ? true : openModalEditarTarefas}
     className='flex flex-col justify-center items-center text-center p-12'
     >
         <section className='p-2 md:p-8'>
     <DialogTitle className='mb-2 font-bangers text-2xl md:text-3xl'>
      Editar Tarefa</DialogTitle>

     <TextField id="standard-basic" label="Standard" variant="standard"
      fullWidth 
      onChange={(e :  React.ChangeEvent<HTMLInputElement>) => setTeste(e.target.value)}
      value={teste}
      />

     <div className='flex flex-row m-3 gap-3 items-center'>
         <Button variant="contained" className='bg-red-500 hover:bg-red-700 
          font-bangers text-2xl   h-12' 
         onClick={closeModalEditarTarefas}
         >Cancelar</Button>
         <Button variant="contained" className='bg-sky-500 hover:bg-sky-700 
          font-bangers text-2xl  h-16 md:h-12 w-40 md:w-60'
          onClick={() => atualizarTarefa(ArmazenarTarefa)}>
            Salvar tarefa editada
        </Button>
     </div>

         </section>
  
  
  </Dialog>
  )
}

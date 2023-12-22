'use client';
import React, {useState, useContext} from 'react'
import { Types, Tarefas } from "./context/ts/types";
import { List } from "./List";


export const ListaDeCompra = () => {

        const [adiconarTarefaDeCompra, setAdiconarTarefaDeCompra,] = useState('');



          const [ListaDeCompra, setListaDeCompra] = useState<Tarefas[]>([]);

            const adcionarTarefa = () => {
              if ( adiconarTarefaDeCompra.length === 0) {
                alert('Escreva uma tarefa')                 
                return
              }


                const obj = {
                    tarefa: adiconarTarefaDeCompra,
                    id: new Date().getTime(),
                    completed: false
                }
                setListaDeCompra([...ListaDeCompra, obj]);

                setAdiconarTarefaDeCompra('');

                localStorage.setItem('listaDeCompra', JSON.stringify([...ListaDeCompra, obj]));



            }

  return (
    <main className='p-3'>

        <div className=''>
     
        <section className='flex   gap-2 flex-col justify-center m-5 '>

            
              <input type="text" value={adiconarTarefaDeCompra}
              className='text-black border-[#ccc] border p-2 rounded-full'
              placeholder='Escreva uma tarefa' 
              onChange={(e) => setAdiconarTarefaDeCompra(e.target.value)} />

              <button className='bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-full' onClick={adcionarTarefa}>Adcionar tarefa</button>
            </section>
        </div>

        <List ListaDeCompra={ListaDeCompra} setListaDeCompra={setListaDeCompra}/>
    </main>
  )
}

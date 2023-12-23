'use client';
import React, {useRef, useState, useEffect, useContext} from 'react'
import { ListaDeCompra, Tarefas} from "./context/ts/types";
import  {GlobalContext}  from "./context/Store";

import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
import { DragEvent } from 'react'; // Importe o tipo DragEvent
export const List = ({ListaDeCompra, setListaDeCompra} : {ListaDeCompra: Tarefas[], setListaDeCompra: React.Dispatch<React.SetStateAction<Tarefas[]>>}) => {
  const dragListaDeCompra = useRef<number | null>(null);
    const dragOverListaDeCompra = useRef<number | null>(null);    
    const [atualizarTarefaDeCompra, setAtualizarTarefaDeCompra,] = useState('');
    const [tarefaEmEdicaoId, setTarefaEmEdicaoId] = useState<number | null>(null); 
    const [SearchTarefas, setSearchTarefas] = useState('');


    const {Filtro} = useContext(GlobalContext);

    const handlerSort = () => {
        if (dragListaDeCompra.current !== null && dragOverListaDeCompra.current !== null) {
          const ListaDeCompraClone = [...ListaDeCompra];
          const temp = ListaDeCompraClone[dragListaDeCompra.current];
          ListaDeCompraClone[dragListaDeCompra.current] = ListaDeCompraClone[dragOverListaDeCompra.current];
          ListaDeCompraClone[dragOverListaDeCompra.current] = temp;
          setListaDeCompra(ListaDeCompraClone);
        }
      };

      
      const MacarTarefaComoConcluida = (id: number) => {
        const atualizarTarefa = ListaDeCompra.map((val) => {
          if (val.id === id) {
                return { ...val, completed: !val.completed };
            }   
            return val;
        });
        setListaDeCompra(atualizarTarefa);
        localStorage.setItem('listaDeCompra', JSON.stringify(atualizarTarefa));
        
    }
    const excluirTarefas = (id: number) => {
        const deletarTarefa = ListaDeCompra.filter((val) => val.id != id)
        setListaDeCompra(deletarTarefa);
        localStorage.setItem('listaDeCompra', JSON.stringify(deletarTarefa));
        
      }

      const atualizarTarefaFavorita = (id: number) => {
        setAtualizarTarefaDeCompra('');
        const atualizarTarefaFavorita = ListaDeCompra.map((val : Tarefas) => val.id === id? 
        { ...val, tarefa: atualizarTarefaDeCompra } : val)
        
        setListaDeCompra(atualizarTarefaFavorita);
        
        setTarefaEmEdicaoId(null); 

        localStorage.setItem('listaDeCompra', JSON.stringify(atualizarTarefaFavorita));
        
      }
      
      useEffect(() => {
        const ListaDeCompraLocalStorage = localStorage.getItem('listaDeCompra');
        
        if (ListaDeCompraLocalStorage) {
          setListaDeCompra(JSON.parse(ListaDeCompraLocalStorage));
        }
      }, [])
      
      const handleDragStart = (e: DragEvent<HTMLElement>, index: number) => {
        dragListaDeCompra.current = index;
        e.dataTransfer.setData('text/plain', String(index));
      };
    
      const handleDragEnter = (e: DragEvent<HTMLElement>, index: number) => {
        dragOverListaDeCompra.current = index;
        e.preventDefault();
      };

        const [Searchtarefas, setSearchtarefas] = useState('');

    
      return (
        <main className=''>
            <section className='bg-white p-3   m-3 h-96 overflow-auto  rounded-xl'>

            { Filtro === 2 && ListaDeCompra.length != 0?
          <div className='flex justify-center items-center'>
        <input type="text" className='text-black p-2 rounded-full border border-black
          mt-3 outline-none bg-[#edf2fc]' 
        onChange={(e) => setSearchtarefas(e.target.value)} value={Searchtarefas}
        placeholder='Pesquise por uma tarefa aqui...'
         />

        </div>

        :
        null
}

          {
            ListaDeCompra.length === 0 ?
            <h1 className='text-center text-red-500 font-bold text-2xl'>Nenhuma tarefa de compra adicionada</h1> 
            :
          ListaDeCompra.map((item, index) => {
            const tarefaSalva = item.completed;
            const isMatchingSearch = item.tarefa.toLowerCase().includes(Searchtarefas.toLowerCase());

            return(
              <section key={item.id} >
               {  isMatchingSearch ?
               <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handlerSort}
                  className={`  p-3 border m-3 border-b-[#ccc] 
                  flex  flex-row justify-between ${tarefaSalva ? 'bg-green-500' : 'bg-red-500'}
                  `}
                >
                  {  tarefaEmEdicaoId != item.id?
                    <p className={`${tarefaSalva ? 'line-through' : ''}`}>{item.tarefa}</p>
                    :
                    <input type="text" className='text-black  w-28 md:w-96 p-1 rounded-full pl-3 outline-none'
                    value={atualizarTarefaDeCompra.length === 0 ? item.tarefa : atualizarTarefaDeCompra} 
                    onChange={(e) => setAtualizarTarefaDeCompra(e.target.value)} />
                  } 

                  <div className='flex  flex-row gap-4'>
                    <button  onClick={ tarefaEmEdicaoId === null?   () => setTarefaEmEdicaoId(item.id)  :
                    atualizarTarefaDeCompra.length === 0? () => setTarefaEmEdicaoId(null) : tarefaEmEdicaoId === item.id?
                    () => atualizarTarefaFavorita(item.id) : () => setTarefaEmEdicaoId(null)
                    }>
                        { tarefaEmEdicaoId === item.id? <IoIosSave /> :  <FaPen/>  }
                    </button>
                    <button onClick={() => excluirTarefas(item.id)}>
                        <FaTrash></FaTrash>
                    </button>
                    <button onClick={() => MacarTarefaComoConcluida(item.id)}>
                        <FaCheck></FaCheck>
                    </button>

                  </div>
               </div>
               :
               null
              }
              </section>

            )
          })}   
            </section>
        </main>
      );
}

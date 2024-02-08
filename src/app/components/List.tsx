'use client';
import React, {useRef, useState, useEffect, useContext} from 'react'
import { ListaDeCompra, Tarefas} from "./context/ts/types";
import  {GlobalContext}  from "./context/Store";

import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
import { DragEvent } from 'react'; // Importe o tipo DragEvent
export const List = ({ListaDeCompra, setListaDeCompra, precoTotal, setPrecoTotal} : {ListaDeCompra: Tarefas[], setListaDeCompra: React.Dispatch<React.SetStateAction<Tarefas[]>>
  , precoTotal: number, setPrecoTotal: React.Dispatch<React.SetStateAction<number>>}) => {
  const dragListaDeCompra = useRef<number | null>(null);
    const dragOverListaDeCompra = useRef<number | null>(null);    
    const [atualizarTarefaDeCompra, setAtualizarTarefaDeCompra,] = useState('');
    const [tarefaEmEdicaoId, setTarefaEmEdicaoId] = useState<number | null>(null); 
    const [SearchTarefas, setSearchTarefas] = useState('');
    const [ArmazenarValueNUmber, setArmazenarValueNUmber] = useState('');
    const refUpdateInputNumber = useRef<HTMLInputElement | null>(null);

    


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


const itemEncontrado = ListaDeCompra.find((val) => val.id === id);

if (itemEncontrado) {
    if (precoTotal < 0) {
        setPrecoTotal(0);
    } else if (precoTotal > 0) {
        setPrecoTotal((prev) => prev - itemEncontrado.preco);
    }
}


        const deletarTarefa = ListaDeCompra.filter((val) => val.id != id)
        setListaDeCompra(deletarTarefa);
        localStorage.setItem('listaDeCompra', JSON.stringify(deletarTarefa));
        
      }

      const atualizarTarefaFavorita = (id: number) => {
        setAtualizarTarefaDeCompra('');

        const preco = refUpdateInputNumber.current

        const itemEncontrado = ListaDeCompra.find((val) => val.id === id);

          if (precoTotal < 0) {
            setPrecoTotal(0);
        } else if (precoTotal > 0) {
          ListaDeCompra.find((val) => val.id === id ? setPrecoTotal((prev) => prev - val.preco + preco) : null);
        }
        
        console.log(precoTotal);

        //ListaDeCompra.find((val) => val.id === id ? setPrecoTotal((prev) => (prev - val.preco) + preco) : null);

        const atualizarTarefaFavorita = ListaDeCompra.map((val : Tarefas) => val.id === id? 
        { ...val, tarefa: atualizarTarefaDeCompra, preco: refUpdateInputNumber.current } : val)
        
        setListaDeCompra(atualizarTarefaFavorita);
        
        setTarefaEmEdicaoId(null); 

        localStorage.setItem('listaDeCompra', JSON.stringify(atualizarTarefaFavorita));
        
      }
      
      useEffect(() => {
        const ListaDeCompraLocalStorage = localStorage.getItem('listaDeCompra');
        
        if (ListaDeCompraLocalStorage) {
          setListaDeCompra(JSON.parse(ListaDeCompraLocalStorage));
          const teste = JSON.parse(ListaDeCompraLocalStorage);
          //setPrecoTotal(teste[2].precoTotal);

           teste.find((val : number) => { 
            const teste2 = val.precoTotal; 
            setPrecoTotal(teste2);
          })
          
          
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


        const armzenarInputNumber = ((e : number) => refUpdateInputNumber.current = e);

        const [Searchtarefas, setSearchtarefas] = useState('');

    const salveState = (id : number) => {

      ListaDeCompra.find((val) => {
        if (id === val.id) {
          
          setTarefaEmEdicaoId(id); 

          setArmazenarValueNUmber(val.preco)
  
          refUpdateInputNumber.current = val.preco;

          console.log(refUpdateInputNumber);
  
        }

      });

    }
      return (
        <main className=''>
            <section className=''>

            { Filtro === 2 && ListaDeCompra.length != 0?
          <div className='flex justify-center items-center'>
            <p>Preço total da compra R${precoTotal}</p>
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

            <div className=' h-72 overflow-auto 
            scrollbar-thin scrollbar-thumb-sky-500 
     scrollbar-track-sky-300   scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
            '>
          {ListaDeCompra.map((item, index) => {
            const tarefaSalva = item.completed;
            const isMatchingSearch = item.tarefa.toLowerCase().includes(Searchtarefas.toLowerCase());

            return(
              <section key={item.id}>
               {  isMatchingSearch ?
               <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handlerSort}
                  className={`  p-3 border m-3 border-b-[#ccc] 
                  flex  flex-row justify-between ${tarefaSalva ? 'bg-green-500' : 'bg-red-500'}
                 border-0 rounded-lg `}
                >
                  {  tarefaEmEdicaoId != item.id?
                  <>
                    <p className={`${tarefaSalva ? 'line-through' : ''}`}>{item.tarefa}</p>

                    <p className={`${tarefaSalva ? 'line-through' : ''}`}>{item.preco}</p>

                  </>
                      :

                    <>
                    <input type="text" className='text-black  w-28 md:w-96 p-1 rounded-full pl-3 outline-none'
                    value={atualizarTarefaDeCompra.length === 0 ? item.tarefa : atualizarTarefaDeCompra} 
                    onChange={(e) => setAtualizarTarefaDeCompra(e.target.value)} />
                    

                    <input type="number" ref={refUpdateInputNumber}  onChange={(e) => armzenarInputNumber(e.target.valueAsNumber as unknown as number)}
                      className='text-black p-2 rounded-full border border-black'
                       />
                    </>

                  } 

                  <div className='flex  flex-row gap-4'>
                    <button  onClick={ tarefaEmEdicaoId === null?   () => salveState(item.id) :
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
            </div>
          }   
            </section>
        </main>
      );
}

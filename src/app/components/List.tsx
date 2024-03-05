'use client';
import React, {useRef, useState, useEffect, useContext, Dispatch, SetStateAction, Fragment} from 'react'
import { TarefasDeCompra} from "./context/ts/types";
import  {GlobalContext}  from "./context/Store";

import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
import { DragEvent } from 'react'; // Importe o tipo DragEvent
import { validateHeaderName } from 'http';
export const List = ({ListaDeCompra, setListaDeCompra, precoTotal, setPrecoTotal} : {ListaDeCompra: TarefasDeCompra[], setListaDeCompra: React.Dispatch<React.SetStateAction<TarefasDeCompra[]>>
  , precoTotal: number, setPrecoTotal: Dispatch<SetStateAction<number>>}) => {
  const dragListaDeCompra = useRef<number | null>(null);
    const dragOverListaDeCompra = useRef<number | null>(null);    
    const [atualizarTarefaDeCompra, setAtualizarTarefaDeCompra,] = useState('');
    const [tarefaEmEdicaoId, setTarefaEmEdicaoId] = useState<number | null>(null); 
    const [SearchTarefas, setSearchTarefas] = useState('');
    const [ArmazenarValueNUmber, setArmazenarValueNUmber] = useState<number>(0);
  
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

      const precoItemEncontrado = itemEncontrado.preco;
      
      const resultadoFinal =  precoTotal - precoItemEncontrado ;

        setPrecoTotal(resultadoFinal);
     localStorage.setItem('precoTotal', JSON.stringify(resultadoFinal));

    }
}


         const deletarTarefa = ListaDeCompra.filter((val) => val.id != id)
         setListaDeCompra(deletarTarefa);
         localStorage.setItem('listaDeCompra', JSON.stringify(deletarTarefa));
        
      }

      const atualizarTarefaFavorita = (id: number) => {
           if (precoTotal < 0) {
             setPrecoTotal(0);
         } else if (precoTotal > 0 || precoTotal === 0) {

          ListaDeCompra.find((item) => {
            if (item.id === id) {
              
              
              const diferençaDePreço =  precoTotal as number - item.preco ;
              if (precoTotal !== null && ArmazenarValueNUmber !== null) {
                const resultadoFinal =  ArmazenarValueNUmber +  diferençaDePreço;
                
                const atualizarTarefaFavorita = ListaDeCompra.map((val : TarefasDeCompra) => val.id === id? 
                { ...val, tarefa: atualizarTarefaDeCompra, preco: ArmazenarValueNUmber, precoTotal: resultadoFinal} : val)
               
                setListaDeCompra(atualizarTarefaFavorita as unknown as TarefasDeCompra[]);
  
                setPrecoTotal(resultadoFinal);
               
                setTarefaEmEdicaoId(null); 
       
                setArmazenarValueNUmber(0);
             
                setAtualizarTarefaDeCompra('');
                localStorage.setItem('listaDeCompra', JSON.stringify(atualizarTarefaFavorita));
  
                localStorage.setItem('precoTotal', JSON.stringify(resultadoFinal));
  
            }
            }
              
            
        })
         }
      }
      
      useEffect(() => {
        const ListaDeCompraLocalStorage = localStorage.getItem('listaDeCompra');
        const precoTotalStorage = localStorage.getItem('precoTotal');
        
        if (ListaDeCompraLocalStorage) {
          const teste = JSON.parse(ListaDeCompraLocalStorage);
          setListaDeCompra(teste);
        }
        
        if (precoTotalStorage) {
          const formatNumber = JSON.parse(precoTotalStorage);
          setPrecoTotal(formatNumber);
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

          const teste = precoTotal.toFixed(2);

          const editInputTeactAndInputNumber = (id : number) => {
            setTarefaEmEdicaoId(id);
             ListaDeCompra.find((val) => {
              if (val.id === id) {
                setAtualizarTarefaDeCompra(val.tarefa);
                setArmazenarValueNUmber(val.preco);
              }
             })            
          }

      return (
        <>
            <section className=''>

            { Filtro === 2 && ListaDeCompra.length != 0?
          <div className='flex justify-center items-center mb-4'>
        <input type="text" className='text-black p-2 rounded-full border border-black
           outline-none bg-[#edf2fc]' 
        onChange={(e) => setSearchtarefas(e.target.value)} value={Searchtarefas}
        placeholder='Pesquise por uma tarefa aqui...'
         />



        </div>

        :
        null
}

          {
            ListaDeCompra.length === 0 ?
            <h2 className='text-center text-red-500 font-bold text-2xl'>Nenhum produto foi adicionado</h2> 
            :

           <>
            <div className=' h-72 overflow-auto 
            scrollbar-thin scrollbar-thumb-sky-500 
     scrollbar-track-sky-300   scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
            '>
              <div 
            className='grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-rows-4 '
            >
              {ListaDeCompra.map((item : TarefasDeCompra, index : number) => {
            const tarefaSalva : boolean = item.completed;
            const isMatchingSearch = item.tarefa.toLowerCase().includes(Searchtarefas.toLowerCase());
          const teste = item.preco.toFixed(2);


            return(
              <Fragment key={item.id}>

                {  isMatchingSearch ?
               <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handlerSort}
                  className={`p-3 border m-3 border-b-[#ccc] 
                  flex  flex-col justify-between ${tarefaSalva ? 'bg-green-500' : 'bg-red-500'}
                 border-0 rounded-lg w-[288px] gap-3 md:w-80  `}
                >
                  {  tarefaEmEdicaoId != item.id?
                  <>
                  <div 
                  className=' w-[270px] md:w-72 overflow-auto scrollbar-thin p-1 h-14 '>
                    <p className={`${tarefaSalva ? 'line-through' : ''} `}>{item.tarefa}</p>
                  </div>

                    <p className={`${tarefaSalva ? 'line-through' : ''} mb-3`}>{teste}</p>

                  </>
                      :

                    <>
                    <textarea  className='text-black  w-60 md:w-72 p-3 rounded-xl pl-3 
                    outline-none resize-none '
                    value={atualizarTarefaDeCompra} 
                    onChange={(e) => setAtualizarTarefaDeCompra(e.target.value)} />
                    

                      
                    <input type="number" 
                     value={ArmazenarValueNUmber}
                     onChange={(e) => setArmazenarValueNUmber(e.target.valueAsNumber as unknown as number)}
                      className='text-black  w-60 md:w-72 p-1 rounded-full pl-3 outline-none'
                       />
                    </>

                  } 

                  <div className='flex  flex-row justify-between	 '>
                    <button  onClick={ tarefaEmEdicaoId === null?   () => editInputTeactAndInputNumber(item.id) :
                    atualizarTarefaDeCompra.length === 0 || ArmazenarValueNUmber === null? () => setTarefaEmEdicaoId(null) 
                    : tarefaEmEdicaoId === item.id?
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

               
              </Fragment>

            )
          })}
              </div>
         
            </div>
            <p className=' m-5 text-end'>Preço total da compra R${teste}</p>
           </>
          }   
   

            </section>
        </>
      );
}
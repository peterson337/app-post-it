'use client';
import React, {useState, useContext, useEffect, useRef} from 'react'
import { Types, Tarefas } from "./context/ts/types";
import { List } from "./List";
import  {GlobalContext}  from "./context/Store";



export const ListaDeCompra = () => {

        const [adiconarTarefaDeCompra, setAdiconarTarefaDeCompra,] = useState('');

        const [precoTotal, setPrecoTotal,] = useState(0);

        const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {if (e.key === 'Enter') { adcionarTarefa()}};


          const [ListaDeCompra, setListaDeCompra] = useState<Tarefas[]>([]);

          const {Filtro,    isOpenModal, 
            setIsOpenModal,} = useContext(GlobalContext);

            const refInputNumber = useRef<HTMLInputElement | null>(null);

            const precoTotalRef = useRef<number>(0); 

            const adcionarTarefa = () => {
              // if ( adiconarTarefaDeCompra.length === 0) {
              //   alert('Escreva uma tarefa')                 
              //   return
              // }
              
              const preco = refInputNumber.current; 

              setPrecoTotal((prev) => prev + preco);

              const novoPrecoTotal = precoTotal + preco;

              //const novoPrecoTotal = ListaDeCompra.reduce((total, item) => total + preco, preco);

              //setPrecoTotal(novoPrecoTotal);

                const obj = {
                    tarefa: adiconarTarefaDeCompra,
                    id: new Date().getTime(),
                    completed: false,
                    preco: preco,
                    precoTotal: novoPrecoTotal,

                }

                console.log(obj);

                setListaDeCompra([...ListaDeCompra, obj]);

                //setAdiconarTarefaDeCompra('');

                localStorage.setItem('listaDeCompra', JSON.stringify([...ListaDeCompra, obj]));

                // console.log(ListaDeCompra, 'Lista de compra');

                // console.log(obj, 'obj');

                
              }

            
              
            const valorInput = (e: number) => refInputNumber.current = e;

            useEffect(() => {
              if (typeof window !== 'undefined') {
                if (isOpenModal) {
                  document.body.style.overflow = 'hidden';
                } else {
                  document.body.style.overflow = 'auto';
                }

              // const preco = refInputNumber.current; 

              //     if (preco != null) {
              //       setPrecoTotal((prev) => prev + preco); 
              //     }
                
              }

            }, [isOpenModal]);

  return (
    <main className='p-3'>

      {  isOpenModal?
      <section className={'fixed z-10 inset-0 flex justify-center items-center transition-colors visible bg-black/50 '}
>
     
        <div  className={`bg-white rounded-lg flex flex-col gap-3 justify-center items-center text-center
         shadow p-6 transition-all max-w-md fixed z-50 text-black 
            ${isOpenModal? ' scale-100 opacity-100' : ' scale-1100 opacity-0'} `}>

               <h2 className='md:text-3xl text-2xl font-bangers '>
                Criar lista de compra</h2>
              <input type="text" value={adiconarTarefaDeCompra}
              className='text-black border-[#ccc] border p-2 rounded-full'
              placeholder='Escreva uma tarefa' 
              onChange={(e) => setAdiconarTarefaDeCompra(e.target.value)} 
              onKeyDown={handleKeyPress}
              />

                <input type="number" ref={refInputNumber} 
                 onChange={(e) => valorInput(e.target.valueAsNumber as unknown as number)}
                 onKeyDown={handleKeyPress}
                />    
               
          <div className='flex flex-row gap-3'>


              <button className='bg-red-500 hover:bg-red-700 text-white p-2 rounded-full' 
              onClick={() => setIsOpenModal(false)}>
                Fechar modal
                </button>

              <button className='bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-full'
               onClick={adcionarTarefa}>
                Adcionar tarefa
                </button>
          </div>
            </div>

        </section>
        :
        null
        }

        <List ListaDeCompra={ListaDeCompra} setListaDeCompra={setListaDeCompra} 
        precoTotal={precoTotal} setPrecoTotal={setPrecoTotal}/>
    </main>
  )
}

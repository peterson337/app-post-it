// 'use client';
// import React, {useContext, useState} from 'react'
// import { GlobalContext } from './context/Store';
// import { Tarefas } from "./context/ts/types";
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import Typography from '@mui/material/Typography';
// import { FaPen } from "react-icons/fa";
// import { FaTrash } from "react-icons/fa";
// import { FaCheck } from "react-icons/fa6";
// import { BsBookmarkStar } from "react-icons/bs";
// import { ModalEditarTarefa } from "./ModalEditarTarefa";
// import { TarefasFavoritas } from "./TarefasFavoritas";
// import { ModalEditarTarefaPesquisada } from "./ModalEditarTarefaPesquisada";

// export const TarefaPesquidasa = () => {
//     const [isOpenModalEditarTarefa, setIsOpenModalEditarTarefa] = useState(false);
//   const  {
//     tarefaPequisada,
//     atualizarTarefa,
//     setTarefaPequidada,
//     excluirTarefas, 
//     MacarTarefaComoConcluida,
//     favoritarTarefa,
//     openModalEditarTarefas,
//     ArmazenarTarefa, 
//     setArmazenarTarefa,

//     tarefas, 
//     setTarefas,
//     tarefasFavoritas, 
//     setTarefasFavoritas,
//     search,
//     setSearch,
//      searchTarefa
// } = useContext(GlobalContext)

// const salvarTarefaEditada = (id : number) => {
//     setIsOpenModalEditarTarefa(true);
//      setArmazenarTarefa(id);
//     // atualizarTarefa(ArmazenarTarefa);
// }

//   return (
//     <section>
//             {
//                 isOpenModalEditarTarefa?
//                 <ModalEditarTarefaPesquisada
//                 ArmazenarTarefa={ArmazenarTarefa}/>
//                 :
//                 null
//             }

// <input 
//       type="text"
//       className='text-black w-10 md:w-60'
//       onChange={(e) => setSearch(e.target.value)}
//       value={search}
//        />

//       <button onClick={searchTarefa}>p</button>

//         {
//             tarefaPequisada.length === 0 ?

//             <p>Para aparecer uma tarefa aqui você precisa pesquisar na barra de pesquisa acima.

//             </p>

//             :
//             // search === tarefas.filter((val) => val.tarefa.toLowerCase().includes(search.toLowerCase()))?

//             // <CardComponent></CardComponent>

//             // :
//             // null

//             <section className='grid  grid-cols-1 md:grid-cols-3'>
//           {
//                 tarefaPequisada.map((val : Tarefas) => {
//                     const TarefaConcluida = val.completed;

//                     return(
              
//                     <Box
//                     component="span"
//                     sx={{ mx: '2px', transform: 'scale(0.8)'}}
//                     className=' '
//                     key={val.id}
//                   >
//                     <Card className='md:w-[33rem] w-60 h-60 p-5 bg-yellow-200 text-2xl'>
    
//                 <Typography className={` text-2xl ${TarefaConcluida? 'line-through text-green-500' : 'text-black'}
//                 w-full break-words  h-36 overflow-auto`}
//                 sx={{ fontSize: 20 }}
//                 color="text.secondary" gutterBottom>
//                 {val.tarefa}
//                 </Typography>
//               <CardActions className=' flex flex-row justify-between'>
//                 <button
//                 className='hover:bg-gray-300 p-3 hover:rounded-full text-red-500'
//                   onClick={() => excluirTarefas(val.id)}><FaTrash /> </button>
//                 <button
//                 className='hover:bg-gray-300 p-3 hover:rounded-full text-green-500'
//                   onClick={() => MacarTarefaComoConcluida(val.id)}><FaCheck /> </button>
//                 {/* <button
//                 className='hover:bg-gray-300 p-3 hover:rounded-full '
//                   onClick={() => favoritarTarefa(val.id)}><BsBookmarkStar /> </button> */}
//                  {/* <button
//                 className='hover:bg-gray-300 p-3 hover:rounded-full text-blue-500'
//                   onClick={() => salvarTarefaEditada(val.id)}><FaPen /></button>  */}
//               </CardActions>
//                 </Card>
                    
//                   </Box>
//                     )
//                 })}

//             </section>
//         }
//     </section>
//   )
// }

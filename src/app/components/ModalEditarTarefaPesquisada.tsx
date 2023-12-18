// import React, {useContext, useState, useEffect} from 'react'
// import { GlobalContext } from './context/Store';


// export const ModalEditarTarefaPesquisada = (ArmazenarTarefa : number) => {
//           useEffect(() => {
//               tarefas.find((val) => {
//               if (val.id === ArmazenarTarefa) {
//                 setAnotarTarefasEditada(val.tarefa);
                
//               }
            
//             });          
//           }, [])
  
//       const [anotarTarefa, setAnotarTarefa] = useState('');

//   const  {
//     tarefas, 
//     setTarefas,
//     tarefasFavoritas, 
//     setTarefasFavoritas,

//     anotarTarefasEditada, 
//     setAnotarTarefasEditada,
// } = useContext(GlobalContext)
//   return (
//     <div>
//       <input type="text"
//       value={anotarTarefa} 
//       className='text-black'
//       onChange={(e) => setAnotarTarefa(e.target.value)}
//       />
//       </div>
//   )
// }

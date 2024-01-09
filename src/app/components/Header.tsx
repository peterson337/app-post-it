'use client';
import React, {useContext} from 'react'

import { GlobalContext } from './context/Store';

export const Header = () => {

  const  {Filtro} = useContext(GlobalContext);

  return (
    <header 
  className={`flex p-5 border-b border-white flex-row justify-between items-center`}
  >
      <h1 className=' text-2xl font-bangers'>
       {Filtro === 0? 'App post it 😎' : Filtro === 2? 'Lista de compra 🛒' : 'App post it 😎'}
      </h1>


    </header>
  )
}

'use client';
import React, {useContext} from 'react'
import { CiSun } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { GlobalContext } from './context/Store';

export const Header = () => {

  const  {IsThemeDark, setIsThemeDark} = useContext(GlobalContext);

      const isThemeDarkLocalStorage = () => {
        setIsThemeDark(!IsThemeDark);
        localStorage.setItem('IsThemeDark', JSON.stringify(!IsThemeDark));
      }

  return (
    <header 
  className={`flex p-5 border-b ${IsThemeDark ? 'border-white' : 'border-black'} flex-row justify-between items-center`}
  >
      <h1 className=' text-2xl'>App post it 😎</h1>


{    IsThemeDark?
        <CiSun 
        onClick={isThemeDarkLocalStorage}
        className='  w-10 h-10 text-2x1'
        />
        
        :
        <FaRegMoon
         onClick={isThemeDarkLocalStorage}
         className='w-10 h-10 text-2x1'
         />
        }
    </header>
  )
}

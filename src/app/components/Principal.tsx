'use client';
import React, { useContext } from 'react'
import { Header } from "../components/Header";
import { Tarefas } from "../components/Tarefas";
import { GlobalContext } from './context/Store';

export const Principal = () => {
     const  {IsThemeDark} = useContext(GlobalContext)
  return (
    <main className={`${IsThemeDark ? 'bg-black text-white' : 'bg-white-black'}`}>
      <Header/>
      <Tarefas/>
    </main>
  )
}

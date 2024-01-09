'use client';
import React from 'react';
import { Header } from "../components/Header";
import { Tarefas } from "../components/Tarefas";

export const Principal = () => {
  return (
    <main className='text-white'>
      <Header/>
      <Tarefas/>
    </main>
  )
}

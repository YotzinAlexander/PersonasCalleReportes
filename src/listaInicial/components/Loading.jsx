import React from 'react'
import { Spinner } from 'reactstrap'
import { NavBar } from '../../personaEvento/components/NavBar';
import './Loading.css'

export const Loading = () => {
  return (
    <>
    <NavBar/>
      <div className='div1'>
        <div className='div2'>
          <Spinner className='spinner'/>
          <h1 className='load'>Cargando...</h1>
        </div>
      </div>
    </>

  );
}

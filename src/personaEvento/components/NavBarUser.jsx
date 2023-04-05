import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { useAuthStore } from '../../hooks/useAuthStore'

export const NavBarUser = () => {

   const {startLogout, user} = useAuthStore();
  return (
    <div className='container-fluid'>
    <nav className='navbar navStyle navbar-dark colorBg mb-4 px-4  '>
    {/* navbar navbar-dark bg-dark mb-4 px-4 */}
        <span className='navbar-brand'>
            {/* <i src="/src/assets/C5DGOAZUL.png"> </i> */}
            <img src="/src/assets/C5DGOAZUL.png" alt="Stickman" width="39" height="39" color='whithe'/>
            {/* <img className='imgStyles' src="/src/assets/C5DGOAZUL.png" alt="" /> */}
            &nbsp;
            Usurio - {localStorage.getItem('Name')}
        </span>



        {/* <NavLink
            className={({isActive}) => `navbar-brand ${isActive ? 'acive':''}`}
            to="/listaInicial">
             Lista inicial
              
        </NavLink>

        <NavLink
            className={({isActive}) => `navbar-brand ${isActive ? 'acive':''}`}
            to="/listaPersonas">
              Listado por corporacion
              
        </NavLink>

        <NavLink
            className={({isActive}) => `navbar-brand ${isActive ? 'acive':''}`}
            to="/EventosAsignados">
              Listado de Asignados
              
        </NavLink> */}

        <button 
          onClick={startLogout}
          className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt'></i>
            <span>Salir</span>
        </button>
    </nav>

    </div>
  )
}

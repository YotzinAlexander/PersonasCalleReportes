import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage } from '../auth/pages/LoginPage'
import { PersonaCalle } from '../personaEvento/pages/PersonaCalle'
import { ListaPersona } from '../listaEvento/pages/ListaPersona'
import { ListaInicialPersonas } from '../listaInicial/ListaInicialPersonas'
import { useAuthStore } from '../hooks/useAuthStore'
import { ListaEvento } from '../listaEvento/pages/ListaEvento'
import { EventosAsignados } from '../listaEvento/pages/EventosAsignados'
import { EventosAsignadosUser } from '../listaEvento/pages/EventosAsignadosUser'
import { RegistroCorporacion } from '../registroCorporacion/pages/RegistroCorporacion'
import { RegistroCorporacionOng } from '../registroCorporacion/pages/RegistroCorporacionOng'


export const AppRouter = () => {

  const authStatus = 'not-authenticated'; //'not-authenticated' //authenticated


  const { status, checkAuthToken} = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, [])
  
  if(status === 'checking'){
    return (
      <h1>Cargando...</h1>
    )
  }


  console.log(status);


  //  console.log( getEnvVariables());

  return (
    <Routes>
        { 

        

            (status === 'not-authenticated')
             ? (    
                  <>  
                    <Route path='/auth/*' element={<LoginPage/>} />
                    <Route path='/*' element={<Navigate to="/auth/login"/>}/>
                  </>  
               )
             : 
             (status === 'authenticatedOther')
              ? (
                <>
                <Route path='/' element={<EventosAsignadosUser/>}/>   
                <Route path='/*' element={<Navigate to="/"/>}/>
                <Route path='/EventosAsignados' element={<EventosAsignadosUser/>}/>
                </>
              )
              :
               (
                <>
                  {/* Esta seria la primer ruta que entre despues de iniciar sesion */}
                   <Route path='/' element={<ListaInicialPersonas/>}/>   
                   <Route path='/*' element={<Navigate to="/"/>}/>
                   <Route path='/personcaCalle' element={<PersonaCalle/>}/>
                   <Route path='/listaPersonas' element={<ListaPersona/>}/>
                   <Route path='/listaInicial' element={<ListaInicialPersonas/>}/>
                   <Route path='/ListaEvento/:id' element={<ListaEvento/>}/>
                   <Route path='/EventosAsignados' element={<EventosAsignados/>}/>
                   <Route path='/RegistroCorporacion' element={<RegistroCorporacion/>}/>
                   <Route path='/RegistroCorporacionInstituciones' element={<RegistroCorporacionOng/>}/>

               </>
               )

          }
    </Routes>
  )
}

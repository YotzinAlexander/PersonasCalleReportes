import React, { useEffect, useState } from 'react'
import './EventosAsignadosUser.css'
import { NavBar } from '../../personaEvento/components/NavBar'
import { useAuthStore } from '../../hooks/useAuthStore';
import { Loading } from '../../listaInicial/components/Loading';
import { CardEvento } from '../components/CardEvento';
import { CardEventosAsignadosUser } from '../components/CardEventosAsignadosUser';
import { NavBarUser } from '../../personaEvento/components/NavBarUser';

let listaEvento;


export const EventosAsignadosUser = () => {



  const { startEventoCorporacion } = useAuthStore();
  const [ loading, setLoading,  ] = useState(true);

  const cambiarEstado = () => {
    setLoading(false);
}



  useEffect(() => {
    // startLogin({user:loginEmail, password: loginPassword});

    startEventoCorporacion({id_corporacion: localStorage.getItem('id_corporacion')}).then((respose) => {

      // console.log('entra');

      listaEvento = respose;
      // console.log(listaEvento.resp);

    })
}, [])


if(loading){
  setTimeout(()=> {
    cambiarEstado();
  }, 1000)
  return(
    
    <Loading/>
  )

}else{

  return (
    <>
    {/* <NavBar/> */}

    <NavBarUser/>

    <p> Lista de Evento y su corporacion - USER</p>


    <div className="row rows-cols-1 cardStyle row-cols-md-3 g-3">
      {
        listaEvento.resp.map((dataE) =>{

          if(dataE['editado'] == 1){}

            return (
              <CardEventosAsignadosUser key={dataE[0]['_id']}{...dataE[0]} />
            )

          


        })
      }

    </div>



    </>
  )

}


}

import React, { useEffect, useState } from 'react'
import './EventosAsignados.css'
import { NavBar } from '../../personaEvento/components/NavBar'
import { useAuthStore } from '../../hooks/useAuthStore';
import { Loading } from '../../listaInicial/components/Loading';
import { CardEvento } from '../components/CardEvento';
import { CardEventosAsignados } from '../components/CardEventosAsignados';
import AlertMUI from '../components/AlertMUI';

let listaEvento;


export const EventosAsignados = () => {



  const { startEvento } = useAuthStore();
  const [ loading, setLoading,  ] = useState(true);

  const cambiarEstado = () => {
    setLoading(false);
}



  useEffect(() => {
    startEvento().then((respose) => {

        listaEvento = respose;

        // console.log(listaEvento);
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
    <NavBar/>



    <p> Lista de Evento y su corporacion</p>


    <div className="row rows-cols-1 cardStyle row-cols-md-3 g-3">
      {
        listaEvento.uid.map((dataE) =>{

          if(dataE['editado'] == 1){
            // console.log(dataE);

            return (

              
              
              <CardEventosAsignados key={dataE['_id']}{...dataE} />
            )

          }
        })
      }

    </div>



    </>
  )

}


}

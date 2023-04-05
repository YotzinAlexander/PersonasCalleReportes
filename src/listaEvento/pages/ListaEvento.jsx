import React, { useEffect, useState } from 'react'
import { NavBar } from '../../personaEvento/components/NavBar'
import { CardEvento } from '../components/CardEvento'
import './ListaEvento.css'
import { useAuthStore } from '../../hooks/useAuthStore';
import { useParams } from 'react-router-dom';
import { Loading } from '../../listaInicial/components/Loading';
import { ListGroup } from 'reactstrap';

let listaEvento;




export const ListaEvento = ({nombreCorp}) => {



  let corporacion = useParams();


  const { startEvento } = useAuthStore();
  const [ loading, setLoading,  ] = useState(true);


  useEffect(() => {
    startEvento().then((respose) => {
      listaEvento = respose;
    })
  }, [])

  const cambiarEstado = () => {
    setLoading(false);
}

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

    

    <div className="row rows-cols-1 row-cols-md-3 g-3 cardSpace"> 
    {
      
      listaEvento.uid.map((dataE) => {

        const arr = dataE['instituciones'];
        
        if( !arr.length == 0){
          for(var i=0; i<arr.length;  i++){
            const other  = arr[i];
            
            if(other['value'] === corporacion['id']){
              
              console.log(dataE)

              return(
                <CardEvento key={dataE['_id']}{...dataE} />
              )

            }
          
          }
        }

        
      })

    }
    
    </div>

    </>
  )
}


}

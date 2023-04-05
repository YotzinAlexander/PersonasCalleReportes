import React, { useEffect, useState } from 'react'
import { NavBar } from '../../personaEvento/components/NavBar'
import './listaPersona.css'
import { useAuthStore } from '../../hooks/useAuthStore';
import { Loading } from '../../listaInicial/components/Loading';
import Select from 'react-select';

import { CardCorporacion } from '../components/CardCorporacion';
import posts from "../../data/posts";
import { corporaciones } from '../../data/corporaciones';




let listaEvento;


export const ListaPersona = () => {

    let count = 0;


    //const { startEvento } = useAuthStore();
    const [ loading, setLoading,  ] = useState(true);


    useEffect(() => {
        // startEvento().then((respose) => {
        //     console.log('Response!');
  
        //     listaEvento = respose;
  
        //     console.log(listaEvento);
        // })
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
        <div className='col-4'>
            <h6>Lista de Corporaciones</h6>
        </div>

        <div className='listaPersona2'>





        <div className="row rows-cols-1 row-cols-md-3 g-3">
            {
                corporaciones.map((dataE) => {

                        return (
                            <CardCorporacion key={dataE['_id']} 
                                                {...dataE} />
                        );
                    



                })
            }

        </div>

            {/* <table className='tableStyle'>
                <thead>
                    <tr>
                        <th scope="col"> # </th>
                        <th>Folio</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Evento</th>
                        <th scope='col'> Razonamiento</th>
                        <th scope="col">Corporaciones que atienden</th>
                        <th scope="col">Municipio</th>
                    </tr>
                </thead>
                <tbody>
                            {

                                listaEvento.uid.map((dataE) =>{
                                    count++;
                                    if(dataE['editado'] == 1){
                                        console.log('Carga datos',dataE['instituciones']);

                                    return(
                                        <tr key={dataE['_id']}>
                                        <th scope='row'>{count}</th>    
                                        <th scope="row">{dataE['folio_llamada']}</th>
                                        <th scope="row">{dataE['fecha_llamada']}</th>
                                        <th scope='row'>{dataE['hora_llamada']}</th>
                                        <th scope="row">{dataE['descripcion_llamada']}</th>
                                        <th scope='row'>{dataE['razonamiento']}</th>
                                        <th scope="row" >
                                            <Select 
                                            
                                            className='selectt'
                                            defaultValue={{label:'Corporaciones'}} 
                                            options={dataE['instituciones']} />
                                        </th>
                                        <th scope="row">{dataE['municipio']}</th>                                        
                                        </tr>
                                    )
                                }
    
                                })
                            }
                </tbody>
            </table> */}

        </div>
    </>
  )
}
}

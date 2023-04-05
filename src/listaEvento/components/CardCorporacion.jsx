import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './CardCorporacion.css'
import { useAuthStore } from '../../hooks/useAuthStore';

let listaEvento;


export const CardCorporacion = ({imagenDoc,nombreCorp}) => {


                

  return (
    <div className='col animate__animated animate__fadeIn'>
      <div className='card backGround-card'>
        
        <div className='row no-gutters'>
          <div className="col-4 imgStyle">
            <img src={imagenDoc} className='card-img' alt="" />
          </div>

          <div className='col-8'>
            <div className='card-body'>
              <h5 className='card-title'>{nombreCorp}</h5>
              <p> {}</p>

              {/* <p className='card-text'>
                <small className='link-primary' to={`/listaInicial`}>... ver mas</small>
              </p> */}

              <Link to={`/ListaEvento/${nombreCorp}`}>EVENTOS</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}




// const options = [
//   { value: 'BOMBEROS', label: 'BOMBEROS' },
//   { value: 'POLICIA MUNICIPAL', label: 'POLICIA MUNICIPAL' },
//   { value: 'POLICIA INVEVISTIGADORA DE DELITOS', label:'POLICIA INVEVISTIGADORA DE DELITOS'},
//   { value: 'POLICIA ESTATAL', label: 'POLICIA ESTATAL' },
//   { value: 'CRUM', label:'CRUM'},
//   // { value: '', label:''}
// ]

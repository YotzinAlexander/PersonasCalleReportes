import React from 'react'
import Select from 'react-select';


import { NavBar } from '../components/NavBar'

import './PersonaCalle.css'
import Swal from 'sweetalert2';


export const PersonaCalle = () => {
  const options = [
    { value: 'BOMBEROS', label: 'BOMBEROS' },
    { value: 'POLICIA MUNICIPAL', label: 'POLICIA MUNICIPAL' },
    { value: 'POLICIA INVEVISTIGADORA DE DELITOS', label:'POLICIA INVEVISTIGADORA DE DELITOS'},
    { value: 'POLICIA ESTATAL', label: 'POLICIA ESTATAL' },
    { value: 'CRUM', label:'CRUM'},
    // { value: '', label:''}
  ]


  const eventoSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se enviara este evento a las corporaciones",
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonColor: '#374957',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, estoy seguro',
      backdrop: '#374957',
    //  background: '#374957'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Enviado!',
          'Tu evento ha sido enviado',
          'success'
        )
      }
    })
  }
  return (
    <>
      <NavBar/>

      <div className='personaCalle-center'>

        <form  className='persona-form' onSubmit={eventoSubmit}>
          <br />
          <div >
          <h6 className='tamanoLetra'>Razonamiento</h6>

            <textarea  rows={5} cols={5} className='inputform' type="text"  />
          </div>

          <div>
            <input className='inputFile' type="file" />
            
          </div>

          <div >
            <Select
              className='select'
              // defaultValue={{label:'Seleccionar un por lo menos una corporacion', value:'empty'}}
              isMulti
              name='corporaciones'
              options={options}/>
          </div>

          <div>
          <button className='btnForm'>Generar Evento</button>
          </div>

          <br />


        </form>


      </div>


    </>
  )
}

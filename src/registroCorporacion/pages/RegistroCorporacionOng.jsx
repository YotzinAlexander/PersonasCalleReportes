import React from 'react'
import { NavBar } from '../../personaEvento/components/NavBar'
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';

const registerFormFields = {
}


export const RegistroCorporacionOng = () => {


    const {startRegistrerCorpo, errorMessage} = useAuthStore();

    const {institucion,municipio, onInputChange: onRegisterChange } = useForm(registerFormFields);


    const registerUserSubmit = (event) =>{
        event.preventDefault();

        if(institucion == undefined || institucion == ''){
            errorSwal()
        } else if (municipio == undefined || institucion == ''){
            errorSwal
        } else {
            startRegistrerCorpo({municipio,institucion});
        }

    }

    const errorSwal = () => {
        Swal.fire({   
            title: 'Error',
            text: "Favor de llenar todos los campos.",
            icon: 'warning',
            iconColor: 'red',
            // showCancelButton: false,
            confirmButtonColor: '#374957',
            confirmButtonText: 'Aceptar',
            // cancelButtonColor: '#d33',
            // cancelButtonText: 'Cancelar',
            // backdrop: '#374957',
        });
    }


  return (
      <>
      <NavBar/>

            <body className='bodyB'>

                <div className='background'>
                    <div className='cardD'>
                        <img className='logo' src="./src/assets/registerU.png" alt="" />
                        <h2>Registrar Institucion o ONG</h2>
                        <form className='formm' onSubmit={registerUserSubmit} id='formR'>
                            <input 
                                type="text" 
                                placeholder='Nombre'
                                name='institucion'
                                value={institucion|| ''}
                                onChange={onRegisterChange}
                            />
                            <input 
                                type="text" 
                                placeholder='Municipio'
                                name='municipio'
                                value={municipio|| ''}
                                onChange={onRegisterChange}
                            />
                            <button type="">Registrar</button>
                        </form>

                        {/* <div>
                            <button onClick={ () => starErra()}></button>
                        </div> */}
                    </div>
                </div>
                    
            </body>

      </>
  )
}

import React from 'react';
import '../pages/RegistroCorporacion.css';
import Select from 'react-select';
import { NavBar } from '../../personaEvento/components/NavBar';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loading } from '../../listaInicial/components/Loading';

const registerFormFields = {
    registerUser: '', 
    registerEmail: '', 
    registerPassword: '',
}

let listCoporaciones;
var miArray = [];


export const RegistroCorporacion = () => {
    var corporacion;

   



    const options = [
        { value: 'SECRETARÍA DE LA DEFENSA NACIONAL', label: 'SECRETARÍA DE LA DEFENSA NACIONAL', status: "3", id_corporacion: 'SECRETARÍA DE LA DEFENSA NACIONAL'},
        { value: 'GUARDIA NACIONAL', label: 'GUARDIA NACIONAL',  status: "3", id_corporacion: 'GUARDIA NACIONAL'},
        { value: 'POLICIA ESTATAL PREVENTIVA', label:'POLICIA ESTATAL PREVENTIVA',  status: "3", id_corporacion: 'POLICIA ESTATAL PREVENTIVA' },
        { value: 'POLICIA INVESTIGADORA DE DELITOS', label: 'POLICIA INVESTIGADORA DE DELITOS', status: "3", id_corporacion: 'POLICIA INVESTIGADORA DE DELITOS'},
        { value: 'CRUZ ROJA DURANGO', label:'CRUZ ROJA DURANGO', status: "3", id_corporacion: 'CRUZ ROJA DURANGO'},
        { value: 'COORDINACIÓN ESTATAL DE PROTECCIÓN CIVIL', label:'COORDINACIÓN ESTATAL DE PROTECCIÓN CIVIL', status: "3", id_corporacion:'COORDINACIÓN ESTATAL DE PROTECCIÓN CIVIL' },
        { value: 'SECRETARÍA DE SALUD', label:' SECRETARÍA DE SALUD', status: "3", id_corporacion: 'SECRETARÍA DE SALUD'},
        { value: 'PROGRAMA ESMERALDA', label:'PROGRAMA ESMERALDA', status: "3", id_corporacion: 'PROGRAMA ESMERALDA'},
        { value: 'DIRECCIÓN MUNICIPAL DE SEGURIDAD PÚBLICA DURANGO', label:'DIRECCIÓN MUNICIPAL DE SEGURIDAD PÚBLICA DURANGO', status: "3", id_corporacion: 'DIRECCIÓN MUNICIPAL DE SEGURIDAD PÚBLICA DURANGO'},
        { value: 'POLICÍA VIAL DURANGO', label:'POLICÍA VIAL DURANGO', status: "3", id_corporacion: 'POLICÍA VIAL DURANGO'},
        { value: 'DIRECCIÓN MUNICIPAL DE PROTECCIÓN CIVIL DURANGO', label:'DIRECCIÓN MUNICIPAL DE PROTECCIÓN CIVIL DURANGO', status: "3", id_corporacion: 'DIRECCIÓN MUNICIPAL DE PROTECCIÓN CIVIL DURANGO'},
        { value: 'HEROICO CUERPO DE BOMBEROS DURANGO', label:'HEROICO CUERPO DE BOMBEROS DURANGO', status: "3", id_corporacion: 'HEROICO CUERPO DE BOMBEROS DURANGO'}
    ]

    const {startFindCorpo} = useAuthStore();
    const [ loading, setLoading,  ] = useState(true);


    const [selectedOptions, setSelectedOptions] = useState('')

    const {startRegister, errorMessage} = useAuthStore();

    const {name, user, password, onInputChange: onRegisterChange } = useForm(registerFormFields);

    
    const handleSelectedCorporacion = () => {
        corporacion = selectedOptions['id_corporacion'];
    }
    

    const registerUserSubmit = (event) =>{
        event.preventDefault();
        handleSelectedCorporacion()
        // console.log('print',registerUser, registerEmail, registerPassword, valor);
        var uType = '01'
        

        if(name == undefined ||  name == '' ){
            console.log(name);
            errorSwal();
            return false;


        } else if (user == undefined || user == ''){
            errorSwal();
            return false;



        } else if( password == undefined ||  password == ''){
            errorSwal();
            return false;


        } else if (corporacion == undefined) {
            errorSwal();
            return false;
        } 
        else {
            // console.log({name, user, password, corporacion,uType})
            startRegister({name, user, password, corporacion,uType})

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
            backdrop: '#374957',});
    }

    useEffect(() => {

      if ( errorMessage !== undefined) {
          Swal.fire('Error al realizar registro', errorMessage, 'error')
      }    
      
    }, [errorMessage] );

    useEffect(() => {
        startFindCorpo().then((response) => {
            // console.log(response.data)
            listCoporaciones = response.data;
            for(let i =0; i<listCoporaciones.length; i++){


                const opt = {
                    'value': listCoporaciones[i].institucion,
                    'label': listCoporaciones[i].institucion,
                    'status': '3',
                    'id_corporacion': listCoporaciones[i].institucion
                }
                
                miArray[i] =opt;
            
            }
            // console.log(miArray)


          



        });
    },[])

    

    const cambiarEstado = () => {
        setLoading(false);
      }

    function starErra(){
        console.log('borrar');
        var element = document.getElementById('formR');

        element.reset();
    }

    
    if (loading) {

        setTimeout(()=> {
            cambiarEstado();
            console.log('entra loading');
          }, 1000)
          return(
      
            <Loading/>
          )
    } else {
        return (
            <>

            

            <NavBar/>
      
              <body className='bodyB'>
      
                  <div className='background'>
                      <div className='cardD'>
                          <img className='logo' src="./src/assets/registerU.png" alt="" />
                          <h2>Crear cuenta</h2>
                          <form className='formm' onSubmit={registerUserSubmit} id='formR'>
                              <input 
                                  type="text" 
                                  placeholder='Nombre de usuario'
                                  name='name'
                                  value={name|| ''}
                                  onChange={onRegisterChange}
                              />
                              <input 
                                  type="text"  
                                  placeholder='Usuario'
                                  name='user'
                                  value={user|| ''}
                                  onChange={onRegisterChange}
                              />
                              <input 
                                  type="password"  
                                  placeholder='Contraseña'
                                  name='password'
                                  value={password|| ''}
                                  onChange={onRegisterChange}
                              />
                              <p>Corporacion o institucion a la que pertenece:</p>
                              <Select
                                  className='selectCorpo'
                                  name='selectOptions'
                                  options={miArray}
                                  onChange={(item) => setSelectedOptions(item)}
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


}


// {
//     "name":"Usuario De Prueba",
//     "user": "uprueba2",
//     "password": "12345",
//     "corporacion": "SECRETARÍA DE LA DEFENSA NACIONAL",
//     "uType": "01"
// }
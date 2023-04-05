import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import './LoginPage.css'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useForm } from '../../hooks/useForm'


import  io  from 'socket.io-client'
const socket = io.connect('http://localhost:3001')


const loginFormFields = {
  loginEmail: 'admin',
  loginPassword: '12345',
}

export const LoginPage = () => {

  const sedEmit = () => {
    console.log('emit');
    socket.emit('login')
  }

  const { startLogin, errorMessage } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    // sedEmit()
    // console.log({user:loginEmail, password: loginPassword});
    startLogin({user:loginEmail, password: loginPassword});
    
  }


  useEffect(() => {
    if( errorMessage !== undefined){
      Swal.fire('Error en la autenticacion', errorMessage, 'error');
    }    
  }, [errorMessage])
  
  return (
    <div className='body'>
      <div >
        <img className='izquierda' src="/src/assets/C5DGOAZUL.png"/>
      </div>
      <div>
      <img className='derecha' src="/src/assets/LOGOSSP.png" alt="" />
      </div>
    <div className='login'>
            {/* <div className='avatar'>
                <img src='/src/assets/login.png'  />
            </div> */}
            {/* <h2>TEST</h2> */}
            {/* <h3> Bienvenido al sistema </h3> */}
            
            <form className='login-form' onSubmit={loginSubmit} >
              <div className="textbox">
                <input 
                       type="text" 
                       placeholder="Usuario" 
                       name='loginEmail'
                       value={loginEmail}
                       onChange={onLoginInputChange}
                    />
                <span className="material-symbols-outlined"> account_circle </span>
              </div>
              
              <div className='textbox'>
                <input 
                      type="password"  
                      placeholder='Contraseña' 
                      name="loginPassword"
                      value={loginPassword} 
                      onChange={onLoginInputChange}  
                    />
                <span className='material-symbols-outlined'> lock</span>
              </div>
                    
              <button className='btnStyle' type='submit' value="Login" > Entrar</button>
              {/* <a> Favor de introducir correctamente sus credenciales</a> */}
            </form>
    </div>
  </div>
  )
}

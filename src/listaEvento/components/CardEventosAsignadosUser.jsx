import React, { useEffect, useState } from 'react'
import './CardEventosAsignados.css'
import Modal from 'react-modal';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';

import { Loading } from '../../listaInicial/components/Loading';

import  io  from 'socket.io-client'
import AlertMUI from './AlertMUI';

const socket = io.connect('http://10.11.113.164:3001')


let searchAllReport;
let searchAllRazonamiento;



export const CardEventosAsignadosUser = ({_id,folio_llamada, fecha_llamada, descripcion_llamada,municipio, instituciones}) => {


  const [ loading, setLoading,  ] = useState(true);

  const [reloadUsers, setReloadUsers] = useState(false)

  const cambiarEstado = () => {
    setLoading(false);
}

  const {razonamientoCorpoOne, startEventoAll} = useAuthStore();

  const {getRazonamientoCorpo} = useAuthStore();


  const [modalIsOpen, setIsOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    folio:'',
    institucion: '',
    razonamiento: '',
    state: '2',
    uType: localStorage.getItem('uType')


  }, )


  useEffect(() => {
    startEventoAll().then((response) => {
      // console.log('Response allEvent', response);

      searchAllReport = response;
      setReloadUsers(false)

    })
  }, [reloadUsers])

  useEffect(() => {
    getRazonamientoCorpo().then((response) => {
      // traer data de razonamientos TODOS
      // var texto = document.getElementById("razonamientos").value;
      searchAllRazonamiento= response;
      setReloadUsers(false)
      // console.log('Response GET', searchAllRazonamiento);


    })
  }, [reloadUsers])


  useEffect(() => {
    socket.on('cambio_estado', (payload) => {
      const corpo = localStorage.getItem('id_corporacion')

      console.log("AQUI SOCKET PAYLOAD",payload);
      console.log("LOCAL STORAGE", corpo);

      if(payload == corpo){
        setReloadUsers(true);
        setLoading(true)
        console.log('Aqui si');
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Nuevo cambio de estado',
          showConfirmButton: false,
          // timer: 2000
        })
      }else{
        console.log('aqui no');
      }

      //setIsOpen(false);


    })
  },[socket])
  

  const onInputChange = ({target}) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    })
}

  function eventoCorporacion (dataE,folio_llamada) {
    console.log('evento', dataE, folio_llamada);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#0062cc';
  }
  function closeModal(){
    formValues.razonamiento = '';
    setIsOpen(false)
  }

  function openModal(dataE, folio_llamada) {
    formValues.institucion = dataE['id_corporacion']
    formValues.folio = folio_llamada
    setIsOpen(true);
  }

  function enviaTxt (texto){

    document.getElementById("razonamientos").value = texto;

    console.log(texto);
  }
  
  const enviarRazonamiento = async (event) => {

    event.preventDefault();
    //necesario para el reload de informacion
    socket.emit("sendEvento" )
      setReloadUsers(true);
      setLoading(true)
      setIsOpen(false);

    if(formValues.razonamiento === ""){
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
    }else{    
      razonamientoCorpoOne(formValues);

    }

  }

  // console.log(instituciones);


  if(loading){
    setTimeout(()=> {
      cambiarEstado();
    }, 1000)
    // return(
      
    //   <Loading/>
    // )
  
  }else{

    return (

      <>


      
      <div className="card mb-3 cardStyle max-width: 540px; cardStyleAsigna" >
      <div className="row g-0 ">
        <div className="col-md-4">
          <img src="/src/assets/event.png" className="img-fluid rounded-start" alt="..."/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {/* <h5 className="card-title">Estatus: <img className='circle' src={image}></img> </h5> */}
            <p className='card-text'>{folio_llamada}</p>
            <p className="card-text">{descripcion_llamada}</p>
            <p className="card-text">{municipio}</p>
            <p className="card-text"><small className="text-muted">Fecha de llamada: {fecha_llamada}</small></p>
            <h5 className="card-title" >Instituciones que atienden:</h5>
  
            {
              searchAllReport.resp.map((dataE) =>{
                // console.log(resp['id_evento']);
                // console.log(resp['id_corporacion']);
                
                if(dataE['id_evento'] == folio_llamada && dataE['id_corporacion'] == localStorage.getItem('id_corporacion')  ){
                  // console.log(dataE);

                  const image = '/src/assets/indicadores/'+dataE['status']+'.png';
                  return(
                  <div>
                    <p onClick={() => openModal(dataE, folio_llamada)} className="card-text col-md-10"  > 
                      <img className='circle' src={image} alt="" />  
                      {/* texto */}
                      <small key={dataE['_id']} className="text-muted">{  dataE['id_corporacion']} </small>   
                    </p>
                  </div>
    
                  )
                }

              })
            }
  
          </div>
        </div>
      </div>
    </div>
    
    {/* 
    *id_ evento
    *id_corporacion
    *razonamiento
    *status = 2 
    */}

      <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      className='modal'
      contentLabel="Editar datos"
      ariaHideApp={false}
      >

        <div className="container">

          <div className='row'>

              {/* formulario de historial de mensajes */}
            <div className='col-sm'>
              Historial de razonamientos
              {
                    
                    searchAllRazonamiento.data.map((dataR) => {

                      if(dataR['id_corporacion'] == formValues.institucion && dataR['id_evento'] == formValues.folio){
                        // console.log(dataR['razonamiento'], dataR['createdAt']);
                        const image = '/src/assets/'+dataR['uType']+'.png';
                        return(
                          <div>
                            <button 
                            className='styleBtnArrow'
                            onClick={() => enviaTxt(dataR['razonamiento'])}
                            >
                              <img src={image} alt="" />
                              {dataR['createdAt'].substring(0, 10)}
                            </button>
                          </div>
                        )
                      }else{
                      }
                    })

                  }
            
            </div>


            {/* formulario de vista de text */}
            <div className='col-sm'>

            <form onSubmit={enviarRazonamiento} >
          <div className='centerItems'>
            <h5>ID :{formValues.folio}</h5>
          </div>
          <div className='centerItems'>
            <h5>INSTITUCION : {formValues.institucion}</h5>
          </div>
  
          <div className='centerItems'>
            <textarea 
            id='razonamientos'
             name="razonamiento" 
             cols="60" 
             rows="10"
            //  placeholder='Escriba el texto necesario dentro de esta caja.'
             value={formValues.razonamiento}
             onChange={onInputChange}
            />
          </div>
  
  
  
          <div className='centerItems'>
            <button className='btnStyle'>Enviar <img className=' circle' src="/src/assets/send.png"/></button>
          </div>
        </form>

            </div>

          </div>



        </div>
  
    
  
      </Modal>
  
  
      </>
      
  
  
  
    )

  }

}

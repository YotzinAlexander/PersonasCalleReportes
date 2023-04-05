import React, { useEffect, useState } from 'react'
import './CardEventosAsignados.css'
import Modal from 'react-modal';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';

import Select from 'react-select';
import { redirect } from "react-router-dom";

import  io  from 'socket.io-client'
import { Scrollbar } from 'react-scrollbars-custom';

const socket = io.connect('http://10.11.113.164:3001')






let searchAllReport;
let searchAllRazonamiento;

var valor;

let listCoporaciones;
var miArray = [];

export const CardEventosAsignados = ({folio_llamada, fecha_llamada, descripcion_llamada,municipio, instituciones}) => {

  var valores;
  


  const [ loading, setLoading,  ] = useState(true);

  const [reloadUsers, setReloadUsers] = useState(false)


  const cambiarEstado = () => {
    setLoading(false);
  }

  const {startFindCorpo} = useAuthStore();

  const {razonamientoCorpo, startEventoAll} = useAuthStore();

  const {getRazonamientoCorpo} = useAuthStore();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [modalIsOpen2, setIsOpen2] = useState(false);
  const { errorMessage, startUpdate } = useAuthStore();





  const [selectOption, setSelect] = useState({
  })

  const [formValues, setFormValues] = useState({
    folio:'',
    institucion: '',
    razonamiento: '',
    state: '',
    uType: localStorage.getItem('uType')
    

  }, )





  const handleSelect = () => {
    valor = selectOption;
    formValues.state = valor.value
    console.log(valor.value);
  }


  
  useEffect(() => {
    startEventoAll().then((response) => {
      console.log('Response allEvent', response);

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
      console.log('Response GET', searchAllRazonamiento);


    })
  }, [reloadUsers])


  useEffect(() => {
    socket.on('cambio_estado', () => {
      console.log('SocketExitoso');
      setReloadUsers(true);
      setLoading(true)
    })
  },[socket])


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
        
    });
},[])
  

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

  function closeModal2(){
    valores = '';
    formValues.razonamiento = '';
    setIsOpen2(false)
  }

  function openModal(dataE, folio_llamada) {


    const id_evento = dataE['id_corporacion']
    const id_corporacion = folio_llamada;

    formValues.institucion = dataE['id_corporacion']
    formValues.folio = folio_llamada;

    console.log(id_evento, id_corporacion);
    setIsOpen(true);
    
  }

  function openModal2 (folio_llamada) {

      formValues.folio = folio_llamada

    setIsOpen2(true);
  }

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectCorporacion = () => {
    valores = selectedOptions;

    console.log(selectedOptions['id_corporacion']);
    console.log(formValues.folio);
    delete valores['label'];
    delete valores['value'];
    valores.id_evento = formValues.folio;

    // console.log(valores);
}


        // ]
        //     {
        //         "status": "3",
        //         "id_corporacion": "SECRETARÍA DE LA DEFENSA NACIONAL",
        //         "id_evento": "00105101000014436849"
        //     }
        // ]


        // {
        //     "value": "GUARDIA NACIONAL",
        //     "label": "GUARDIA NACIONAL",
        //     "status": "3",
        //     "id_corporacion": "GUARDIA NACIONAL"
        // }




  const updateRegister = (event) => {
    event.preventDefault();
    //necesario para el reload de informacion
    setReloadUsers(true);
    setLoading(true)
    setIsOpen2(false)



    handleSelectCorporacion();

    if(valores.length == 0){
        Swal.fire('Error de asignacion','Favor de seleccionar una corporacion','error')
    } else {
        0,1,2
        // console.log('VALORES',valores);

        startUpdate({
            instituciones: [valores],
        }).then((response) => {
            if(response['ok'] == true){
                
                Swal.fire(
                'Registro creado con exito',
                'Aceptado',
                'success')
        
            }

            
        })

    }

}



  function enviaTxt (texto){

    document.getElementById("razonamientos").value = texto;

    console.log(texto);
  }


  
  const enviarRazonamiento = async (event) => {

    event.preventDefault();
    //necesario para el reload de informacion
    socket.emit("sendEvento", formValues.institucion)
    setReloadUsers(true);
    setLoading(true)
    setIsOpen(false);

    handleSelect();

    if(formValues.razonamiento == "" && formValues.state == "" || formValues.state == undefined){
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
     razonamientoCorpo(formValues);
     console.log(formValues);
    }

  }

  const options1 = [
    { value: '1', label: <div><img className='circle' src="/src/assets/indicadores/1.png" /> Correcto</div>},
    { value: '2', label: <div><img className='circle' src="/src/assets/indicadores/2.png" /> Pendiente</div>},
    { value: '3', label: <div><img className='circle' src="/src/assets/indicadores/3.png" /> Asignado</div>}

  ]

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



  if(loading){
    setTimeout(()=> {
      cambiarEstado();
      console.log('entra loading');
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
          <br />
          <div className='centerItems'>
          <button 
            onClick={() => openModal2(folio_llamada)}
            className='btnStyle'
            >Reasignar
          </button>
          </div>
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
                // console.log(dataE);

                if(dataE['id_evento'] == folio_llamada ){
                  const image = '/src/assets/indicadores/'+dataE['status']+'.png';
                  
                  return(
                  <div>
                    <p onClick={() => openModal(dataE, folio_llamada)} className="card-text col-md-10"  > 
                      <img className="circle" src={image} alt="" />  
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
    
      <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      className='modal'
      contentLabel="Editar datos"
      ariaHideApp={false}
      >
  
          <div className="container">

            <div className="row">
                
                <div className="col-sm">
                Historial de razonamientos

                <Scrollbar style={{ width: 300, height: 450 }}>

                  {
                    
                    searchAllRazonamiento.data.map((dataR) => {

                      if(dataR['id_corporacion'] == formValues.institucion && dataR['id_evento'] == formValues.folio){
                        console.log(dataR['razonamiento'], dataR['createdAt'],dataR['uType']);
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
                  </Scrollbar>

                </div>

                {/* form */}
                <div className="col-sm">
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
                     text={searchAllRazonamiento}
                    //  placeholder='Escriba el texto necesario dentro de esta caja.'
                     value={formValues.razonamiento}
                     onChange={onInputChange}
                    />
                  </div>
                   
                  <div className='centerItems'>
                    <h5>Seleccionar un estatus de evento:</h5>
                    <Select
                    className='selectCardEventos'
                    name='selectOption'
                    options={options1}
                    onChange={(item) => setSelect(item)}
                    >
                    </Select>
                  </div> 
                   
                  <div className='centerItems'>
                    <button className='btnStyle'>Enviar <img className=' circle' src="/src/assets/send.png"/></button>
                  </div>
                  </form>

                </div> 
                {/* div de razonamiento */}

                {/* form */}
            </div>
          </div>
      </Modal>  


      <Modal
      isOpen={modalIsOpen2}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal2}
      className='modal'
      contentLabel="Reasignar Datos"
      ariaHideApp={false}
      >

                      <form onSubmit={updateRegister}>
                            <img className='closeBtn' src="./src/assets/close.png" onClick={closeModal2} alt="" />
                            <div className='col-md-6 editR-form'>
                                <h1>Reasignar reporte</h1>
                                <h2>Folio:  {folio_llamada}</h2>
                                
                            <br/>
                            <div >
                                  {/* <div className='personaCalle-center'>
                                  <h6 className='tamanoLetra'>Razonamiento</h6>
                                    <textarea  
                                        rows={5} 
                                        cols={5} 
                                        className='inputform' 
                                        type="text"  
                                        name='updateRazonamiento'
                                        defaultValue={formValues.descripcion_llamada}
                                        // value={formValues.descripcion_llamada} 
                                        // onChange={onUpadteRegister} 
                                        >
                                            {formValues.descripcion_llamada}
                                    </textarea>
                                  </div> */}
                                  
                                    {/* Selector de archivos */}
                                  {/* <div className='personaCalle-center'>
                                    <input className='inputFile' type="file" />
                                  </div> */}
                                  <br />
                                  <div className='personaCalle-center'>
                                    <Select
                                      className='select'
                                      // defaultValue={{label:'Seleccionar un por lo menos una corporacion', value:'empty'}}
                                      // isMulti
                                      name='selectedOptions'
                                      options={miArray}
                                      onChange={(item) => setSelectedOptions(item)}
                                      />
                                  </div>
                                  <br />
                                  <div className='personaCalle-center'>
                                  <button className='btnForm'>Reasignar evento</button>
                                  </div>
                            <br />    
                            </div>
                            </div>
                        </form>

      </Modal>
      </>
      
  
    )

  }

}

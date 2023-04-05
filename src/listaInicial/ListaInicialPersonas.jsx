import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import { NavBar } from '../personaEvento/components/NavBar'

import './ListaInicialPersonas.css'
import { useAuthStore } from '../hooks/useAuthStore';
import { Loading } from './components/Loading';
import Modal from 'react-modal';
import Select from 'react-select';
import { useForm } from '../hooks/useForm';



let listaEvento;
let responseListEvento;



// variable para cargar modal

let dataE;


const updateEvento = {
    updateRazonamiento:     '',

}


let listCoporaciones;
var miArray = [];




export const ListaInicialPersonas = () => {

    let count = 0;

    var corpoSelect = '';

    var valores ;





    const { updateRazonamiento, onInputChange:onUpadteRegister} = useForm( updateEvento);

    const { errorMessage, startUpdate } = useAuthStore();
    

    const [reloadUsers, setReloadUsers] = useState(false)



    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const handleSelectCorporacion = () => {

    
        valores = selectedOptions;

        for( var i = 0; i < valores.length; i++) {
            let vt = valores[i];

            delete vt.value;
            delete vt.label;

            vt.id_evento = formValues.folio

    
          //  console.log(vt);
        }




    }


    const updateRegister = (event) => {
        event.preventDefault();
        //necesario para el reload de informacion
        setReloadUsers(true);
        setLoading(true)
        setIsOpen(false);


        handleSelectCorporacion();

        if(valores.length == 0){
            Swal.fire('Error de asignacion','Favor de seleccionar una corporacion','error')
        } else {
            // 0,1,2

                    // [



            startUpdate({
                // folio_llamada: formValues.folio,
                // razonamiento: updateRazonamiento,
                // editado: '1'
                instituciones: valores,
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

        // SECRETARÍA DE LA DEFENSA NACIONAL
        // GUARDIA NACIONAL
        // POLICIA ESTATAL PREVENTIVA
        // POLICIA INVESTIGADORA DE DELITOS
        // CRUZ ROJA DURANGO
        // COORDINACIÓN ESTATAL DE PROTECCIÓN CIVIL
        // SECRETARÍA DE SALUD
        // PROGRAMA ESMERALDA
        // DIRECCIÓN MUNICIPAL DE SEGURIDAD PÚBLICA DURANGO
        // POLICÍA VIAL DURANGO
        // DIRECCIÓN MUNICIPAL DE PROTECCIÓN CIVIL DURANGO
        // HEROICO CUERPO DE BOMBEROS DURANGO
    

    const { startEvento } = useAuthStore();
    const [ loading, setLoading,  ] = useState(true, console.log('useState 1'));

    // Ejecucion de modal
    const [modalIsOpen, setIsOpen] = useState(false, console.log('useState'));

    const [formValues] = useState({
        folio:'',
        descripcion_llamada: ''
    }, console.log('formValues'))

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#0062cc';
      }

    function openModal(dataE) {



        dataE= dataE;

        formValues.folio = dataE['folio_llamada']
        formValues.descripcion_llamada = dataE['descripcion_llamada'];


        setIsOpen(true);

    }

    function closeModal(){
        setIsOpen(false)
    }


    const cambiarEstado = () => {
        setLoading(false);
    }

    const asignaEvento = () => {
        console.log('evento');
    }



    useEffect(() => {
      startEvento().then((respose) => {
          console.log('Response!');

          listaEvento = respose;
          setReloadUsers(false)


        //   console.log(listaEvento);
      })
    }, [reloadUsers])

    const {startFindCorpo} = useAuthStore();


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

                <div className='listaPersona'>
                <h4>Lista inicial de incidentes</h4>

                </div>
                <br />

                <div className='listaPersona'>

        
                    <table className='tableStyle'>
                        <thead>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope="col">Folio</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Evento</th>
                                <th scope="col">Municipio</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                listaEvento.uid.map((dataE) =>{
                                    count++;
                                    // console.log('Carga datos',listaEvento.uid);
                                    if(dataE['editado'] == 0)
                                    return(
                                        <tr key={dataE['_id']}>
                                        <th scope='row'>{count}</th>    
                                        <th scope="row">{dataE['folio_llamada']}</th>
                                        <th scope="row">{dataE['fecha_llamada']}</th>
                                        <th scope='row'>{dataE['hora_llamada']}</th>
                                        <th scope="row">{dataE['descripcion_llamada']}</th>
                                        <th scope="row">{dataE['municipio']}</th>                                        
                                        <th scope="row"> <button onClick={() => openModal(dataE)} className='btnEnvia'>Asignar</button> </th>
                                        </tr>
                                    )
    
                                })
                            }
                        </tbody>
                    </table>
        
                </div> {/* fina DIV */} 

                <Modal  
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    className=''
                    contentLabel="Editar datos"
                    ariaHideApp={false}
                    >

                        <form onSubmit={updateRegister}>
                            <img className='closeBtn' src="./src/assets/close.png" onClick={closeModal} alt="" />
                            <div className='col-md-6 editR-form'>
                                <h1>Asignar reporte</h1>
                                <h2>Folio:  {formValues.folio}</h2>
                                
                            <br/>
                            <div >
                                  <div className='personaCalle-center'>
                                  {/* <h6 className='tamanoLetra'>Razonamiento</h6> */}
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
                                            {/* {formValues.descripcion_llamada} */}
                                    </textarea>
                                  </div>
                                    {/* Selector de archivos */}
                                  {/* <div className='personaCalle-center'>
                                    <input className='inputFile' type="file" />
                                  </div> */}
                                  <br />
                                  <div className='personaCalle-center'>
                                    <Select
                                      className='select'
                                      // defaultValue={{label:'Seleccionar un por lo menos una corporacion', value:'empty'}}
                                      isMulti
                                      name='selectedOptions'
                                      options={miArray}
                                      onChange={(item) => setSelectedOptions(item)}
                                      />
                                  </div>
                                  <br />
                                  <div className='personaCalle-center'>
                                  <button className='btnForm'>Generar Evento</button>
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

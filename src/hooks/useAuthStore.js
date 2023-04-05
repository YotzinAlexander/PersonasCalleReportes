import { useDispatch, useSelector } from "react-redux";
import reporteApi from '../api/registroApi'
import { clearErrorMessage, notRegisterUser, onChecking, onLogin, onLoginOther, onLogout } from "../store/auth/authSlice";
import Swal from 'sweetalert2'
import { redirect } from "react-router-dom";


export const useAuthStore = () => {


    const { status,user,errorMessage } = useSelector( state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async({ user, password}) => {
        dispatch(onChecking());
        try {
            //  console.log("Accesa",user, password);
            const {data} = await  reporteApi.post('/api/auth/',{user, password})
            
            localStorage.setItem('Name', data.name);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            localStorage.setItem('uType', data.uType);

            if(data.uType == "00"){
                dispatch(onLogin({name: data.name, uid: data.uid}))
            } else if (data.uType == "01") {
                localStorage.setItem('id_corporacion', data.corporacion)
                dispatch(onLoginOther({name: data.name, uid: data.uid}))
            }



            // console.log({data})
           
            // dispatch(onLogin({ email: data.email, uid: data.id, name:data.fullName}));

        } catch (error) {
            console.log(error)
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            }, 10)
            
        }
    }

    const startRegister = async ({name, user, password, corporacion,uType}) => {
        // console.log('startRegister',name, user, password, corporacion,uType)

        try {
            const {data} = await reporteApi.post('/api/auth/new',{name, user, password, corporacion,uType});
            console.log(data)

            Swal.fire(
                'Registro'+{user}+'creado con exito',
                'Aceptado',
                'success')
        } catch (error) {
            // console.log(error);
            dispatch(notRegisterUser('Error al crear usuario verifique que no exista'));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            }, 10)
        }
    }
    const startRegistrerCorpo = async ({institucion, municipio}) => {
        console.log('entra')
        const active = "01";
        const status = "03";
        try {
            const {data} = await reporteApi.post('/api/auth/createCorpo',{ institucion, municipio, active, status});
            console.log(data);
            Swal.fire(
                'Registro '+{institucion}+' creado con exito',
                'Aceptado',
                'success');
            
        } catch (error) {
            console.log(error)
        }
    }

    const startFindCorpo = async () =>{
        console.log('entra')
        try {
            const {data} = await reporteApi.get('/api/auth/corporaciones');
            // console.log(data)
            return data;
        } catch (error) {
            
            console.log('Error al cargar datos findCorpo')
            console.log(error);
        }
    }



    const startEvento = async () => {
        console.log('EVENTO')
        try {
            const {data} = await reporteApi.get('/api/auth/dataEventos');
            // console.log("DATA:   .",data)
            return data;
        } catch (error) {
            console.log('Error al cargar datos')
            console.log(error);
        }
    }

    // traer eventos asignaod por corporacion.
    const startEventoCorporacion = async({id_corporacion}) => {
        // const {data} = await  reporteApi.post('/api/auth/',{user, password})
        // console.log("id_corporacion", id_corporacion);

        try {
            // const {data} = await  reporteApi.post('/api/auth/',{user, password})

            const {data} = await reporteApi.post('/api/auth/ReportAsignados',{id_corporacion})
            // console.log(data)
            return data;
        } catch (error) {
            console.log('Error al cargar datos')
            console.log(error);
        }

        // try {
        //                                                  // reporteAsigna
        //     const {data } = await reporteApi.post('/api/auth/ReportAsignados',id_corporacion)
        //     console.log(data);
        // } catch (error) {
        //     console.log('Error EventoCopotoracion', error)
        // }
    }

    const startUpdate = async({instituciones}) => {
        
         console.log('AUTHSTORE', instituciones);

        try {

            const {data} = await reporteApi.post('/api/auth/reporteAsigna', instituciones)
            return data;

            
        } catch (error) {
            console.log(error)
        }

        // const ids =localStorage.getItem('usrEdit');
        // console.log(ids)

        // const datos = formValuesEdit;

        // const deleteId = 'id'
        // delete datos[deleteId];
        // delete datos['isActive']
        // console.log(datos)

        // try {
        //     const {data} = await reporteApi.patch('auth/'+ids,datos)
        //     console.log({data})
        // } catch (error) {
        //     console.log('Error al actualizar Datos')
        //     console.log(error)
            
        // }
    }

    const startEventoAll = async () => {

        try {
            const {data} = await reporteApi.get('/api/auth/allReportAsignados')
            
            return data

        } catch (error) {

            console.log('Error get data', error)
            
        }
    }


    const razonamientoCorpo = async ({folio, institucion, razonamiento,state,uType})  => {

        const id_evento = folio;
        const id_corporacion = institucion;
        const razonamientoR = razonamiento;
        const stateR = state;
        
        // {
        //     "folio": "00105101000014452969",
        //     "institucion": "SECRETARÍA DE LA DEFENSA NACIONAL",
        //     "razonamiento": "prueba",
        //     "state": "3"
        // }
        

        console.log( id_evento, id_corporacion, stateR, razonamientoR, uType )
        
        // state se envia a table reportes y cambia estado del reporte


        try {
            const {data} = await reporteApi.post('api/auth/razonamientoCorpo', {id_evento, id_corporacion, razonamiento,stateR,uType})
            if(data){
                console.log(data)
                Swal.fire({   
                    title: 'Valido',
                    text: "Envio de informacion Valido",
                    // showCancelButton: false,
                    confirmButtonColor: '#374957',
                    confirmButtonText: 'Aceptar',
                    // cancelButtonColor: '#d33',
                    // cancelButtonText: 'Cancelar',
                    // backdrop: '#374957'
                });
            }


            
        } catch (error) {
            console.log(error);
            
        }
    }


    const getRazonamientoCorpo = async () => {
        
        // "id_evento" : "00105101000014452969",    "id_corporacion" : "SECRETARÍA DE LA DEFENSA NACIONAL"}

        try {
            const {data} = await reporteApi.get('api/auth/razonCorpo');
            // console.log('return data: ',data)
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    const razonamientoCorpoOne = async ({folio, institucion, razonamiento,uType})  => {

        const id_evento = folio;
        const id_corporacion = institucion;
        console.log( 'razonamientoCorpoOne',id_evento, id_corporacion, razonamiento,uType )

        // state se envia a table reportes y cambia estado del reporte
        try {
            const {data} = await reporteApi.post('api/auth/razonamientoCorpoOne', {id_evento, id_corporacion, razonamiento,uType})
            Swal.fire(
                'Razonamiento enviado con exito!',
                'Aceptado',
                'success')

        } catch (error) {
            Swal.fire('Error de asignacion',error,'error')
            console.log(error);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch(onLogout());

        try {
            const {data} = await reporteApi.get('/auth/renew');
            localStorage.setItem('token', token.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ email: data.email, uid: data.id}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }


    const startRegisterResult = ({data}) => {
        console.log(data)
    }


    const startUsers = async() => {

        try {
            const {data} = await reporteApi.get('/auth/users');
            // console.log({data});
            return {data};

            // const events = convertRoutesToDataRoutes()
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);

        }

    }

    const startLoadUsers = async() => {
        try {
            const {data} = await reporteApi.get('/auth/{user}')
            return {data}
         } catch (error) {
            console.log('Error al buscar eventos')
            console.log(error);
        }
    }




    

    return{
        //propiedades 
        errorMessage, //
        status, //
        user, //

        //Metodos
        startRegistrerCorpo, //
        startFindCorpo,
        startLogin, //
        startRegister, //
        startEvento, //
        startUpdate, //
        startEventoAll, //
        startEventoCorporacion,//
        razonamientoCorpoOne,
        razonamientoCorpo, //
        getRazonamientoCorpo, //
        
        checkAuthToken,
        startLogout,

        // Enviar examen
        startRegisterResult,



        startUsers,
        //Carga usuarios para asignar examen
        startLoadUsers,

        
    }
}
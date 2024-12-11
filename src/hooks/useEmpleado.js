import axios from "axios";
import { useState } from "react";
import {alertaError, alertaSuccess, alertaWarning} from "../alertas"
import Swal from "sweetalert2";

const useEmpleado = () =>{

    const [employes, setEmployes] = useState([])
    const [nombre, setNombre] = useState('')
    const [dni, setDni] = useState('')
    const [direccion, setDireccion] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operation, setOperation] = useState(1)
    
    const url = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado'

    const getEmpleados = async () => {
        const response = await axios.get(url)
        setEmployes(response.data)
    }

    const openModal = (operation, nombre, dni, direccion, email, id) => {
        setNombre('')
        setDni('')       
        setDireccion('')
        setEmail('')
        setId('')


        if (operation === 1) {
            setTitleModal('Registrar Empleado')
            setOperation(1)
        } else if(operation === 2) {
            setTitleModal('Editar Empleado')
            setOperation(2)
            setNombre(nombre)
            setDni(dni)
            setDireccion(direccion)
            setEmail(email)
            setId(id)
        }
    }

    const enviarSolicitud = async (urlApi, metodo, parametros = {}) => {
        let obj = {
            method: metodo,
            url: urlApi,
            data: parametros,
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        }

        await axios(obj).then(() => {
            let mensaje

            if (metodo === 'POST') {
                mensaje = 'Se guardó el empleado'
            } else if (metodo === 'PUT') {
                mensaje = 'Se editó el empleado'
            } else if (metodo === 'DELETE') {
                mensaje = 'Se eliminó el empleado'
            }
            alertaSuccess(mensaje)
            document.getElementById('btnCerrarModal').click()
            getEmpleados()
        }).catch((error) => {
            alertaError(error.response.data.message)
        })
    }

    //validaciones
    const guardarEditarEmpleado = () => {
        let payload, metodo, urlAxios

        if ( nombre=== '') {
            alertaWarning('Nombre en blanco', 'nombre')
        } else if (dni === '') {
            alertaWarning('DNI en blanco', 'dni')
        } else if (direccion === '') {
            alertaWarning('Direccion en blanco', 'direccion')
        } else if (email === '') {
            alertaWarning('Email en blanco', 'email')
        }else if (id === '') {
            alertaWarning('ID en blanco', 'id')
        }else {
            payload = {
                nombre: nombre,
                dni:dni,
                direccion:direccion,
                email: email,
                id:id
                
            }
    
            if (operation === 1) {
                metodo = 'POST'
                urlAxios = url
            } else {
                metodo = 'PUT'
                urlAxios = `${url}/${id}`
            }
    
            enviarSolicitud(urlAxios, metodo, payload)
        }

    }

    const deleteEmpleado = (id) => {
        Swal.fire({
            title: '¿Está seguro de eliminar el Empleado?',
            icon: 'question',
            text: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                enviarSolicitud(`${url}/${id}`, 'DELETE')
            }
        }).catch((error) => {
            alertaError(error)
        })
    }





    return {
        employes,
        getEmpleados,
        titleModal,
        setTitleModal,
        nombre,
        setNombre,
        dni,
        setDni,
        direccion,
        setDireccion,
        email,
        setEmail,
        id,
        setId,


        
       
    
        openModal,
        guardarEditarEmpleado,
        deleteEmpleado,



    }





}

export default useEmpleado
import Campo from "./Campo"
import { useEffect } from "react"
import useEmpleado from "../hooks/useEmpleado"



const Empleado = () => {

    const {
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
       
        
        
        
    } = useEmpleado()
    
    useEffect(() => {
        getEmpleados()
       
    }, [])




    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button onClick={()=> openModal(1)}  className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEmpleado">
                            Crear Empleado
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Dirección</th>
                                    <th>Email</th>
                                    <th>Id</th>               
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    employes.map((employ, i) =>(
                                        <tr key={employ.id}>
                                          
                                            <td>{employ.nombre}</td>
                                            <td>{employ.dni}</td>
                                            <td>{employ.direccion}</td>
                                            <td>{employ.email}</td>
                                            <td>{employ.id}</td>
                                            <td>
                                                <button onClick={()=> openModal(2, employ.nombre, employ.dni, employ.direccion, employ.email, employ.id)} className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalEmpleado'>
                                                    <i className="fa-solid fa-edit" />
                                                </button>
                                                <button onClick={()=> deleteEmpleado(employ.id)}className="btn btn-danger" >
                                                <i className="fa-solid fa-trash" />
                                                </button>
                                            </td>
                                        
                                        
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>    

            <div id='modalEmpleado' className="modal fade" aria-hidden='true'>

                <div className="modal-dialog">
                    <div className="modal-content">
                        
                        <div className="modal-header">
                            <label className="h5">{titleModal}</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="close" />
                        </div>

                        <div className="modal-body">
                            <input type="hidden" id='id'  />
                            
                            <Campo idCampo='nombre' iconName='fa-solid fa-gift' placeholderName="Nombre de empleado" tipoCampo="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <Campo idCampo='dni' iconName='fa-solid fa-gift' placeholderName="DNI" tipoCampo="text" value={dni} onChange={(e) => setDni(e.target.value)}/>
                            <Campo idCampo='direccion' iconName='fa-solid fa-gift' placeholderName="Dirección" tipoCampo="text" value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                            <Campo idCampo='email' iconName='fa-solid fa-gift' placeholderName="Email" tipoCampo="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Campo idCampo='id' iconName='fa-solid fa-gift' placeholderName="Id" tipoCampo="text" value={id} onChange={(e) => setId(e.target.value)}/>
                            
                        </div>

                        <div className="modal-footer">
                            <button onClick={()=>guardarEditarEmpleado()} className="btn btn-success">
                                <i className="fa-solid fa-floppy-disk"/> Guardar
                            </button>
                            <button id="btnCerrarModal" className="btn btn-danger"
                                data-bs-dismiss='modal'> Cerrar
                            </button>

                        </div>

                    </div> 

                                      
                </div>
       
            </div>







        </div>
       
    )
}
export default Empleado

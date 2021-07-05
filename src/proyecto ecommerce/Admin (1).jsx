import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'



 const Admin = () => {

    const [modalabierto, setModalabierto] = useState(false)
    const [ventanaDelete,setVentanaDelete]=useState(false)
    const [operacion, setoperacion] = useState("")

    const [categoria, setCategoria] = useState({
        id:0,
        nombre:''
    })

    const [categorias,setCategorias]=useState([categoria])

    const baseUrl="https://webapiesuper.azurewebsites.net/api/categorias/"

    useEffect(() => {
        peticionGet()
    }, [])

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setCategorias(response.data)
            }).catch(error => {
                console.log(error)
            })
    }
    const Nuevo = ()=> {
        setoperacion("alta")
        categoria.nombre=""
        abrirCerrarModal()
    }
    const handleChange = e => {
        const { name, value } = e.target
        setCategoria({ ...categoria, [name]: value })
    } 
    
    const abrirCerrarModal = () => {
        setModalabierto(!modalabierto)
    }
    const Grabar = async () => {

        delete categoria.id
 
        if (operacion == "alta") {

            await axios.post(baseUrl, categoria)
                .then(response => {
                    setCategorias(categorias.concat(categoria))
                    abrirCerrarModal()
                }).catch(error => {
                    console.log(error)
                    alert(error)
                })
        }
        else {
             
            
            await axios.put(baseUrl, categoria.id, categoria)
                .then(response => {
                    setCategorias(categoria.concat(response.data))
                    abrirCerrarModal()
                }).catch(error => {
                    console.log(error)
                    alert(error)
                })
        }


    }
    const Modifica = (categ) => {
        
        setoperacion("modifica")

        SeleccionarRegistro(categ.id)
        abrirCerrarModal()
    }

    const SeleccionarRegistro =   (id) => {
        
          axios.get(baseUrl + "/" + id  )
            .then(response => {
                setCategoria(response.data)
            }).catch(error => {
                console.log(error)
            })

    }

    const Borrar = (categ) => {
        abrirCerrarDelete()
    }
    const Eliminar = async (id) => {
          
        await axios.delete(baseUrl, categoria.id)
        .then(response => {
            setCategorias(categorias.filter(gestor=>gestor.id!==response.data))
            abrirCerrarDelete()
        }).catch(error => {
            console.log(error)
            alert(error)
        })
    }
    const abrirCerrarDelete = () => {
        setVentanaDelete(!ventanaDelete)
    }
    return (
        <div>
            <h2>Categorias</h2>
            <table className="table table-striped">
                <button className="btn btn-primary" onClick={() => Nuevo()}>Nuevo Registro</button>
                <thead>
                    <th>ID</th>
                    <th>Nombre</th>
                   
                </thead>
                <tbody>
                    {categorias.map(categ => (
                        <tr Key={categ.id}>
                            <td>{categ.nombre}</td>
                          
                            <td>
                                <button className="btn btn-info" onClick={() => Modifica(categ)} >Modificar</button>
                                <button className="btn btn-danger"  onClick={() => Borrar(categ)}>Eliminar</button>
                            </td>


                        </tr>
                    ))}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
            <Modal isOpen={modalabierto}>
                <ModalHeader>Datos Proveedor {operacion} </ModalHeader>
                <ModalBody>
                    <label>Nombre de Categoria </label>
                    <br />
                    <input type="text" className="form-control" name="nombre" onChange={handleChange} value={categoria && categoria.nombre}></input>
 


                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => Grabar()}>Guardar</button> {"    "}
                    <button className="btn btn-danger" onClick={abrirCerrarModal}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={ventanaDelete}>
                 <ModalBody>
                     Esta seguro de Eliminar  ?  
                     <h2>{categoria.nombre}</h2>
                 </ModalBody>
                 <ModalFooter>
                     <button className="btn btn-danger" onClick={()=>Eliminar(categoria)}>Si</button>
                     <button className="btn btn-secundary" onClick={abrirCerrarDelete}>No</button>
                 </ModalFooter>

            </Modal>

        </div>
    )
}

export default Admin
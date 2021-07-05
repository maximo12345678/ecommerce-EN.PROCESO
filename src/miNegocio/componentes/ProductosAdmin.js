import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// IMPORTS PARA LOS BOTONES CON ICONOS
import IconButton from '@material-ui/core/IconButton'; //asi puedo usar los botones de material UI con iconos
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import CrearYEditarProducto from './CrearYEditarProducto'

// IMPORTS PARA LAS VARIABLES GLOBALES
import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'


// IMPORT PARA LA MODAL DE REACTSTRAP
import { Button, ModalHeader, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'


import axios from 'axios'

const useStyles = makeStyles((theme) => ({

  root: {
    marginLeft: theme.spacing(46),
    margin: 40, //separa de la parte superior de la pagina
    padding: 10, //lo baja un poco pero tambien lo acerca a la derecha
  },


}))

//esto sirve para mostrar todos los productos, vamos a administrar todo lo que el agregue. 
function ProductosAdmin() {

  const classes = useStyles();



  const [{ modalCrearYEditarProducto, vendedor, idVendedor }, dispatch] = useStateValue()

  const [operacion, setOperacion] = useState("")
  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null)
  const [posicionProductoSeleccionado, setPosicionProductoSeleccionado] = useState(null)


  // state del producto que se va a crear, inicializado todo vacio asi lo paso por las PROPS. 
  const [producto, setProducto] = useState({
    id: 0,
    idVendedor: idVendedor,
    nombre: '',
    descripcion: '',
    idCategoria: 0,
    idSubCategoria: 0,
    idSubSubCategoria: 0,
    idMarca: 0,
    nombreMarca: '',
    stock: 0,
    precio: 0,
    foto: '',
    peso: 0,
    unidadMedida: ''
  })

  const [arrayProductos, setArrayProductos] = useState([producto])

  //state de la modal para eliminar un producto, lo hago en este mismo componente
  const [modalEliminar, setModalEliminar] = useState(false)
  const modificarModalEliminar = () => {
    setModalEliminar(!modalEliminar)//seteo la modal con lo inverso que tenga, si es falsa, la dejo en true, si esta en true la pongo en false
  }
  

  const uriProductos = `https://webapiesuper.azurewebsites.net/productos/vendor/${idVendedor}`


  useEffect(() => {

    llenarArrayProductosConId()
    alert(arrayProductos[0].nombre)

  }, [])

  const llenarArrayProductosConId = async () =>{  
    await axios.get(uriProductos)
    .then(response =>{
      setArrayProductos(response.data)
      
    }).catch(error =>{
      console.log(error)
    })

  } 






  const añadirProducto = () => {
    dispatch({//modificamos el estado de la ventana a true, asi en el componente crearProducto se abre la modal
      type: actionTypes.SET_MODAL_CREAR_Y_EDITAR_PRODUCTO,
      modalCrearYEditarProducto: true
    })
    setPosicionProductoSeleccionado(null) //como estamos en la creacion, por las dudas dejo en null la posicion 
    setOperacion("Crea")

    //SETEO EL OBJETo PRODUCTO siempre antes de mandarlo como propiedad al componente
    setProducto({
      id: 0,
      idVendedor: idVendedor,
      nombre: '',
      descripcion: '',
      idCategoria: 0,
      idSubCategoria: 0,
      idSubSubCategoria: 0,
      idMarca: 0,
      nombreMarca: '',
      stock: 0,
      precio: 0,
      foto: '',
      peso: 0,
      unidadMedida: ''
    })

  }

  const borrarProducto = (e) => {
    let posicionAEliminar = 0
    arrayProductos.map((producto, posicion) => {//recorro el array, producto es cada item y posicion 0,1,2, etc. 
      if (producto.Id == idProductoSeleccionado) { //yo guarde el ID del producto que se presiono en la tabla para eliminar, cuando lo encuentre en el array
        posicionAEliminar = posicion //guardo la posicion en una variable local de esta funcion
      }
    })
    //elimino el elemento del  array que esta en esa poisicion encontrada
    arrayProductos.splice(posicionAEliminar, 1);  //a partir de la posicion indicada por la variable, borra 1 

    modificarModalEliminar()//cierro la modal
    setIdProductoSeleccionado(null)

  }

  const editarProducto = () => {
    dispatch({//modificamos el estado de la ventana a true, asi en el componente crearProducto se abre la modal
      type: actionTypes.SET_MODAL_CREAR_Y_EDITAR_PRODUCTO,
      modalCrearYEditarProducto: true
    })

    setOperacion("Modifica")

  }

  const detallesProducto = () => {
    alert("Mostrando detalles del producto")
  }

  const buscarProducto = () => {
    alert("Buscando producto/s")
  }



  return (
    <div className={classes.root}>
      <h1>Productos del vendedor "{vendedor}" con id: "{idVendedor}"</h1>


      <p className="mt-4">
        <h4>Buscar</h4>
        <form className="d-flex">
          <input className="form-control me-2" type="Search" placeholder="Buscar por categoria, marca, etc." aria-label="Search"></input>
          <button className="btn btn-outline-primary" onClick={buscarProducto} type="submit">Buscar</button>
        </form>
      </p>

      {/*EN ESTA PARTE, CUANDO EN LA LISTA DESPLEGABLE ELIGEN UN FILTRO O UN ORDENAMIENTO, APENAS SE ELIGUE SE ACTUALIZA LA TABLA AUTOMATICAMENTE */}

      <h4 className="mt-4">Filtrar</h4>
      <div className="card  ">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <b><label>Ordenar por:</label></b>
              <select className="form-control">  {/* Lista desplegable, disabled no se puede tocar, y selected es el que por defecto aparece seleccionado */}
                <option disabled="">Seleccione una opcion</option>
                <option className="form-control" aria-label="Server" value="privada">Mayor precio</option> {/* se puede poner SELECTED VALUE para que quede esa por defecto*/}
                <option className="form-control" aria-label="Server" value="publica">A - Z</option>
                <option className="form-control" aria-label="Server" value="publica">Z - A</option>
              </select>
            </div>

            <div className="col-md-3">
              <b><label>Filtrar por categoria</label></b>
              <select className="form-control">  {/* Lista desplegable, disabled no se puede tocar, y selected es el que por defecto aparece seleccionado */}
                <option disabled="">Seleccione una opcion</option>
                <option className="form-control" aria-label="Server" value="privada">Fiambres</option> {/* se puede poner SELECTED VALUE para que quede esa por defecto*/}
                <option className="form-control" aria-label="Server" value="publica">Carnes</option>
                <option className="form-control" aria-label="Server" value="publica">Bebidas</option>
              </select>
            </div>

            <div className="col-md-3">
              <b><label>Filtrar por marca</label></b>
              <select className="form-control">  {/* Lista desplegable, disabled no se puede tocar, y selected es el que por defecto aparece seleccionado */}
                <option disabled="">Seleccione una opcion</option>
                <option className="form-control" aria-label="Server" value="privada">La Serenisima</option> {/* se puede poner SELECTED VALUE para que quede esa por defecto*/}
                <option className="form-control" aria-label="Server" value="publica">Sancor</option>
                <option className="form-control" aria-label="Server" value="publica">Terrabusi</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      <h4 className="mt-4">Lista productos</h4>
      <button className="btn btn-success" type="submit" onClick={añadirProducto}>Añadir Producto</button>
      <div className="card ">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Producto</td>
                <td>Precio</td>
                <td>Stock</td>
                <td>IdCategoria</td>
                <td>IdSubCategoria</td>
                <td>IdSubSubCategoria</td>
                <td>IdMarca</td>
                <td>Foto</td>
                <td>Peso</td>
                <td>UnidadMedida</td>
                <td>Id Producto</td>
                <td>Acciones</td>

              </tr>
            </thead>

            <tbody>
              {
                arrayProductos?.map((item, posicion) => (  //item seria cada valor del array, index numero de cada posicion del array. le pasamos a cada columna LI, un key con el index, para que cada una tenga un valor unico sino da error en la consola
                  <tr key={posicion}>
                    <td>{item.nombre}</td>
                    <td>{item.precio}</td>
                    <td>{item.stock} </td>
                    <td>{item.idCategoria}</td>
                    <td>{item.idSubCategoria}</td>
                    <td>{item.idSubSubCategoria}</td>
                    <td>{item.idMarca}</td>
                    <td>{item.foto}</td>
                    <td>{item.peso}</td>
                    <td>{item.unidadMedida}</td>

                    <td>{item.id}</td>
                    <td>
                      <IconButton title="Borrar producto">
                        <DeleteForeverIcon fontSize="large" onClick={(e) => {
                          modificarModalEliminar() //activo la modal de eliminar producto
                          setIdProductoSeleccionado(item.Id) //guardo en el state el ID de este producto que se quiere eliminar, no la posicion
                        }} >
                        </DeleteForeverIcon> {/*agrandamos el boton con fontsize, y lo ponemos dentro de un boton para agregarle su funcionalidad*/}
                      </IconButton>

                      <IconButton title="Editar producto" >
                        <EditIcon fontSize="large" onClick={(e) => {
                          setProducto(item) //guardo en el state PRODUCTO, que es un objeto con todos los valores vacios, todos los datos del producto que se quiere editar
                          setPosicionProductoSeleccionado(posicion) //en lo de arriba ya tengo su ID, asi que le paso la posicion del array donde este producto se encuentra
                          editarProducto() //llamo a la funcion que modifica la variable global de la ventana modal, asi en el otro componente se activa
                        }}  >
                        </EditIcon> {/*agrandamos el boton con fontsize, y lo ponemos dentro de un boton para agregarle su funcionalidad*/}
                      </IconButton>

                      <IconButton title="Ver detalles producto" >
                        <InfoIcon fontSize="large" onClick={detallesProducto} ></InfoIcon> {/*agrandamos el boton con fontsize, y lo ponemos dentro de un boton para agregarle su funcionalidad*/}
                      </IconButton>
                    </td>
                  </tr>
                ))
              }

            </tbody>

          </table>
        </div>
      </div>

      {
        modalCrearYEditarProducto ? //validamos si la variable global es true o false. si es true, puede ser para crear o editar. de todas maneras mandamos la operacion (crear o modificar), la posicion (numero o null) y el producto (vacio o con datos del que se quiere editar)
          (
            <div>
              <CrearYEditarProducto operacion={operacion} posicion={posicionProductoSeleccionado} product={producto} ></CrearYEditarProducto>

            </div>

          )
          :
          (
            <span></span>
          )
      }

      {/* MODAL PARA ELIMINAR UN PRODUCTO. la dejamos dentro del return abajo de todo, cuando se modifica la variable MODALELIMINAR, se activa */}
      <Modal isOpen={modalEliminar}>
        <ModalHeader>
          ¿Esta Seguro de Eliminar ?
        </ModalHeader>

        <ModalBody>
          {/* <FormGroup>
            <p>Palabra Español: {idProductoSeleccionado}</p>

          </FormGroup>
          <FormGroup>
            <p>Palabra Ingles: {idProductoSeleccionado}</p>

          </FormGroup> */}
          MOSTRAR LOS DATOS ACA DEL PRODUCTO
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={borrarProducto} >Si</Button> {/* llamo a la funcion que borra el producto */}
          <Button color="secondary" onClick={modificarModalEliminar}>No </Button> {/* cierro la modal */}
        </ModalFooter>
      </Modal>


    </div>

  );

}

export default ProductosAdmin



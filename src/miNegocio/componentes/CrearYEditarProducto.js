// IMPORTS PARA VENTANA MODAL  https://material-ui.com/components/modal/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// IMPORTS PARA PODER USAR MIS VARIABLES GLOBALES
import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'

// IMPORTS PARA CART DEL PRODUCTO https://material-ui.com/components/cards/
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// PARA DARLE FORMATO AL PRECIO
import accounting from 'accounting'

// TEMPORALMENTE PARA DARLE UN ID UNICO A CADA PRODUCTO QUE AGREGO AL ARRAY
import uniqid from 'uniqid'

// PARA PODER ACCEDER A LAS APIS E INTEGRARLAS
import axios from 'axios'



const useStyles = makeStyles((theme) => ({

    // ESTILOS DE LA VENTANA MODAL  
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        //width: "50%",
    },


    // ESTILOS DE LA CARD DEL PRODUCTO 
    root: {
        maxWidth: 345,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

    // CREADOS POR MI
    botonStock: {
        marginLeft: theme.spacing(18)
    },
    unidadMedida: {
        marginLeft: theme.spacing(18)

    }
}));

const CrearYEditarProducto = (props) => { //, {producto: {Id, IdVendedor, IdCategoria, IdSubCategoria, IdSubSubCategoria, IdMarca, Nombre, Stock, Precio, Foto, Peso, UnidadMedida}
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
    // variable global de la ventana modal y el array de productos.
    const [{ modalCrearYEditarProducto, idVendedor }, dispatch] = useStateValue();

    const uriCat = "https://webapiesuper.azurewebsites.net/api/categorias/"
    const uriSubCat = "https://webapiesuper.azurewebsites.net/api/subcategorias/"
    const uriSubSub = "https://webapiesuper.azurewebsites.net/api/subsubcategorias/"
    const uriMarcas = "https://webapiesuper.azurewebsites.net/api/marcas/"
    const uriProductos = `https://webapiesuper.azurewebsites.net/productos/vendor/${idVendedor}`



    const [producto, setProducto] = useState({
        id: 0,
        idVendedor: props.product.IdVendedor,
        nombre: props.product.Nombre,
        descripcion: props.product.Descripcion,
        idCategoria: props.product.IdCategoria,
        idSubCategoria: props.product.IdSubCategoria,
        idSubSubCategoria: props.product.IdSubSubCategoria,
        idMarca: props.product.IdMarca,
        nombreMarca: props.product.NombreMarca,
        stock: props.product.Stock,
        precio: props.product.Precio,
        foto: props.product.Foto,
        peso: props.product.Peso,
        unidadMedida: props.product.UnidadMedida
    })


    // capturar los datos en el evento change de los input, si ponemos a los input el mismo nombre de los campos con un solo evento, asignamos a todos los valores 
    const handleChange = e => {
        const { name, value } = e.target
        setProducto({ ...producto, [name]: value })
    }


    // funcion que pone en FALSE la ventana modal, asi se cierra
    const cerrarModal = () => {
        dispatch({
            type: actionTypes.SET_MODAL_CREAR_Y_EDITAR_PRODUCTO,
            modalCrearYEditarProducto: false
        })
    };


    // funcion que llamo cuando se agrega un producto nuevo
    const guardarProducto = async () => {
        // producto.Id = uniqid() //le genero un ID unico
        // arrayProductos.push(producto) //lo agrego al array
        await axios.post(uriProductos, producto) //metodo POST, recibe 2 parametros. la url y el objeto a agregar.
        .then(response => { //si se agrego bien, entra aca.
            //cerrarModal() //llamo a la funcion que pone en false la variable global de la ventana modal
            alert("Agregado")

        }).catch(error => { //si no se logro agregar a la tabla, mostramos por consola el error
            console.log(error)
        })

	//llenar aca otra vez el array global
    }




    // funcion que llamo cuando se modifica el producto
    const modificarProducto = () => {
        // arrayProductos[props.posicion] = producto // pongo el nuevo producto modificado, en la posicion del array que se encontro el mismo id
        // arrayProductos[props.posicion].Id = producto.Id // le dejo el mismo id que tenia antes de ser modificiado 

        // cerrarModal()
        alert("Modificando")
    }


    //////////////////////////////////////////////////////////////////////////////////////

    //TODO PARA LAS APIS DE CATEGORIAS, SUBCATEGORIAS, SUBSUBCATEGORIAS, MARCAS Y PRODUCTOS




    const [categoria, setCategoria] = useState({
        id: 0,
        nombre: ''
    })

    const [subcategoria, setSubcategoria] = useState({
        id: 0,
        idcategoria: 0,
        nombre: ""
    })

    const [subsubcategoria, setsubSubcategoria] = useState({
        id: 0,
        idcategoria: 0,
        idsubcategoria: 0,
        nombre: ""
    })

    const [marca, setMarca] = useState({
        id: 0,
        nombre: ''
    })


    const [categorias, setCategorias] = useState([categoria])
    const [subsubcategorias, setsubSubCategorias] = useState([subsubcategoria])
    const [subcategorias, setSubcategorias] = useState([subcategoria])
    const [marcas, setMarcas] = useState([marca])




    // const [idcat, setIdcat] = useState(0);
    // const [idsubcat, setsubIdcat] = useState(0);
    // const [idsubsubcat, setIdsubsubcat] = useState(0);



    useEffect(() => {

        peticionGet()

    }, [])

    const peticionGet = async () => {
        await axios.get(uriCat)
            .then(response => {
                setCategorias(response.data)
            }).catch(error => {
                console.log(error)
            })
        await axios.get(uriSubCat)
            .then(response => {
                setSubcategorias(response.data)
            }).catch(error => {
                console.log(error)
            })
        await axios.get(uriSubSub)
            .then(response => {
                setsubSubCategorias(response.data)
            }).catch(error => {
                console.log(error)
            })
        await axios.get(uriMarcas)
            .then(response =>{
                setMarcas(response.data)
            }).catch(error =>{
                console.log(error)
            })
    }

    // const categselected = () => {
    //     setIdcat(document.getElementById("optcategorias").value)
    // }

    // const subcategselected = () => {
    //     setsubIdcat(document.getElementById("optsubcategorias").value)
    // }
    // const subsubcategselected = () => {
    //     setIdsubsubcat(document.getElementById("optsubsubcategorias").value)
    // }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title" // le pones id="transition-modal-title" a la etiqueta q queras 
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalCrearYEditarProducto}
                onClose={cerrarModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalCrearYEditarProducto}>
                    <div className={classes.paper}>
                        <div className="row"> {/*DIVIDIMOS EN 2 COLUMNAS, de un lado la plantilla del producto y del otro los inputs que van rellenando la plantilla*/}
                            <div className="col">
                                <Card className={classes.root}>
                                    <CardHeader
                                        action={
                                            <Typography //esto es equivalente a si escribieramos un H5, le damos una clase con un color
                                                variant="h5"
                                                color="textSecondary"
                                            >
                                                {accounting.formatMoney(producto.precio, "$")} {/*el precio del producto*/}
                                            </Typography>
                                        }
                                        title={producto.nombre}
                                        subheader={producto.idMarca}
                                    />

                                    <CardMedia
                                        className={classes.media}
                                        image="/static/images/cards/paella.jpg"
                                        title="Paella dish"
                                    />

                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            t
                                        </Typography>
                                    </CardContent>

                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>

                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>Method:</Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </div>
                            <div className="col">
                                <h3>{props.operacion} tu producto!!</h3>
                                <label>Nombre</label>
                                <input placeholder="Nombre del Producto" className="form-control" type="text" name="nombre" value={producto.nombre} onChange={handleChange}></input> {/*  value={props.id ==! null?(arrayProductos[props.posicion].Nombre):(producto.Nombre)}*/}

                                {/* INPUTS PRECIO Y STOCK */}
                                <label className="mt-3">Precio</label>
                                <label className={classes.botonStock}>Stock</label>
                                <div className="input-group">
                                    <input placeholder="Precio del Producto" className="form-control" type="number" name="precio" value={producto.precio} onChange={handleChange} ></input>
                                    <span className="input-group-text"></span>
                                    <input placeholder="Stock del Producto" className="form-control" type="number" name="stock" value={producto.stock} onChange={handleChange} ></input>
                                </div>

                                {/* INPUTS PESO Y UNIDAD DE MEDIDA */}
                                <label className="mt-3">Peso</label> 
                                <label className={classes.unidadMedida}>Unidad de Medida</label>
                                <div className="input-group">
                                    <input placeholder="Peso del Producto" className="form-control" type="number" name="peso" value={producto.peso} onChange={handleChange} ></input>
                                    <span className="input-group-text"></span>
                                    <select className="form-control" name="unidadMedida" value={producto.unidadMedida} onChange={handleChange} >  {/* Lista desplegable, disabled no se puede tocar, y selected es el que por defecto aparece seleccionado */}
                                        <option disabled="">Seleccione una opcion</option>
                                        <option className="form-control" aria-label="Server" value="Kilos">Kilos</option> {/* se puede poner SELECTED VALUE para que quede esa por defecto*/}
                                        <option className="form-control" aria-label="Server" value="Gramos">Gramos</option>
                                        <option className="form-control" aria-label="Server" value="Litros">Litros</option>
                                    </select>
                                </div>

                                {/* LISTA DESPLEGABLE MARCAS */}
                                <label className="mt-3">Marca</label>
                                <select select={false} className="form-control" onChange={handleChange} name="idMarca" value={producto.idMarca}>  {/* Lista desplegable, disabled no se puede tocar, y selected es el que por defecto aparece seleccionado */}
                                    {
                                        marcas.map(marc =>
                                            <option key={marc.id} value={marc.id}>{marc.nombre}</option>
                                        )
                                    }
                                </select>


                                {/* LISTA DESPLEGABLE CATEGORIAS */}
                                <label className="mt-3">Categoria</label>
                                <select select={false} onChange={handleChange} name="idCategoria" value={producto.idCategoria} className="form-control" id="optcategorias">
                                    {
                                        categorias.map(categ =>
                                        <option key={categ.id} value={categ.id}>{categ.nombre}</option>
                                    )}
                                </select>


                                {/* LISTA DESPLEGABLE SUB-CATEGORIAS */}
                                <label className="mt-3">Sub-Categoria</label>
                                <select onChange={handleChange} name="idSubCategoria" value={producto.idSubCategoria} className="form-control"  id="optsubcategorias">
                                    {
                                        subcategorias.filter(e => e.idCategoria == producto.idCategoria).map(subcateg =>
                                        <option key={subcateg.id} value={subcateg.id}>{subcateg.nombre}</option>
                                    )}
                                </select>


                                {/* LISTA DESPLEGABLE SUB-SUB-CATEGORIAS */}
                                <label className="mt-3">Sub-Sub-Categoria</label>
                                <select onChange={handleChange} name="IdSubSubCategoria" value={producto.IdSubSubCategoria} className="form-control"  id="optsubsubcategorias">
                                    {
                                        subsubcategorias.filter(e => e.idCategoria == producto.idCategoria && e.idSubcategoria == producto.idSubCategoria).map(subsubcateg =>
                                        <option key={subsubcateg.id} value={subsubcateg.id}>{subsubcateg.nombre}</option>
                                    )}
                                </select>

                                {
                                    props.operacion == "Crea" ?
                                        (
                                            <button className="btn btn-primary btn btn-block mt-3" onClick={guardarProducto} type="submit" >Guardar Producto</button>

                                        )
                                        :
                                        (
                                            <span></span>
                                        )
                                }
                                {
                                    props.operacion == "Modifica" ?
                                        (
                                            <button className="btn btn-primary btn btn-block mt-3" onClick={modificarProducto} type="submit" >Modificar Producto</button>

                                        )
                                        :
                                        (
                                            <span></span>

                                        )
                                }

                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default CrearYEditarProducto



//<select className="form-control" onChange={handleChange}>  {/* Lista desplegable, disabled no se puede tocar, y selected es el que por defecto aparece seleccionado */}
//    <option disabled="">Seleccione una opcion</option>
//    <option className="form-control" aria-label="Server" value="Embutidos">Frios</option> {/* se puede poner SELECTED VALUE para que quede esa por defecto*/}
//    <option className="form-control" aria-label="Server" value="Frios">Congelados</option>
//    <option className="form-control" aria-label="Server" value="Pollo">Pechugas</option>
//</select> 